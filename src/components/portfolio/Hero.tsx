import { useEffect, useState, type ReactNode } from "react";
import { Sparkles, ShieldCheck, Target, Layers, Zap, BriefcaseBusiness, CircleHelp, CircleUserRound, House, Layers3, UsersRound, type LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, type HTMLMotionProps, type MotionValue } from "framer-motion";

import portrait from "@/assets/hero-portrait.png";
import portraitWebp from "@/assets/hero-portrait.png?format=webp&quality=82&w=1024";
import portraitWebpMobile from "@/assets/hero-portrait.png?format=webp&quality=78&w=600";

const LOGOS = ["] INVERT S", "SemiconBio", "CURRI", "Omicron", "puck", "1910", "alosant", "Lilipad"];

const SECTIONS: { id: string; label: string; Icon: LucideIcon }[] = [
    { id: "home", label: "HOME", Icon: House },
    { id: "about", label: "ABOUT ME", Icon: CircleUserRound },
    { id: "projects", label: "PROJECTS", Icon: BriefcaseBusiness },
    { id: "offer", label: "WHAT YOU GET", Icon: Layers3 },
    { id: "services", label: "SERVICES", Icon: Zap },
    { id: "clients", label: "CLIENTS", Icon: UsersRound },
    { id: "faq", label: "FAQ", Icon: CircleHelp },
];

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

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const SOCIALS = [
    { id: "X", Icon: XIcon, href: "#contact" },
    { id: "in", Icon: LinkedinIcon, href: "#contact" },
];

const TRAITS = [
    { label: "Creative", Icon: Sparkles },
    { label: "Reliable", Icon: ShieldCheck },
    { label: "Strategist", Icon: Target },
    { label: "Builder", Icon: Layers },
    { label: "Efficient", Icon: Zap },
];

const CUE = {
    a: 80,
    f: 200,
    i: 320,
    s: 440,
    h: 560,
    portrait: 720,
    portraitFocus: 1300,
    nav: 1600,
    headline: 1800,
    cards: 2050,
    buttons: 2300,
    footer: 2500,
} as const;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SNAP: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

function getRiseVariants(opts: { y?: number; x?: number; blur?: number; dur?: number; scale?: number; rotate?: number; delay?: number }) {
    const { y = 24, x = 0, blur = 14, dur = 900, scale = 1, rotate = 0, delay = 0 } = opts;
    return {
        hidden: {
            opacity: 0,
            y, x, scale, rotate,
            filter: `blur(${blur}px)`
        },
        visible: {
            opacity: 1,
            y: 0, x: 0, scale: 1, rotate: 0,
            filter: "blur(0px)",
            transition: {
                duration: dur / 1000,
                delay: delay / 1000,
                ease: EASE_OUT
            }
        }
    };
}

