import { useEffect, useState, type RefObject } from "react";

/**
 * Scroll-driven hero → sidebar morph (exact match to 8-frame reference choreography):
 *
 *  Frame 1 (p = 0):
 *    - Full Hero state. Sidebar is invisible (opacity: 0).
 *
 *  Frame 2-4 (p = 0.05 -> 0.45):
 *    - Headline floats UPWARD (translateY: 0 -> -160px) and blurs/fades over the portrait.
 *    - Wordmark (AFISH) scales down with top-left origin, translating toward the top-left badge.
 *    - Stats (80+, 7+) glide leftward into a horizontal 2-column card.
 *    - Nav links (left & right) glide diagonally into a single vertical 7-row column.
 *    - CTA button glides from bottom-center to the bottom-left sidebar base.
 *    - Portrait blurs softly into the background.
 *
 *  Frame 5-6 (p = 0.45 -> 0.75):
 *    - Flying elements arrive and dock into their exact slot positions.
 *    - Sidebar card shells (top card, stat card, nav card, bottom CTA) fade in around the docked elements.
 *    - Secondary sidebar elements (bio text, social icons, marquee, email) fade in softly.
 *
 *  Frame 7-8 (p = 0.75 -> 1.0):
 *    - Hero dissolves completely.
 *    - The About Me section enters smoothly on the right side of the assembled sticky sidebar.
 */

export const MORPH_TRACK_VH = 120;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Pair = {
    el: HTMLElement;
    slot: HTMLElement;
    key: string;
    dx: number;
    dy: number;
    scale: number;
    start: number;
    end: number;
    isRightNav: boolean;
};

/** Staggered flight windows matching reference frames 2-5 */
const PAIR_WINDOWS: Record<string, [number, number]> = {
    wordmark: [0.05, 0.60],
    "stat-1": [0.08, 0.55],
    "stat-2": [0.10, 0.58],
    "nav-home": [0.08, 0.52],
    "nav-about": [0.11, 0.55],
    "nav-projects": [0.14, 0.58],
    "nav-offer": [0.17, 0.62],
    "nav-services": [0.20, 0.65],
    "nav-clients": [0.23, 0.68],
    "nav-faq": [0.26, 0.72],
    cta: [0.15, 0.65],
};

const SCALED_KEYS = new Set(["wordmark", "stat-1", "stat-2", "cta"]);
const RIGHT_NAV_KEYS = new Set(["nav-offer", "nav-services", "nav-clients", "nav-faq"]);

