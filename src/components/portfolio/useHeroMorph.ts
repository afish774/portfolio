import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scroll-driven hero → sidebar morph, recreating the signature heynesh.com
 * transition frame by frame:
 *
 *  - The hero pins for the duration of the morph track.
 *  - Each tagged hero element ([data-morph="key"]) FLIP-flies to its matching
 *    sidebar slot ([data-slot="key"]) with a per-pair staggered window, then
 *    crossfades into the real sidebar item.
 *  - The portrait scales down with a heavy motion blur and dissolves.
 *  - The headline lifts, blurs and fades; supporting copy exits early.
 *  - The About section rises over the pinned hero for the last stretch.
 *
 * Everything is driven directly from scroll position (rAF, no React re-render
 * per frame), so scrolling back up reverses the whole choreography.
 */

/** Extra scroll length (in vh) during which the hero stays pinned. */
export const MORPH_TRACK_VH = 170;
/** How much of the content overlaps the pinned hero at the end (in vh). */
export const MORPH_OVERLAP_VH = 100;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Pair = {
    el: HTMLElement;
    slot: HTMLElement;
    dx: number;
    dy: number;
    scale: number;
    start: number;
    end: number;
};

/** Per-key staggered windows within overall progress p ∈ [0, 1]. */
const PAIR_WINDOWS: Record<string, [number, number]> = {
    wordmark: [0.2, 0.74],
    "nav-home": [0.3, 0.62],
    "nav-about": [0.33, 0.65],
    "nav-projects": [0.36, 0.68],
    "nav-offer": [0.39, 0.71],
    "nav-services": [0.42, 0.74],
    "nav-clients": [0.45, 0.77],
    "nav-faq": [0.48, 0.8],
    "stat-1": [0.24, 0.62],
    "stat-2": [0.3, 0.68],
    cta: [0.38, 0.82],
};

/** Whether a pair's hero element should scale down to its slot size. */
const SCALED_KEYS = new Set(["wordmark", "stat-1", "stat-2", "cta"]);