function useCountUp(target: number, duration = 1200, start = 0, delayMs = 0) {
    const [value, setValue] = useState(start);
    useEffect(() => {
        const timer = setTimeout(() => {
            const startTime = performance.now();
            let raf = 0;
            const tick = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(1, elapsed / duration);
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                setValue(Math.round(start + (target - start) * eased));
                if (progress < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
        }, delayMs);
        return () => clearTimeout(timer);
    }, [target, duration, start, delayMs]);
    return value;
}

function GlassCard({
    className = "",
    children,
    morphKey,
    ...motionProps
}: {
    className?: string;
    children: ReactNode;
    morphKey?: string | undefined;
} & HTMLMotionProps<"div">) {
    return (
        <motion.div
            data-morph={morphKey}
            className={`rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.16] to-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[7px] ${className}`}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

function LetterReveal({ letter, delayMs, scrollY, morphActive, index }: { letter: string; delayMs: number; scrollY: MotionValue<number>; morphActive: boolean; index: number }) {
    const constantZero = useMotionValue(0);
    const safeScroll = morphActive ? constantZero : scrollY;
    const p = useTransform(safeScroll, [0, 800], [0, 1]);
    const yScroll = useTransform(p, (v) => v * -80);
    const rotations = [-8, 6, -4, 5, -6];
    const initRot = rotations[index] ?? 0;

    return (
        <span className="inline-block select-none">
            <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 100, scale: 0.5, rotate: initRot, filter: "blur(16px)", textShadow: "none" }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)", textShadow: "0 0 60px rgba(0,0,0,0.08)" }}
                transition={{ duration: 1.0, delay: delayMs / 1000, ease: EASE_SNAP }}
            >
                <motion.span style={{ display: "inline-block", y: yScroll }}>
                    {letter}
                </motion.span>
            </motion.span>
        </span>
    );
}

function PortraitReveal({ morphActive, scrollY }: { morphActive: boolean, scrollY: MotionValue<number> }) {
    const constantZero = useMotionValue(0);
    const activeScroll = morphActive ? constantZero : scrollY;
    const p = useTransform(activeScroll, [0, 800], [0, 1]);
    const scrollBlur = useTransform(p, (v) => `blur(${Math.min(18, Math.max(0, (v - 0.04) * 19))}px)`);
    const scaleTransform = useTransform(p, (v) => 1 + v * 0.04);
    const yTransform = useTransform(p, (v) => v * 60);

    return (
        <motion.div
            data-fx="portrait"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[min(82svh,42rem)] justify-center overflow-hidden lg:h-[min(101svh,67rem)]"
            initial={{ opacity: 0, filter: "blur(22px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: CUE.portrait / 1000, ease: EASE_OUT }}
            style={{ y: yTransform, scale: scaleTransform, filter: scrollBlur, transformOrigin: "50% 100%" }}
        >
            <motion.div className="relative flex h-full w-full justify-center">
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.15) 100%)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: CUE.portraitFocus / 1000, ease: "easeOut" }}
                />
                <motion.div
                    className="h-full w-auto max-w-none"
                    initial={{ y: 140, scale: 1.12 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{ duration: 1.6, delay: CUE.portrait / 1000, ease: EASE_OUT }}
                >
                    <picture className="h-full w-auto max-w-none block">
                        <source media="(max-width: 767px)" srcSet={portraitWebpMobile} type="image/webp" />
                        <source srcSet={portraitWebp} type="image/webp" />
                        <img
                            src={portrait}
                            alt="Portrait of afish, Webflow expert"
                            width={1024}
                            height={1280}
                            fetchPriority="high"
                            decoding="async"
                            className="h-full w-auto max-w-none object-cover object-top mix-blend-multiply contrast-[1.04] saturate-[1.05]"
                        />
                    </picture>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function HeadlineReveal({ delayMs }: { delayMs: number }) {
    const lines = ["Webflow,", "Applied", "Differently."];
    return (
        <h2 className="origin-center scale-x-[1.02] font-display text-center text-[clamp(3rem,5.05vw,6.2rem)] leading-[1.04] font-black text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
            {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: "110%", filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: (delayMs + i * 100) / 1000, ease: EASE_OUT }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </h2>
    );
}

function StatCard({ delayMs, morphKey, value, suffix, label, className = "", x }: { delayMs: number; morphKey?: string; value: number; suffix: string; label: string; className?: string; x?: number; }) {
    const count = useCountUp(value, 1400, 0, delayMs);
    return (
        <GlassCard
            morphKey={morphKey}
            className={className}
            initial="hidden"
            animate="visible"
            variants={getRiseVariants({ x: x ?? 0, y: 0, blur: 12, dur: 900, delay: delayMs })}
        >
            <p className="font-display text-[clamp(3.2rem,4vw,4.8rem)] leading-none font-black text-primary">
                {count}{suffix}
            </p>
            <p className="mt-2 font-display text-[clamp(0.84rem,1.12vw,1.3rem)] leading-[1.18] font-bold text-white">
                {label}
            </p>
        </GlassCard>
    );
}

function NavGroup({ items }: { items: { label: string; href: string; morphKey?: string }[] }) {
    return (
        <div className="hidden lg:flex shrink-0 items-center justify-center">
            {items.map((item, i) => (
                <span key={item.label} className="flex items-center">
                    {i > 0 && <span data-fx="fade-early" className="mx-2 text-foreground/45 sm:mx-4">|</span>}
                    <a data-morph={item.morphKey} href={item.href} className="block relative leading-none transition-colors hover:text-primary">
                        {item.label}
                    </a>
                </span>
            ))}
        </div>
    );
}

function MobileNav() {
    const allItems = [...LEFT_NAV, ...RIGHT_NAV];
    return (
        <div className="flex lg:hidden w-full max-w-[28rem] flex-col gap-2 px-2">
            <div className="grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
                {LEFT_NAV.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-center rounded-xl py-2.5 text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
                {RIGHT_NAV.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-center rounded-xl py-2.5 text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95"
                    >
                        {item.label.split(' ')[0]} {/* Shorten for mobile if needed, e.g. "What You Get" -> "What" */}
                    </a>
                ))}
            </div>
        </div>
    );
}

export function HeroSidebar() {
    const [active, setActive] = useState("home");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const centerLine = window.innerHeight / 2;
                    let found = false;
                    for (let i = SECTIONS.length - 1; i >= 0; i--) {
                        const el = document.getElementById(SECTIONS[i].id);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top <= centerLine) {
                                setActive(SECTIONS[i].id);
                                found = true;
                                break;
                            }
                        }
                    }
                    if (!found && SECTIONS.length > 0) setActive(SECTIONS[0].id);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDarkSection = active === "projects";
    const transitionClass = "transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]";

    return (
        <aside
            data-sidebar-container
            className="hidden h-fit w-[clamp(14.5rem,15vw,17rem)] shrink-0 flex-col gap-4 lg:flex pb-8 pointer-events-auto"
            style={{ opacity: 0 }}
        >
            <div className={`p-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[2rem] border border-white/5" : "bg-card rounded-xl border border-transparent"}`}>
                <div className="flex items-center justify-between">
                    <button
                        data-slot="wordmark"
                        onClick={() => {
                            // @ts-ignore
                            if (window.lenis) window.lenis.scrollTo(document.documentElement, { duration: 2.2 });
                            else window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`rounded-md px-3 py-1.5 font-display text-lg font-black tracking-tight text-black transition-colors duration-500 ease-in-out hover:bg-primary/0 ${isDarkSection ? "bg-[#ffeb3b]" : "bg-primary"}`}
                    >
                        <span className="flex items-start">
                            AFISH<sup className="ml-[1px] mt-[4px] text-[10px] opacity-80 leading-none">®</sup>
                        </span>
                    </button>
                    <div className="flex gap-1.5">
                        {SOCIALS.map(({ id, Icon, href }) => (
                            <a
                                key={id}
                                data-slot={`social-${id}`}
                                href={href}
                                aria-label={`Social ${id}`}
                                className={`grid h-8 w-8 place-items-center rounded-md border transition-colors ${
                                    isDarkSection 
                                        ? "border-white/10 bg-white/10 text-white/70 hover:bg-[#ffeb3b] hover:text-black" 
                                        : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
                <p data-fade className={`mt-6 text-sm leading-relaxed text-left ${transitionClass} ${isDarkSection ? "text-white/60" : "text-muted-foreground"}`}>
                    Working closely with your team to deliver builds that merge creativity, technical
                    excellence, and long-term value.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div data-slot="stat-1" className={`relative flex flex-col items-center justify-center p-5 overflow-hidden border shadow-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[1.5rem] border-white/5" : "bg-card rounded-xl border-white/5"}`}>
                    <p className={`font-display text-4xl font-black z-10 ${isDarkSection ? "text-[#ffeb3b]" : "text-primary"}`}>80+</p>
                    <p className={`mt-2 text-center text-[10px] font-bold uppercase tracking-widest z-10 ${transitionClass} ${isDarkSection ? "text-white/90" : "text-muted-foreground"}`}>Projects<br />Delivered</p>
                </div>
                <div data-slot="stat-2" className={`relative flex flex-col items-center justify-center p-5 overflow-hidden border shadow-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[1.5rem] border-white/5" : "bg-card rounded-xl border-white/5"}`}>
                    <p className={`font-display text-4xl font-black z-10 ${isDarkSection ? "text-[#ffeb3b]" : "text-primary"}`}>7+</p>
                    <p className={`mt-2 text-center text-[10px] font-bold uppercase tracking-widest z-10 ${transitionClass} ${isDarkSection ? "text-white/90" : "text-muted-foreground"}`}>Years of<br />Experience</p>
                </div>
            </div>

            <nav className={`relative flex flex-col gap-1.5 rounded-xl p-2.5 overflow-hidden ${transitionClass} ${isDarkSection ? "bg-[#1a1a1a]" : "bg-card"}`}>
                {/* The sliding dark background that the user requested */}
                <div className="absolute inset-0 bg-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" 
                     style={{ transform: active === "projects" ? "translateY(0%)" : "translateY(100%)" }} />

                {SECTIONS.map(({ id, label, Icon }) => {
                    const isActive = active === id;
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={(e) => {
                                if (id === "home") {
                                    e.preventDefault();
                                    // @ts-ignore
                                    if (window.lenis) window.lenis.scrollTo(document.documentElement, { duration: 3 });
                                    else window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                            }}
                            className="relative flex items-center gap-3.5 rounded-full px-4 py-3 text-[18px] font-display font-bold uppercase tracking-wider leading-none transition-colors group z-10"
                        >
                            {/* Sliding active indicator */}
                            {isActive && id !== "home" && (
                                <motion.div
                                    layoutId="sidebar-active-pill"
                                    className={`absolute inset-0 rounded-full -z-10 ${isDarkSection ? "bg-[#ffeb3b]" : "bg-[#FAFF00]"}`}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                            )}
                            
                            <Icon data-icon-for={`nav-${id}`} className={`h-4 w-4 shrink-0 transition-colors duration-300 ${isActive && id !== "home" ? "text-black" : isDarkSection ? "text-white/70 hover:text-white" : "text-foreground group-hover:text-primary"}`} strokeWidth={2.5} />
                            <span data-slot={`nav-${id}`} className={`block transition-colors duration-300 ${isActive && id !== "home" ? "text-black font-bold" : isDarkSection ? "text-white/70 hover:text-white" : "text-foreground group-hover:text-primary"}`}>{label}</span>
                        </a>
                    );
                })}
            </nav>

            <div data-fade className="overflow-hidden py-1.5">
                <div className="flex w-max marquee-track gap-8 px-1">
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        <span
                            key={`${logo}-${i}`}
                            className={`whitespace-nowrap text-xs font-black uppercase tracking-widest ${transitionClass} ${isDarkSection ? "text-white/50" : "text-foreground"}`}
                        >
                            {logo}
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="button"
                data-fade
                onClick={() => {
                    navigator.clipboard?.writeText("hello@afish.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                }}
                className={`flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium ${transitionClass} ${isDarkSection ? "bg-[#222] text-white/50 hover:bg-[#333]" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
                <span>hello@afish.com</span>
                <span className="font-bold">{copied ? "✓" : "⧉"}</span>
            </button>

            <a
                href="#contact"
                data-slot="cta"
                className="rounded-xl bg-primary py-4 text-center font-display text-base font-black tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
                Book a Call
            </a>
        </aside>
    );
}

export function Hero({ morphActive = false }: { morphActive?: boolean }) {
    const { scrollY } = useScroll();

    // Fade out the entire central Hero content as the user scrolls down into the main content
    // This ensures no elements (like the glass cards or portrait) ghost into the background.
    const scrollOpacity = useTransform(scrollY, [100, 700], [1, 0]);

    return (
        <>
            <section data-hero-container id="home" className="relative h-[100svh] overflow-hidden bg-background">
                <div data-fx="orbs" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full opacity-30"
                        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", filter: "blur(80px)", animation: "orbFloat 12s ease-in-out infinite alternate" }}
                    />
                    <div
                        className="absolute -right-[20%] top-[40%] h-[50%] w-[50%] rounded-full opacity-20"
                        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", filter: "blur(100px)", animation: "orbFloat 15s ease-in-out infinite alternate-reverse" }}
                    />
                </div>

                <motion.div 
                    className="relative mx-auto flex h-full min-h-[100svh] max-w-none flex-col px-[clamp(1rem,2.8vw,3.5rem)] pt-[clamp(1.25rem,5.7vh,3.75rem)]"
                    style={{ opacity: scrollOpacity }}
                >
                    <div className="pointer-events-none relative z-0 w-full min-w-0 overflow-hidden">
                        <h1
                            data-morph="wordmark"
                            className="flex w-full justify-between font-display leading-[0.82] font-black text-primary"
                            style={{ fontSize: "clamp(6.5rem, 28vw, 33rem)", perspective: "800px" }}
                        >
                            {["A", "F", "I", "S", "H"].map((letter, i) => (
                                <LetterReveal
                                    key={letter}
                                    letter={letter}
                                    delayMs={Object.values(CUE)[i] as number}
                                    scrollY={scrollY}
                                    morphActive={morphActive}
                                    index={i}
                                />
                            ))}
                        </h1>
                    </div>

                    <PortraitReveal morphActive={morphActive} scrollY={scrollY} />

                    <motion.nav
                        className="relative z-30 pointer-events-auto mt-[clamp(0.45rem,1.4vh,1.1rem)] flex flex-col items-center gap-2 whitespace-normal font-display text-[18px] tracking-wider leading-none font-bold uppercase lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:whitespace-nowrap lg:absolute lg:inset-x-[clamp(1.7rem,2.8vw,3.5rem)] lg:top-[50.8svh] lg:mt-0"
                        initial="hidden"
                        animate="visible"
                        variants={getRiseVariants({ y: 14, blur: 8, dur: 700, delay: CUE.nav })}
                    >
                        <MobileNav />
                        <NavGroup items={LEFT_NAV} />
                        <NavGroup items={RIGHT_NAV} />
                    </motion.nav>

                    <div className="relative z-20 flex flex-1 items-end pb-[clamp(1.25rem,2.8vh,2.2rem)] lg:static">
                        <div className="flex w-full items-end justify-between gap-5 lg:contents">
                            <div className="hidden flex-col lg:absolute lg:left-[clamp(17rem,18vw,22rem)] lg:top-[61.5svh] lg:flex" style={{ width: "clamp(13rem, 16vw, 19rem)" }}>
                                <GlassCard
                                    morphKey="stat-1"
                                    className="grid w-[clamp(13rem,14.9vw,18rem)] grid-cols-[1fr_auto] items-center gap-4 px-7 py-6"
                                    initial="hidden"
                                    animate="visible"
                                    variants={getRiseVariants({ x: -32, y: 0, blur: 12, delay: CUE.cards })}
                                >
                                    <span className="origin-left scale-x-[1.12] font-display text-[clamp(3.2rem,4.1vw,5rem)] leading-[0.65] font-black italic text-primary">W</span>
                                    <span className="font-display text-[clamp(0.85rem,1.15vw,1.35rem)] leading-[1.18] font-bold text-white">
                                        80+
                                        <br />
                                        Projects
                                    </span>
                                </GlassCard>
                                <StatCard
                                    delayMs={CUE.cards + 140}
                                    morphKey="stat-2"
                                    value={7}
                                    suffix="+"
                                    label="Years of experience"
                                    className="ml-[clamp(2.9rem,4.4vw,5.6rem)] mt-7 w-[clamp(10rem,9.7vw,12rem)] px-6 py-7 text-center"
                                    x={-32}
                                />
                            </div>

                            <div data-fx="headline" className="pointer-events-none flex min-w-0 flex-1 flex-col items-center self-end lg:absolute lg:inset-x-0 lg:bottom-[5.1svh] lg:pb-0">
                                <div className="pointer-events-auto w-fit max-w-full">
                                    <HeadlineReveal delayMs={CUE.headline} />
                                    <motion.div
                                        className="mt-6 flex flex-wrap justify-center gap-4"
                                        initial="hidden"
                                        animate="visible"
                                        variants={getRiseVariants({ y: 22, blur: 12, dur: 800, scale: 0.92, delay: CUE.buttons })}
                                    >
                                        <a
                                            data-morph="cta"
                                            href="#contact"
                                            className="group relative flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center overflow-hidden rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
                                        >
                                            <span className="relative z-10">Book a Call</span>
                                            <span className="absolute inset-0 scale-x-0 bg-white/15 transition-transform duration-500 group-hover:scale-x-100" style={{ transformOrigin: "left" }} />
                                        </a>
                                        <a
                                            data-fx="fade-early"
                                            href="#about"
                                            className="flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
                                        >
                                            About Me
                                        </a>
                                        <div className="flex items-center gap-3">
                                            {SOCIALS.map(({ id, Icon, href }) => (
                                                <a
                                                    key={id}
                                                    data-morph={`social-${id}`}
                                                    href={href}
                                                    aria-label={`Social ${id}`}
                                                    className="group grid h-[clamp(3.15rem,3.25vw,3.9rem)] w-[clamp(3.15rem,3.25vw,3.9rem)] place-items-center rounded-[0.5rem] border border-white/10 bg-white/5 text-muted-foreground transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_10px_20px_-10px_rgba(255,215,0,0.2)]"
                                                >
                                                    <Icon className="h-[clamp(1.2rem,1.5vw,1.8rem)] w-[clamp(1.2rem,1.5vw,1.8rem)] transition-transform duration-500 group-hover:scale-110" />
                                                </a>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            <div data-fx="traits" className="hidden justify-end lg:absolute lg:right-[clamp(18rem,22vw,26.5rem)] lg:top-[58svh] lg:flex" style={{ width: "clamp(13rem, 16vw, 19rem)" }}>
                                <GlassCard
                                    className="w-[clamp(12rem,11.5vw,14rem)] px-7 py-7"
                                    initial="hidden"
                                    animate="visible"
                                    variants={getRiseVariants({ x: 32, y: 0, blur: 12, delay: CUE.cards + 70 })}
                                >
                                    <ul className="space-y-3.5">
                                        {TRAITS.map(({ label, Icon }) => (
                                            <li key={label} className="flex items-center gap-3.5">
                                                <div className="flex h-[2.2rem] w-[2.2rem] shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_12px_-3px_rgba(255,215,0,0.4)]">
                                                    <Icon className="h-[1.1rem] w-[1.1rem] text-primary" strokeWidth={2.5} />
                                                </div>
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

                    <motion.div
                        className="relative z-20 hidden items-end justify-between gap-6 pb-6 text-[clamp(0.86rem,1.15vw,1.35rem)] leading-[1.5] text-foreground sm:pb-8 md:flex lg:absolute lg:inset-x-[clamp(2rem,3.5vw,4rem)] lg:bottom-[2.8svh] lg:p-0"
                        initial="hidden"
                        animate="visible"
                        variants={getRiseVariants({ y: 14, blur: 8, dur: 700, delay: CUE.footer })}
                    >
                        <p data-fx="fade-early" className="max-w-[15rem]">
                            The Webflow Expert.
                            <br />
                            That&apos;s afish.
                        </p>
                        <p data-fx="fade-early" className="hidden max-w-[21rem] text-right md:block">
                            Working closely with your team to deliver Webflow builds that merge creativity, technical
                            excellence, and long-term value.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}
