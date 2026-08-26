import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { X, Check, Home } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, LineReveal, PremiumLineReveal, RollingYear, CardScrollReveal, CheckpointScrollReveal } from "@/components/portfolio/Reveal";
import { TimelineThread } from "@/components/portfolio/TimelineThread";
import { Hero } from "@/components/portfolio/Hero";

import { Faq } from "@/components/portfolio/Faq";
import {
    useHeroMorph,
    useMorphEnabled,
    MORPH_TRACK_VH,
} from "@/components/portfolio/useHeroMorph";
import proj1 from "@/assets/proj-1.jpg?format=webp&quality=85&w=900";
import proj2 from "@/assets/proj-2.jpg?format=webp&quality=85&w=900";
import proj3 from "@/assets/proj-3.jpg?format=webp&quality=85&w=900";
import proj4 from "@/assets/proj-4.jpg?format=webp&quality=85&w=900";
import proj5 from "@/assets/proj-5.jpg?format=webp&quality=85&w=900";
import proj6 from "@/assets/proj-6.jpg?format=webp&quality=85&w=900";

export const Route = createFileRoute("/")(
    {
        head: () => ({
            meta: [
                { title: "afish — Creative Web Developer & Designer" },
                {
                    name: "description",
                    content:
                        "Creative web developer with 7+ years and 80+ shipped projects. Fast, motion-rich, CMS-driven websites for ambitious brands.",
                },
                { property: "og:title", content: "afish — Creative Web Developer & Designer" },
                {
                    property: "og:description",
                    content:
                        "80+ projects across biotech, fintech and hospitality. Design, motion and development, applied differently.",
                },
            ],
        }),
        component: Index,
    },
);

const PROJECTS = [
    {
        n: "01",
        img: proj1,
        name: "1910.ai",
        desc: "Pioneering small and large molecule therapeutics discovery through multimodal data.",
        tags: ["Components", "GSAP", "SEO"],
    },
    {
        n: "02",
        img: proj2,
        name: "SemiconBio",
        desc: "Realizing the promise of molecular electronics with a chip partnership platform.",
        tags: ["CMS", "API", "Motion"],
    },
    {
        n: "03",
        img: proj3,
        name: "PSSLTD",
        desc: "Asset and inspection management built alongside UK councils for over 35 years.",
        tags: ["CMS", "GSAP", "Localization"],
    },
    {
        n: "04",
        img: proj4,
        name: "Lilipad",
        desc: "A quiet place to belong — libraries that come to children wherever they are.",
        tags: ["CMS", "GSAP", "SEO"],
    },
    {
        n: "05",
        img: proj5,
        name: "Alosant",
        desc: "Resident experience platform keeping communities, shoppers and staff informed.",
        tags: ["Performance", "CMS", "API"],
    },
    {
        n: "06",
        img: proj6,
        name: "Omicron",
        desc: "A blockchain studio helping founders turn ideas into shipped, funded products.",
        tags: ["Motion", "Components", "CMS"],
    },
];

const TIMELINE = [
    {
        year: "'19",
        title: "Starting out with my brother",
        body: "My brother Stefan showed me the craft. I bothered him with questions for three months straight. He probably regrets it.",
        handle: "@stefan",
        when: "7 years ago",
    },
    {
        year: "'21",
        title: "Beyond what I knew",
        body: "A biotech project that made me think this isn't possible on the web. Turns out it was.",
        handle: "@fiftyseven",
        when: "5 years ago",
    },
    {
        year: "'22",
        title: "Leveling up",
        body: "The year animation and CMS stopped being extras and started shaping how every project feels.",
        handle: "@moatagency",
        when: "4 years ago",
    },
    {
        year: "'24",
        title: "Building systems",
        body: "Components, tokens and documentation — handing teams something they can actually run themselves.",
        handle: "@semiconbio",
        when: "2 years ago",
    },
];