export function useHeroMorph(enabled: boolean, rootRef: RefObject<HTMLElement | null>) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(enabled);
    }, [enabled]);

    useEffect(() => {
        if (!enabled) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const root = rootRef.current;
        if (!root) return;

        let pairs: Pair[] = [];
        let fxEls: { el: HTMLElement; kind: string }[] = [];
        let fadeEls: HTMLElement[] = [];
        let asideEl: HTMLElement | null = null;
        let heroContainer: HTMLElement | null = null;

        let raf = 0;
        let maxScroll = 1;
        let disposed = false;
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
            if (asideEl) asideEl.style.transition = "none";
        };

        const measure = () => {
            const vh = window.innerHeight;
            maxScroll = (MORPH_TRACK_VH / 100) * vh;

            asideEl = root.querySelector<HTMLElement>("[data-sidebar-container]");
            heroContainer = root.querySelector<HTMLElement>("[data-hero-container]");
            if (!asideEl) return;

            // Apply scale to sidebar to ensure it fits the viewport BEFORE measuring slots
            const availableHeight = window.innerHeight - 48; // 3rem padding top
            const asideScale = Math.min(1, availableHeight / 860);
            asideEl.style.transformOrigin = "top left";
            asideEl.style.transform = `scale(${asideScale})`;
            asideEl.style.willChange = "opacity, transform";

            pairs = [];
            fxEls = [];
            fadeEls = [];

            root.querySelectorAll<HTMLElement>("[data-morph]").forEach((el) => {
                const key = el.dataset["morph"]!;
                const slot = root.querySelector<HTMLElement>(`[data-slot="${key}"]`);
                if (!slot) return;

                const from = el.getBoundingClientRect();
                const to = slot.getBoundingClientRect();

                const dx = to.left - from.left;
                const dy = to.top - from.top;

                const scale = SCALED_KEYS.has(key) ? to.width / Math.max(1, from.width) : 1;
                const [start, end] = PAIR_WINDOWS[key] ?? [0.15, 0.60];

                pairs.push({
                    el,
                    slot,
                    key,
                    dx,
                    dy,
                    scale,
                    start,
                    end,
                    isRightNav: RIGHT_NAV_KEYS.has(key),
                });

                el.style.transformOrigin = key === "cta" ? "center center" : "top left";
                el.style.willChange = "transform, opacity, filter";
                slot.style.opacity = "0";
                slot.style.willChange = "transform, opacity";
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

            if (asideEl) {
                asideEl.style.opacity = "0";
                asideEl.style.willChange = "opacity, transform";
            }
        };

        const apply = () => {
            if (disposed) return;
            const scrollY = window.scrollY;
            const p = clamp01(scrollY / maxScroll);
            if (p > 0) killTransitions();

            // 1. Sidebar Container: materializes in-place around p = 0.25 -> 0.60 (Reference frames 4-5)
            if (asideEl) {
                if (p <= 0.15) {
                    asideEl.style.opacity = "0";
                    asideEl.style.pointerEvents = "none";
                } else {
                    const asideAlpha = clamp01((p - 0.20) / 0.35);
                    asideEl.style.opacity = String(asideAlpha);
                    asideEl.style.pointerEvents = p > 0.60 ? "auto" : "none";
                }
            }

            // 2. Hero Container fade-out at end of morph track:
            if (heroContainer) {
                if (p >= 1) {
                    heroContainer.style.opacity = "0";
                    heroContainer.style.pointerEvents = "none";
                } else {
                    const heroAlpha = 1 - clamp01((p - 0.70) / 0.30);
                    heroContainer.style.opacity = String(heroAlpha);
                    heroContainer.style.pointerEvents = p > 0.75 ? "none" : "auto";
                }
            }

            // 3. FLIP Pairs (Flying hero elements → Sidebar slots):
            for (const pair of pairs) {
                const q = easeInOut(clamp01((p - pair.start) / (pair.end - pair.start)));
                if (q <= 0) {
                    pair.el.style.transform = "";
                    pair.el.style.opacity = "";
                    pair.slot.style.opacity = "0";
                    continue;
                }

                // Smooth diagonal flight with subtle swoop for right nav
                const arcY = pair.isRightNav ? Math.sin(q * Math.PI) * 20 : 0;
                const currX = pair.dx * q;
                const currY = pair.dy * q + arcY;
                const s = 1 + (pair.scale - 1) * q;

                pair.el.style.transform = `translate3d(${currX}px, ${currY}px, 0) scale(${s})`;

                // Elements remain bright and crisp across their flight, crossfading as they land into the slot
                const isWordmark = pair.key === "wordmark";
                const fadeThreshold = isWordmark ? 0.80 : 0.72;
                const heroAlpha = 1 - clamp01((q - fadeThreshold) / (1 - fadeThreshold));
                pair.el.style.opacity = String(heroAlpha);

                // Slot locks in crisply as the element docks
                const slotThreshold = isWordmark ? 0.70 : 0.62;
                const slotProg = easeOut(clamp01((q - slotThreshold) / (1 - slotThreshold)));
                pair.slot.style.opacity = String(slotProg);
                pair.slot.style.transform = `scale(${0.96 + slotProg * 0.04})`;
            }

            // 4. Hero Section Special Effects (Matching Reference Frames 2-5):
            for (const { el, kind } of fxEls) {
                switch (kind) {
                    case "headline": {
                        // In reference: headline floats straight UPWARD (-160px), turns white-transparent, blurs softly
                        const q = clamp01(p / 0.45);
                        const liftY = -q * 160;
                        const blur = q * 14;
                        const opacity = 1 - clamp01(q / 0.85);
                        el.style.transform = `translate3d(0, ${liftY}px, 0)`;
                        el.style.filter = `blur(${blur}px)`;
                        el.style.opacity = String(opacity);
                        break;
                    }
                    case "portrait": {
                        // In reference: portrait stays centered, softly blurs (0 -> 35px) and dissolves
                        const q = clamp01((p - 0.04) / 0.56);
                        const blur = q * 35;
                        const scale = 1 - q * 0.15;
                        const opacity = 1 - clamp01((q - 0.25) / 0.75);
                        el.style.transform = `translate3d(0, ${q * 30}px, 0) scale(${scale})`;
                        el.style.filter = `blur(${blur}px)`;
                        el.style.opacity = String(opacity);
                        break;
                    }
                    case "traits": {
                        // Traits card (Creative, Reliable...) fades out early
                        const q = clamp01(p / 0.20);
                        el.style.transform = `translate3d(0, ${-q * 20}px, 0)`;
                        el.style.filter = `blur(${q * 10}px)`;
                        el.style.opacity = String(1 - q);
                        break;
                    }
                    case "footer": {
                        const q = clamp01(p / 0.12);
                        el.style.opacity = String(1 - q);
                        break;
                    }
                    case "fade-early": {
                        // "About Me" hero button fades out early so only "Book a Call" flies to sidebar
                        const q = clamp01(p / 0.18);
                        el.style.opacity = String(1 - q);
                        break;
                    }
                }
            }

            // 5. Secondary Sidebar elements (Bio text, social icons, marquee, email):
            for (const el of fadeEls) {
                const q = easeInOut(clamp01((p - 0.45) / 0.35));
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
            for (const pair of pairs) {
                pair.el.style.cssText = "";
                pair.slot.style.cssText = "";
            }
            for (const { el } of fxEls) el.style.cssText = "";
            for (const el of fadeEls) el.style.cssText = "";
            if (asideEl) asideEl.style.cssText = "";
            if (heroContainer) heroContainer.style.cssText = "";
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