export function useHeroMorph(enabled: boolean, rootRef: RefObject<HTMLElement | null>) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(enabled);
    }, [enabled]);

    useEffect(() => {
        if (!enabled) return;
        const root = rootRef.current;
        if (!root) return;

        let pairs: Pair[] = [];
        let fxEls: { el: HTMLElement; kind: string }[] = [];
        let fadeEls: HTMLElement[] = [];
        let slotEls: HTMLElement[] = [];
        let raf = 0;
        let maxScroll = 1;
        let disposed = false;
        // Intro entrance animations rely on CSS transitions; they are killed
        // the first time the morph engages so per-frame style writes apply
        // instantly instead of lagging behind a transition.
        let transitionsKilled = false;

        const killTransitions = () => {
            if (transitionsKilled) return;
            transitionsKilled = true;
            for (const pair of pairs) {
                pair.el.style.transition = "none";
                pair.slot.style.transition = "none";
            }
            for (const { el } of fxEls) el.style.transition = "none";
            for (const el of fadeEls) el.style.transition = "none";
        };

        const measure = () => {
            const vh = window.innerHeight;
            maxScroll = (MORPH_TRACK_VH / 100) * vh;

            pairs = [];
            fxEls = [];
            fadeEls = [];
            slotEls = [];

            root.querySelectorAll<HTMLElement>("[data-morph]").forEach((el) => {
                const key = el.dataset["morph"]!;
                const slot = root.querySelector<HTMLElement>(`[data-slot="${key}"]`);
                if (!slot) return;
                const from = el.getBoundingClientRect();
                const to = slot.getBoundingClientRect();
                // The slot sits in normal flow below the track; its viewport
                // position at the end of the morph is its doc position minus
                // the track length. The hero element is pinned, so its
                // viewport rect is constant throughout the morph.
                const slotDocTop = to.top + window.scrollY;
                const slotDocLeft = to.left + window.scrollX;
                const targetTop = slotDocTop - maxScroll;
                const [start, end] = PAIR_WINDOWS[key] ?? [0.3, 0.85];
                pairs.push({
                    el,
                    slot,
                    dx: slotDocLeft - from.left,
                    dy: targetTop - from.top,
                    scale: SCALED_KEYS.has(key) ? to.width / Math.max(1, from.width) : 1,
                    start,
                    end,
                });
                el.style.transformOrigin = "top left";
                el.style.willChange = "transform, opacity, filter";
                slot.style.opacity = "0";
                slot.style.willChange = "transform, opacity";
                slotEls.push(slot);
            });

            root.querySelectorAll<HTMLElement>("[data-fx]").forEach((el) => {
                fxEls.push({ el, kind: el.dataset["fx"]! });
                el.style.willChange = "transform, opacity, filter";
            });

            root.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
                fadeEls.push(el);
                el.style.opacity = "0";
                el.style.willChange = "transform, opacity";
            });
        };

        const apply = () => {
            if (disposed) return;
            const p = clamp01(window.scrollY / maxScroll);
            if (p > 0) killTransitions();

            for (const pair of pairs) {
                const q = easeInOut(clamp01((p - pair.start) / (pair.end - pair.start)));
                if (q <= 0) {
                    pair.el.style.transform = "";
                    pair.el.style.opacity = "";
                    pair.slot.style.opacity = "0";
                    continue;
                }
                const s = 1 + (pair.scale - 1) * q;
                pair.el.style.transform = `translate3d(${pair.dx * q}px, ${pair.dy * q}px, 0) scale(${s})`;
                const isNavPair = pair.el.dataset["morph"]?.startsWith("nav-") ?? false;
                // Navigation labels crossfade earlier so their flight finishes inside frames 19–20.
                const fadeStart = isNavPair ? 0.5 : 0.7;
                const fadeSpan = isNavPair ? 0.38 : 0.3;
                pair.el.style.opacity = String(1 - clamp01((q - fadeStart) / fadeSpan));
                const appear = easeOut(clamp01((q - (isNavPair ? 0.54 : 0.62)) / (isNavPair ? 0.34 : 0.38)));
                pair.slot.style.opacity = String(appear);
                pair.slot.style.transform = `translate3d(0, ${(1 - appear) * 14}px, 0) scale(${0.985 + appear * 0.015})`;
            }

            for (const { el, kind } of fxEls) {
                switch (kind) {
                    case "portrait": {
                        const q = clamp01((p - 0.1) / 0.65);
                        const gone = clamp01((q - 0.55) / 0.45);
                        el.style.transform = `translate3d(0, ${q * 8}vh, 0) scale(${1 - q * 0.55})`;
                        el.style.filter = `blur(${q * 55}px)`;
                        el.style.opacity = String(1 - gone);
                        break;
                    }
                    case "headline": {
                        const q = clamp01((p - 0.05) / 0.45);
                        el.style.transform = `translate3d(0, ${-q * 130}%, 0)`;
                        el.style.filter = `blur(${q * 16}px)`;
                        el.style.opacity = String(1 - clamp01((q - 0.45) / 0.55));
                        break;
                    }
                    case "traits": {
                        const q = clamp01((p - 0.05) / 0.3);
                        el.style.transform = `translate3d(0, ${-q * 40}px, 0)`;
                        el.style.filter = `blur(${q * 20}px)`;
                        el.style.opacity = String(1 - q);
                        break;
                    }
                    case "footer": {
                        const q = clamp01(p / 0.2);
                        el.style.opacity = String(1 - q);
                        break;
                    }
                    case "fade-early": {
                        const q = clamp01((p - 0.12) / 0.3);
                        el.style.opacity = String(1 - q);
                        break;
                    }
                }
            }

            for (const el of fadeEls) {
                const q = easeInOut(clamp01((p - 0.8) / 0.2));
                el.style.opacity = String(q);
                el.style.transform = `translate3d(0, ${(1 - q) * 8}px, 0)`;
            }
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(apply);
        };

        const onResize = () => {
            measure();
            apply();
        };

        measure();
        apply();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            // restore natural styles so the non-morph layout is untouched
            for (const pair of pairs) {
                pair.el.style.cssText = "";
                pair.slot.style.cssText = "";
            }
            for (const { el } of fxEls) el.style.cssText = "";
            for (const el of fadeEls) el.style.cssText = "";
        };
    }, [enabled, rootRef]);

    return ready;
}

/** True only on desktop viewports without reduced-motion preference. */
export function useMorphEnabled() {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setEnabled(mq.matches && !rm.matches);
        update();
        mq.addEventListener("change", update);
        rm.addEventListener("change", update);
        return () => {
            mq.removeEventListener("change", update);
            rm.removeEventListener("change", update);
        };
    }, []);
    return enabled;
}