const SERVICES = [
    {
        title: "Design to build",
        body: "Pixel-faithful development from your Figma file, with the motion and states the static file can't show.",
    },
    {
        title: "Design & development",
        body: "Full ownership from brief to launch — structure, art direction, build, QA and handover.",
    },
    {
        title: "Rescue & performance",
        body: "Audit an existing site, then fix speed, structure, SEO and a CMS your team stopped trusting.",
    },
    {
        title: "Ongoing partner",
        body: "A monthly retainer for new pages, experiments and steady improvements without re-scoping every time.",
    },
];

const CLIENTS = [
    {
        name: "Klemen Vute",
        role: "PM from Povio",
        quote:
            "Everything landed ahead of schedule and the animations survived every browser we threw at them.",
    },
    {
        name: "Johanna Dahlroos",
        role: "Co-Founder, Moat Agency",
        quote:
            "The clearest communication we've had with a developer. Our team can finally edit the site alone.",
    },
    {
        name: "Marko Ilić",
        role: "Legacy Automation",
        quote: "Took a messy rebuild and turned it into something our sales team actually shows off.",
    },
];

function Index() {
    const rootRef = useRef<HTMLDivElement>(null);
    const morphEnabled = useMorphEnabled();
    const morphReady = useHeroMorph(morphEnabled, rootRef);

    // State for expanding cards
    const [card1Expanded, setCard1Expanded] = useState(false);
    const [card2Expanded, setCard2Expanded] = useState(false);
    const [card3Expanded, setCard3Expanded] = useState(false);
    const [card4Expanded, setCard4Expanded] = useState(false);
    const [card5Expanded, setCard5Expanded] = useState(false);
    const [card6Expanded, setCard6Expanded] = useState(false);
    const [card7Expanded, setCard7Expanded] = useState(false);

    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={rootRef} className="min-h-screen bg-background">
            {/*
             * When the morph is enabled the hero section is pinned via
             * position: sticky so it stays in place while the scroll-track
             * spacer scrolls past. The spacer's height equals MORPH_TRACK_VH
             * and gives the FLIP engine its full animation range.
             *
             * On mobile / reduced-motion the spacer is 0-height and the hero
             * flows normally.
             */}
            <div
                style={{
                    position: morphEnabled ? "sticky" : "relative",
                    top: morphEnabled ? 0 : undefined,
                    zIndex: morphEnabled ? 10 : 1,
                }}
            >
                <Hero morphActive={morphReady} />
            </div>

            {/* Scroll-track spacer: provides the scrollable distance during
                which the hero stays pinned and FLIP pairs animate. Hidden
                (height 0) on mobile or when reduced-motion is preferred. */}
            <div
                className="morph-track"
                style={{
                    height: morphEnabled ? `${MORPH_TRACK_VH}vh` : 0,
                }}
                aria-hidden="true"
            />

            <div
                className="relative z-20 mx-auto flex max-w-[110rem] gap-8 px-4 sm:px-6 pointer-events-none"
                style={{
                    paddingTop: morphEnabled ? "1.5rem" : "3rem",
                    paddingBottom: "7rem",
                    marginTop: morphEnabled ? `-${MORPH_TRACK_VH}vh` : 0,
                }}
            >
                {/* 
                 * Layout Placeholder: 
                 * The actual sidebar DOM now lives inside the sticky Hero component (as HeroSidebar),
                 * so it can participate in the smooth scroll-morph architecture.
                 * This placeholder maintains the exact horizontal spacing so the main content
                 * remains correctly aligned on the right.
                 */}
                <aside className="hidden w-[clamp(14.5rem,15vw,17rem)] shrink-0 lg:block pointer-events-none" aria-hidden="true" />

                <main className="min-w-0 flex-1 space-y-20 sm:space-y-28 md:space-y-40 pointer-events-auto">
                    <section id="about" className="scroll-mt-24 pt-10">
                        <div className="max-w-xl">
                            <LineReveal delay={0}>
                                <SectionLabel>Start small grow big</SectionLabel>
                            </LineReveal>
                            <h2 className="mt-6 display-lg">
                                <PremiumLineReveal delay={0}>About Me (&amp;)</PremiumLineReveal>
                                <PremiumLineReveal delay={150}>My Journey</PremiumLineReveal>
                            </h2>
                            <LineReveal delay={450}>
                                <p className="mt-6 max-w-md body-copy">
                                    Seven years ago I opened my first editor. What happened after that is easier to
                                    show than explain.
                                </p>
                            </LineReveal>
                        </div>

                        <div ref={timelineRef} className="mt-10 sm:mt-16 relative w-full flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-[120px] sm:pb-[180px] lg:pb-[250px]">
                            <TimelineThread containerRef={timelineRef} />
                            {/* CARD 1 */}
                            <div className="w-full lg:w-[38%] self-end relative z-10 lg:mr-16 mt-10 lg:-mt-6">
                                {/* Premium Checkpoint Line for Card 1 (Right Side) */}
                                <CheckpointScrollReveal className="absolute -right-4 lg:-right-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card1Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card1Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card1Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'19" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                Starting out with my brother
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                My brother Stefan showed me Webflow. I bothered him with questions for three months straight. He probably regrets it.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <img src="https://i.pravatar.cc/150?u=stefan" alt="Stefan" className="h-12 w-12 rounded-full relative z-10 border-2 border-[#E6E5D8]" />
                                                                        <div className="h-12 w-12 rounded-full bg-[#E5E6D8] -ml-4 z-0 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <div className="h-10 w-10 rounded-full bg-[#EAEBDC] flex items-center justify-center">
                                                                                <span className="text-[#FAFF00] font-black text-xl tracking-tighter">W</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@stefan</span>
                                                                        <span className="text-xs font-medium text-black/50 leading-tight">7years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard1Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2019
                                                        </div>
                                                        <button
                                                            onClick={() => setCard1Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            {/* Dark Grey Webflow Badge */}
                                                            <div className="h-14 w-14 rounded-full bg-[#404040] z-0 flex items-center justify-center">
                                                                <span className="text-[#FAFF00] font-black text-2xl tracking-tighter">W</span>
                                                            </div>
                                                            {/* Avatar Image */}
                                                            <img
                                                                src="https://i.pravatar.cc/150?u=stefan"
                                                                alt="Stefan"
                                                                className="h-14 w-14 rounded-full border-2 border-[#2B2B2B] relative z-10 -ml-4"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        Starting out with my brother
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        My brother Stefan, a UX designer, opened Webflow and created something right in front of me. I had no idea what I was doing but I couldn't close the laptop. No master plan, no career goal. Just a guy who found something and couldn't let go. Three months of late nights and annoying my brother with questions later, I knew this was it.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 2 (Left Aligned) */}
                            <div className="w-full lg:w-[38%] self-start relative z-10 lg:ml-64">
                                {/* Premium Checkpoint Line for Card 2 (Left Side) */}
                                <CheckpointScrollReveal className="absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card2Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card2Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card2Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'20" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                First freelance steps
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                First real client. First real panic. Working for yourself and working for someone else are completely different.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <div className="h-12 w-12 rounded-full bg-[#404040] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <span className="text-[#FAFF00] font-black text-xl tracking-tighter">W</span>
                                                                            <div className="absolute -bottom-0.5 -right-0.5 flex items-end gap-[1.5px] bg-[#404040] rounded-sm p-[2px]">
                                                                                <div className="w-[3px] h-1 bg-[#FAFF00] rounded-sm" />
                                                                                <div className="w-[3px] h-1.5 bg-[#FAFF00] rounded-sm" />
                                                                                <div className="w-[3px] h-2 bg-[#FAFF00] rounded-sm" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@webflow</span>
                                                                        <span className="text-xs font-medium text-black/50 leading-tight">6years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard2Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2020
                                                        </div>
                                                        <button
                                                            onClick={() => setCard2Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            {/* Dark Grey Webflow Badge */}
                                                            <div className="h-14 w-14 rounded-full bg-[#404040] z-0 flex items-center justify-center">
                                                                <span className="text-[#FAFF00] font-black text-2xl tracking-tighter">W</span>
                                                                <div className="absolute -bottom-1 -right-1 flex items-end gap-[2px] bg-[#404040] rounded-sm p-1">
                                                                    <div className="w-1 h-1.5 bg-[#FAFF00] rounded-sm" />
                                                                    <div className="w-1 h-2.5 bg-[#FAFF00] rounded-sm" />
                                                                    <div className="w-1 h-3.5 bg-[#FAFF00] rounded-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@webflow</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">6years ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        First freelance steps
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        First real client. First real panic. Working for yourself and working for someone else are completely different. I had to learn how to manage time, expectations, and actually deliver something end-to-end without a safety net.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 3 (Left Aligned) */}
                            <div className="w-full lg:w-[38%] self-start relative z-10 lg:ml-64 lg:mt-16">
                                {/* Premium Checkpoint Line for Card 3 (Left Side) */}
                                <CheckpointScrollReveal className="absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card3Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card3Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card3Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'21" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                Beyond what I knew
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                A biotech project that made me think this isn't possible in Webflow. Turns out it was.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <div className="h-12 w-12 rounded-lg bg-[#8A8A8A] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <span className="text-white font-black text-sm tracking-wider">F/S</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@fiftyseven</span>
                                                                        <span className="text-sm text-black/50 mt-0.5">5years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard3Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2021
                                                        </div>
                                                        <button
                                                            onClick={() => setCard3Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            {/* F/S Badge */}
                                                            <div className="h-14 w-14 rounded-lg bg-[#8A8A8A] z-0 flex items-center justify-center border-2 border-[#2B2B2B]">
                                                                <span className="text-white font-black text-lg tracking-wider">F/S</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@fiftyseven</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">5years ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        Beyond what I knew
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        A biotech project that made me think this isn't possible in Webflow. Turns out it was. Pushing the platform to its absolute limits taught me more than any tutorial ever could.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 4 (Right Aligned) */}
                            <div className="w-full lg:w-[38%] self-end relative z-10 lg:mr-16">
                                {/* Premium Checkpoint Line for Card 4 (Right Side) */}
                                <CheckpointScrollReveal className="absolute -right-4 lg:-right-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card4Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card4Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card4Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'22" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                Leveling up
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                The year animations and CMS stopped being extras and started shaping how every project feels.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <div className="h-12 w-12 rounded-lg bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <span className="text-black font-black text-[0.7rem] tracking-wider">GSAP</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@gsap</span>
                                                                        <span className="text-sm text-black/50 mt-0.5">4years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard4Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2022
                                                        </div>
                                                        <button
                                                            onClick={() => setCard4Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            {/* GSAP Badge */}
                                                            <div className="h-14 w-14 rounded-lg bg-[#FAFF00] z-0 flex items-center justify-center border-2 border-[#2B2B2B]">
                                                                <span className="text-black font-black text-sm tracking-wider">GSAP</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@gsap</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">4years ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        Leveling up
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        The year animations and CMS stopped being extras and started shaping how every project feels. With GSAP, things that seemed impossible before became a regular Tuesday. Every project became an opportunity to push motion further.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 5 (Right Aligned, slightly further right) */}
                            <div className="w-full lg:w-[38%] self-end relative z-10 lg:mr-20 mt-10 lg:-mt-6">
                                {/* Premium Checkpoint Line for Card 5 (Left Side) */}
                                <CheckpointScrollReveal className="absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card5Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card5Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card5Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'23" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                From trust to referrals
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <div className="h-12 w-12 rounded-full bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <Check size={18} className="text-black stroke-[3]" />
                                                                        </div>
                                                                        <div className="h-12 w-12 rounded-full bg-[#FAFF00] relative z-0 flex items-center justify-center border-2 border-[#E6E5D8] -ml-4">
                                                                            <Check size={18} className="text-black stroke-[3]" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@clients</span>
                                                                        <span className="text-sm text-black/50 mt-0.5">3years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard5Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2023
                                                        </div>
                                                        <button
                                                            onClick={() => setCard5Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            <div className="h-14 w-14 rounded-full bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#2B2B2B]">
                                                                <Check size={24} className="text-black stroke-[3]" />
                                                            </div>
                                                            <div className="h-14 w-14 rounded-full bg-[#FAFF00] relative z-0 flex items-center justify-center border-2 border-[#2B2B2B] -ml-4">
                                                                <Check size={24} className="text-black stroke-[3]" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@clients</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">3years ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        From trust to referrals
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different. The entire year was sustained by word-of-mouth recommendations alone. That was the moment I realized the actual value of over-delivering.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 6 (Left Aligned, heavily pushed right) */}
                            <div className="w-full lg:w-[38%] self-start relative z-10 lg:ml-64 mt-10 lg:-mt-6">
                                {/* Premium Checkpoint Line for Card 6 (Left Side) */}
                                <CheckpointScrollReveal className="absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card6Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card6Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card6Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'24" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                A life-changing year
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative flex">
                                                                        <div className="h-12 w-12 rounded-full bg-[#D1D0C3] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]">
                                                                            <Home size={20} className="text-[#FAFF00] fill-[#FAFF00]" />
                                                                        </div>
                                                                        <div className="h-12 w-12 rounded-full overflow-hidden relative z-0 border-2 border-[#E6E5D8] -ml-4">
                                                                            <img src="https://i.pravatar.cc/150?img=32" alt="Djina" className="w-full h-full object-cover" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@family</span>
                                                                        <span className="text-sm text-black/50 mt-0.5">2years ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard6Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2024
                                                        </div>
                                                        <button
                                                            onClick={() => setCard6Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative flex items-center">
                                                            <div className="h-14 w-14 rounded-full bg-[#D1D0C3] relative z-10 flex items-center justify-center border-2 border-[#2B2B2B]">
                                                                <Home size={24} className="text-[#FAFF00] fill-[#FAFF00]" />
                                                            </div>
                                                            <div className="h-14 w-14 rounded-full overflow-hidden relative z-0 border-2 border-[#2B2B2B] -ml-4">
                                                                <img src="https://i.pravatar.cc/150?img=32" alt="Djina" className="w-full h-full object-cover" />
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@family</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">2years ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        A life-changing year
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it. It's no longer just about pushing pixels or writing clean code, it's about building a future for them.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>

                            {/* CARD 7 (Right Aligned) */}
                            <div className="w-full lg:w-[38%] self-end relative z-10 lg:mr-24 mt-10 lg:mt-6">
                                {/* Premium Checkpoint Line for Card 7 (Left Side) */}
                                <CheckpointScrollReveal className="absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none">
                                    {/* Yellow Endpoint Dot */}
                                    <div data-straight="true" data-dashed-after="true" className="timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" />
                                </CheckpointScrollReveal>

                                <CardScrollReveal>
                                    <motion.article
                                        layout
                                        initial={false}
                                        animate={{
                                            backgroundColor: card7Expanded ? "#2B2B2B" : "#E6E5D8",
                                            borderColor: card7Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
                                        }}
                                        transition={{
                                            layout: { type: "spring", bounce: 0, duration: 0.65 },
                                            backgroundColor: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        className="relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border"
                                    >
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            {!card7Expanded ? (
                                                <motion.div
                                                    key="collapsed"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Huge yellow year */}
                                                    <div className="mb-4">
                                                        <LineReveal delay={0}>
                                                            <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                                <RollingYear text="'26" />
                                                            </div>
                                                        </LineReveal>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <LineReveal delay={50}>
                                                            <h3 className="text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black">
                                                                The journey continues
                                                            </h3>
                                                        </LineReveal>

                                                        <LineReveal delay={100}>
                                                            <p className="mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium">
                                                                Seven years in. Still obsessed. Now figuring out how AI fits into what I do.
                                                            </p>
                                                        </LineReveal>

                                                        <LineReveal delay={150}>
                                                            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                <div className="flex min-w-0 items-center gap-4">
                                                                    <div className="relative">
                                                                        <img src="https://i.pravatar.cc/150?img=11" alt="Nenad" className="w-12 h-12 rounded-full object-cover border-2 border-[#E6E5D8]" />
                                                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#40C057] rounded-full border-2 border-[#E6E5D8]" />
                                                                    </div>
                                                                    <div className="flex flex-col justify-center">
                                                                        <span className="text-sm font-semibold text-black leading-tight">@nenad</span>
                                                                        <span className="text-sm text-black/50 mt-0.5">2hours ago</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={() => setCard7Expanded(true)}
                                                                    className="shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5"
                                                                >
                                                                    Read more
                                                                </button>
                                                            </div>
                                                        </LineReveal>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="expanded"
                                                    initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
                                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                    exit={{ opacity: 0, filter: "blur(4px)", y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
                                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                                                    className="w-full flex flex-col"
                                                >
                                                    {/* Top section: Year & Close Button */}
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]">
                                                            2026
                                                        </div>
                                                        <button
                                                            onClick={() => setCard7Expanded(false)}
                                                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                                                            aria-label="Close details"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>

                                                    {/* Avatar section (moved to top) */}
                                                    <div className="flex items-center mb-6">
                                                        <div className="relative">
                                                            <img src="https://i.pravatar.cc/150?img=11" alt="Nenad" className="w-14 h-14 rounded-full object-cover border-2 border-[#2B2B2B]" />
                                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#40C057] rounded-full border-2 border-[#2B2B2B]" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-[1.05rem] font-bold text-white leading-none">@nenad</p>
                                                            <p className="text-[0.95rem] text-white/50 mt-1">2hours ago</p>
                                                        </div>
                                                    </div>

                                                    {/* Text content */}
                                                    <h3 className="text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4">
                                                        The journey continues
                                                    </h3>
                                                    <p className="text-[1.05rem] leading-relaxed text-white/80 font-medium">
                                                        Seven years in. Still obsessed. Now figuring out how AI fits into what I do. The tools keep changing, but the goal remains the same: building digital experiences that feel human and leave a lasting impression.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.article>
                                </CardScrollReveal>
                            </div>
                        </div>
                    </section>

                    <Reveal><section id="projects" className="scroll-mt-24 w-full bg-[#111111] text-white py-24 px-[clamp(1rem,2.8vw,3.5rem)] rounded-[2.5rem] mt-24 mb-12">
                        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                            <h2 className="display-lg max-w-2xl text-white">Built in Webflow,<br />Made to Perform</h2>
                            <p className="text-[1.05rem] leading-[1.6] text-white/70 max-w-md pb-2">
                                Over seven years I've helped businesses across different industries turn their ideas into websites that look and work exactly how they imagined. Here's a look at some of that work.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {PROJECTS.map((p, i) => (
                                <Reveal key={p.name} delay={i * 100} y={40} scale={0.96}>
                                    <article
                                        className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2 hover:bg-white/10"
                                    >
                                        <div className="flex items-center justify-between p-5 absolute top-0 inset-x-0 z-10 pointer-events-none">
                                            <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[0.7rem] font-bold tracking-wide text-white border border-white/20">
                                                {p.n}
                                            </span>
                                            <div className="flex flex-wrap justify-end gap-1.5">
                                                {p.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-[0.7rem] font-bold tracking-wide text-white/90 border border-white/20"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <img
                                                src={p.img}
                                                alt={`${p.name} project preview`}
                                                loading="lazy"
                                                decoding="async"
                                                width={900}
                                                height={560}
                                                className="h-[18rem] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex items-end justify-between gap-4 p-7 bg-gradient-to-t from-black/80 to-transparent relative -mt-16 pt-20">
                                            <div className="min-w-0 z-10">
                                                <h3 className="text-[2rem] leading-none font-black tracking-[-0.04em] text-white group-hover:text-[#FAFF00] transition-colors duration-500">{p.name}</h3>
                                                <p className="mt-3 text-[0.95rem] leading-[1.6] text-white/70 font-medium line-clamp-2">
                                                    {p.desc}
                                                </p>
                                            </div>
                                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:bg-[#FAFF00] group-hover:text-black group-hover:scale-110 group-hover:rotate-45 z-10">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 13L13 1M13 1H3.4M13 1V10.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </section></Reveal>

                    <Reveal><section id="offer" className="scroll-mt-24 text-center">
                        <SectionLabel>Capabilities overview</SectionLabel>
                        <p className="mx-auto mt-7 max-w-5xl display-lg">
                            Strategy, precision, and development combined — turning your vision into a{" "}
                            <span className="text-primary">powerful digital experience</span> that feels
                            effortless.
                        </p>
                    </section></Reveal>

                    <Reveal><section id="services" className="scroll-mt-24">
                        <SectionLabel>Services</SectionLabel>
                        <h2 className="mt-5 max-w-2xl display-lg">
                            Ways we can work together
                        </h2>
                        <div className="mt-12 grid gap-4 md:grid-cols-2">
                            {SERVICES.map((s, i) => (
                                <Reveal key={s.title} delay={i * 120} y={30}>
                                    <article className="rounded-3xl bg-card p-8 transition-all duration-500 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 hover:bg-card/80">
                                        <h3 className="text-xl font-bold">{s.title}</h3>
                                        <p className="mt-3 body-copy">{s.body}</p>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </section></Reveal>

                    <Reveal><section id="clients" className="scroll-mt-24">
                        <SectionLabel>Clients</SectionLabel>
                        <h2 className="mt-5 max-w-2xl display-lg">
                            People who trusted the process
                        </h2>
                        <div className="mt-12 grid gap-4 md:grid-cols-3">
                            {CLIENTS.map((c, i) => (
                                <Reveal key={c.name} delay={i * 150} y={30} as="figure">
                                    <figure className="rounded-3xl bg-card p-7 transition-all duration-500 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 h-full">
                                        <blockquote className="text-[0.95rem] leading-[1.6]">"{c.quote}"</blockquote>
                                        <figcaption className="mt-5 flex items-center gap-3">
                                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-dark text-xs font-bold text-surface-dark-foreground">
                                                {c.name
                                                    .split(" ")
                                                    .map((w) => w[0])
                                                    .join("")}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold">{c.name}</p>
                                                <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    </section></Reveal>

                    <Reveal><section id="faq" className="scroll-mt-24">
                        <SectionLabel>FAQ</SectionLabel>
                        <h2 className="mt-5 max-w-lg display-lg">Got any questions?</h2>
                        <div className="mt-12">
                            <Faq />
                        </div>
                    </section></Reveal>

                    <Reveal><section
                        id="contact"
                        className="scroll-mt-24 rounded-[1.5rem] sm:rounded-[2rem] bg-surface-dark px-5 sm:px-8 py-14 sm:py-20 text-center"
                    >
                        <h2 className="mx-auto max-w-3xl display-lg text-surface-dark-foreground">
                            Let's build something worth showing off.
                        </h2>
                        <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-[1.62] text-surface-dark-foreground/60">
                            Currently taking on two new projects a month. Tell me what you're building and I'll
                            tell you honestly whether I'm the right fit.
                        </p>
                        <a
                            href="mailto:hello@afish.com"
                            className="mt-8 inline-block rounded-lg bg-primary px-8 py-4 font-display text-sm font-black text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
                        >
                            Book a Call
                        </a>
                    </section></Reveal>

                    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
                        <p>© {new Date().getFullYear()} afish. All rights reserved.</p>
                        <p>Designed and built end to end.</p>
                    </footer>
                </main>
            </div>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-block rounded-full bg-card px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
            {children}
        </span>
    );
}

