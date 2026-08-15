import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Sparkles, ShieldCheck, Target, Layers, Zap } from "lucide-react";

import portrait from "@/assets/hero-portrait.png";

const LEFT_NAV = [
    { label: "Home", href: "#home", morphKey: "nav-home" },
    { label: "About Me", href: "#about", morphKey: "nav-about" },
    { label: "Projects", href: "#projects", morphKey: "nav-projects" },
];

const RIGHT_NAV = [
    { label: "What You Get", href: "#offer", morphKey: "nav-offer" },
    { label: "Services", href: "#services", morphKey: "nav-services" },
    { label: "Clients", href: "#clients", morphKey: "nav-clients" },
    { label: "FAQ", href: "#faq", morphKey: "nav-faq" },
];

const TRAITS = [
    { label: "Creative", Icon: Sparkles },
    { label: "Reliable", Icon: ShieldCheck },
    { label: "Strategist", Icon: Target },
    { label: "Builder", Icon: Layers },
    { label: "Efficient", Icon: Zap },
];

/** Milliseconds from mount at which each beat of the intro fires. */
const CUE = {
    a: 120,
    f: 220,
    i: 320,
    s: 420,
    h: 520,
    portrait: 940,
    portraitFocus: 1640,
    nav: 2040,
    headline: 2240,
    cards: 2540,
    buttons: 2840,
    footer: 3040,
} as const;

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SNAP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Returns elapsed-time flags for the intro choreography. */
function useCues() {
    const [t, setT] = useState(-1);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setT(Infinity);
            return;
        }
        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const ms = now - start;
            setT(ms);
            if (ms < 4200) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);
    return (cue: number) => t >= cue;
}

/** Blur + rise entrance, matching the reference's soft focus-in. */
function rise(on: boolean, opts: { y?: number; x?: number; blur?: number; dur?: number } = {}): CSSProperties {
    const { y = 24, x = 0, blur = 14, dur = 900 } = opts;
    return {
        opacity: on ? 1 : 0,
        transform: on ? "none" : `translate3d(${x}px, ${y}px, 0)`,
        filter: on ? "none" : `blur(${blur}px)`,
        transition: `opacity ${dur * 0.7}ms ease-out, transform ${dur}ms ${EASE_OUT}, filter ${dur * 0.8}ms ease-out`,
        ...(on ? {} : { willChange: "opacity, transform, filter" }),
    };
}

function GlassCard({ className = "", children, style, morphKey }: { className?: string; children: ReactNode; style?: CSSProperties; morphKey?: string }) {
    return (
        <div
            data-morph={morphKey}
            style={style}
            className={`rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.16] to-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[7px] ${className}`}
        >
            {children}
        </div>
    );
}

function LetterReveal({
    letter,
    cue,
    past,
    scrollY,
}: {
    letter: string;
    cue: number;
    past: (c: number) => boolean;
    scrollY: number;
}) {
    const on = past(cue);
    const p = Math.min(1, scrollY / 800);
    return (
        <span
            className="inline-block select-none"
            style={{
                opacity: on ? 1 : 0,
                transform: on
                    ? `translate3d(0, ${p * -80}px, 0) scale(1)`
                    : "translate3d(0, 80px, 0) scale(0.6)",
                filter: on ? "none" : "blur(12px)",
                transition: `opacity 600ms ease-out, transform 900ms ${EASE_SNAP}, filter 700ms ease-out`,
                willChange: "transform, opacity, filter",
            }}
        >
            {letter}
        </span>
    );
}

export function Hero({ morphActive = false }: { morphActive?: boolean }) {
    const past = useCues();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        if (morphActive) return; // morph engine owns scroll-driven styles now
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => setScrollY(window.scrollY));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [morphActive]);

    const p = morphActive ? 0 : Math.min(1, scrollY / 800);
    const portraitVisible = past(CUE.portrait);
    const portraitScrollBlur = Math.min(18, Math.max(0, (p - 0.04) * 19));
    const portraitFocused = past(CUE.portraitFocus);

    return (
        <section id="home" className="relative h-full overflow-hidden bg-background">
            <div className="relative mx-auto flex h-full min-h-[100svh] max-w-none flex-col px-[clamp(1rem,2.8vw,3.5rem)] pt-[clamp(1.25rem,5.7vh,3.75rem)]">
                {/* Wordmark: large background type AFISH, revealed letter by letter. */}
                <div className="pointer-events-none relative z-0 w-full min-w-0 overflow-hidden">
                    <h1
                        data-morph="wordmark"
                        className="flex w-full justify-between font-display leading-[0.82] font-black text-primary"
                        style={{
                            fontSize: "clamp(6.5rem, 28vw, 33rem)",
                        }}
                    >
                        <LetterReveal letter="A" cue={CUE.a} past={past} scrollY={morphActive ? 0 : scrollY} />
                        <LetterReveal letter="F" cue={CUE.f} past={past} scrollY={morphActive ? 0 : scrollY} />
                        <LetterReveal letter="I" cue={CUE.i} past={past} scrollY={morphActive ? 0 : scrollY} />
                        <LetterReveal letter="S" cue={CUE.s} past={past} scrollY={morphActive ? 0 : scrollY} />
                        <LetterReveal letter="H" cue={CUE.h} past={past} scrollY={morphActive ? 0 : scrollY} />
                    </h1>
                </div>

                {/* Portrait: blended central portrait image with blur transition on scroll */}
                <div
                    data-fx="portrait"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[min(82svh,42rem)] justify-center overflow-hidden lg:h-[min(101svh,67rem)]"
                    style={{
                        opacity: portraitVisible ? 1 : 0,
                        filter: portraitFocused ? `blur(${portraitScrollBlur}px)` : "blur(18px)",
                        transform: portraitVisible
                            ? `translate3d(0, ${p * 60}px, 0) scale(${1 + p * 0.04})`
                            : "translate3d(0, 120px, 0) scale(1.06)",
                        transformOrigin: "50% 100%",
                        transition: portraitVisible
                            ? `opacity 900ms ease-out, filter 1400ms ${EASE_OUT}, transform 1400ms ${EASE_OUT}`
                            : "none",
                    }}
                >
                    <img
                        src={portrait}
                        alt="Portrait of Afish, Webflow expert"
                        width={1024}
                        height={1280}
                        className="h-full w-auto max-w-none object-cover object-top mix-blend-multiply contrast-[1.04] saturate-[1.05]"
                    />
                </div>

                {/* Nav row: positioned close to the wordmark baseline on large screens. */}
                <nav
                    className="relative z-30 pointer-events-auto mt-[clamp(0.45rem,1.4vh,1.1rem)] flex flex-col items-start gap-2 whitespace-normal font-display text-[clamp(0.68rem,1.18vw,1.46rem)] leading-none font-bold uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:whitespace-nowrap lg:absolute lg:inset-x-[clamp(1.7rem,2.8vw,3.5rem)] lg:top-[50.8svh] lg:mt-0"
                    style={rise(past(CUE.nav), { y: 10, blur: 6, dur: 700 })}
                >
                    <NavGroup items={LEFT_NAV} />
                    <NavGroup items={RIGHT_NAV} />
                </nav>

                {/* Body row: reference-inspired desktop placement with responsive flow fallback. */}
                <div className="relative z-20 flex flex-1 items-end pb-[clamp(1.25rem,2.8vh,2.2rem)] lg:static">
                    <div className="flex w-full items-end justify-between gap-5 lg:contents">
                        <div className="hidden flex-col lg:absolute lg:left-[clamp(17rem,18vw,22rem)] lg:top-[61.5svh] lg:flex" style={{ width: "clamp(13rem, 16vw, 19rem)" }}>
                            <GlassCard
                                morphKey="stat-1"
                                className="grid w-[clamp(13rem,14.9vw,18rem)] grid-cols-[1fr_auto] items-center gap-4 px-7 py-6"
                                style={rise(past(CUE.cards), { x: -32, y: 0, blur: 12 })}
                            >
                                <span className="origin-left scale-x-[1.12] font-display text-[clamp(3.2rem,4.1vw,5rem)] leading-[0.65] font-black italic text-primary">W</span>
                                <span className="font-display text-[clamp(0.85rem,1.15vw,1.35rem)] leading-[1.18] font-bold text-white">
                                    80+
                                    <br />
                                    Projects
                                </span>
                            </GlassCard>
                            <GlassCard
                                morphKey="stat-2"
                                className="ml-[clamp(2.9rem,4.4vw,5.6rem)] mt-7 w-[clamp(10rem,9.7vw,12rem)] px-6 py-7 text-center"
                                style={rise(past(CUE.cards + 140), { x: -32, y: 0, blur: 12 })}
                            >
                                <p className="font-display text-[clamp(3.2rem,4vw,4.8rem)] leading-none font-black text-primary">7+</p>
                                <p className="mt-2 font-display text-[clamp(0.84rem,1.12vw,1.3rem)] leading-[1.18] font-bold text-white">
                                    Years of
                                    <br />
                                    experience
                                </p>
                            </GlassCard>
                        </div>

                        <div data-fx="headline" className="pointer-events-none flex min-w-0 flex-1 flex-col items-center self-end lg:absolute lg:inset-x-0 lg:bottom-[5.1svh] lg:pb-0">
                            <div className="pointer-events-auto w-fit max-w-full">
                                <h2 className="origin-center scale-x-[1.02] font-display text-center text-[clamp(3rem,5.05vw,6.2rem)] leading-[1.04] font-black text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
                                    {["Webflow,", "Applied", "Differently."].map((line, i) => (
                                        <span key={line} className="block" style={rise(past(CUE.headline + i * 130), { y: 26, blur: 16 })}>
                                            {line}
                                        </span>
                                    ))}
                                </h2>
                                <div
                                    className="mt-6 flex flex-wrap justify-center gap-4"
                                    style={rise(past(CUE.buttons), { y: 18, blur: 10, dur: 700 })}
                                >
                                    <a
                                        data-morph="cta"
                                        href="#contact"
                                        className="flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-18px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5"
                                    >
                                        Book a Call
                                    </a>
                                    <a
                                        data-fx="fade-early"
                                        href="#about"
                                        className="flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-18px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5"
                                    >
                                        About Me
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div data-fx="traits" className="hidden justify-end lg:absolute lg:right-[clamp(18rem,22vw,26.5rem)] lg:top-[58svh] lg:flex" style={{ width: "clamp(13rem, 16vw, 19rem)" }}>
                            <GlassCard className="w-[clamp(12rem,11.5vw,14rem)] px-7 py-7" style={rise(past(CUE.cards + 70), { x: 32, y: 0, blur: 12 })}>
                                <ul className="space-y-3.5">
                                    {TRAITS.map(({ label, Icon }) => (
                                        <li key={label} className="flex items-center gap-3">
                                            <Icon className="h-[1.4rem] w-[1.4rem] shrink-0 fill-primary text-primary" strokeWidth={2.5} />
                                            <span className="font-display text-[clamp(0.85rem,1.12vw,1.32rem)] leading-none font-bold text-white">
                                                {label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </div>
                    </div>
                </div>

                {/* Footer line: small supporting copy pinned below the main composition. */}
                <div
                    data-fx="footer"
                    className="relative z-20 hidden items-end justify-between gap-6 pb-6 text-[clamp(0.86rem,1.15vw,1.35rem)] leading-[1.5] text-foreground sm:pb-8 md:flex lg:absolute lg:inset-x-[clamp(2rem,3.5vw,4rem)] lg:bottom-[2.8svh] lg:p-0"
                    style={rise(past(CUE.footer), { y: 14, blur: 8, dur: 700 })}
                >
                    <p className="max-w-[15rem]">
                        The Webflow Expert.
                        <br />
                        That&apos;s Afish.
                    </p>
                    <p className="hidden max-w-[21rem] text-right md:block">
                        Working closely with your team to deliver Webflow builds that merge creativity, technical
                        excellence, and long-term value.
                    </p>
                </div>
            </div>
        </section>
    );
}

function NavGroup({ items }: { items: { label: string; href: string; morphKey?: string }[] }) {
    return (
        <div className="flex shrink-0 items-center justify-center">
            {items.map((item, i) => (
                <span key={item.label} className="flex items-center">
                    {i > 0 && <span data-fx="fade-early" className="mx-2 text-foreground/45 sm:mx-4">|</span>}
                    <a data-morph={item.morphKey} href={item.href} className="transition-colors hover:text-primary">
                        {item.label}
                    </a>
                </span>
            ))}
        </div>
    );
}
