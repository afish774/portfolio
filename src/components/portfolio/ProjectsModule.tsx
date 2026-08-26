import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Dynamic Data ─────────────────────────────────────────── */
const PROJECTS_DATA = [
    {
        id: "proj-1",
        number: "01",
        tags: ["Components", "GSAP", "SEO"],
        title: "1910.ai",
        description: "Pioneering small and large molecule therapeutics discovery by integrating multimodal data.",
        imageGradient: "from-indigo-900/40 to-black",
        hoverText: "Multimodal AI Platform for Modality Agnostic Drug Discovery™"
    },
    {
        id: "proj-2",
        number: "02",
        tags: ["CMS", "API", "Motion"],
        title: "SemiconBio",
        description: "Fully realizing the promise of molecular electronics with the SemiconBio platform.",
        imageGradient: "from-emerald-900/40 to-black",
        hoverText: "Molecule-as-a-service Architecture"
    },
    {
        id: "proj-3",
        number: "03",
        tags: ["React", "WebGL", "UX"],
        title: "Happy Ring",
        description: "With accuracy validated to clinical gold standards, and all-day comfort exceeding expectations.",
        imageGradient: "from-rose-900/40 to-black",
        hoverText: "Next-gen Wearable Wellness Tech"
    }
];

/* ── Project Card Component ───────────────────────────────── */
function ProjectCard({ project }: { project: typeof PROJECTS_DATA[0] }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div
            tabIndex={0}
            className="group relative flex w-[380px] lg:w-[420px] h-[600px] shrink-0 flex-col rounded-[2.5rem] border border-white/5 bg-[#161616] p-8 overflow-hidden mr-8 focus-within:ring-2 focus-within:ring-yellow-400 outline-none transition-colors hover:bg-[#1a1a1a]"
        >
            {/* Top Row */}
            <div className="flex items-center justify-between relative z-10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xs font-bold text-white/70">
                    {project.number}
                </span>
                <div className="flex gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Interactive Media Area */}
            <div
                className={`relative mt-6 mb-8 h-[55%] w-full shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${project.imageGradient}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsClicked(true)}
            >
                {/* Hover Reveal Text Box */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 p-6 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
                        isHovered && !isClicked ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <p className="text-center font-semibold text-white leading-relaxed">
                        {project.hoverText}
                    </p>
                </div>

                {/* Click State Reveal */}
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-white transition-transform duration-500 ease-out origin-center ${
                        isClicked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                >
                    <span className="text-black font-bold animate-pulse">Loading...</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 relative z-10">
                <h3 className="mb-3 text-3xl font-bold tracking-tight text-white">{project.title}</h3>
                <p className="text-sm leading-relaxed text-white/60 pr-12">{project.description}</p>
            </div>

            {/* FAB */}
            <button
                className="absolute bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-[#ffeb3b] text-black transition-transform duration-300 group-hover:scale-110 z-20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`View ${project.title}`}
            >
                <ArrowUpRight className="h-6 w-6" strokeWidth={2.5} />
            </button>
        </div>
    );
}

/* ── Sidebar Module ───────────────────────────────────────── */
function FloatingSidebar() {
    const [copied, setCopied] = useState(false);

    return (
        <aside className="relative lg:fixed lg:left-0 lg:top-0 w-full lg:w-[340px] lg:h-screen p-6 flex flex-col gap-5 lg:pointer-events-none z-40">
            {/* Bio Card */}
            <div className="bg-[#1a1a1a] rounded-[2rem] p-6 border border-white/5 pointer-events-auto">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffeb3b] px-3 py-1">
                    <span className="font-bold text-black text-sm tracking-tight">NESH<sup className="text-[10px] ml-[1px]">®</sup></span>
                </div>
                <p className="text-white/60 text-sm mt-4 leading-relaxed">
                    Working closely with your team to deliver Webflow builds that merge creativity, technical excellence, and long-term value.
                </p>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-3 pointer-events-auto">
                <div className="bg-[#1a1a1a] rounded-[1.5rem] p-5 border border-white/5 text-center flex flex-col justify-center items-center">
                    <span className="text-[#ffeb3b] font-black text-3xl">80+</span>
                    <span className="text-white font-semibold text-[10px] uppercase tracking-widest mt-2">Projects</span>
                </div>
                <div className="bg-[#1a1a1a] rounded-[1.5rem] p-5 border border-white/5 text-center flex flex-col justify-center items-center">
                    <span className="text-[#ffeb3b] font-black text-3xl">7+</span>
                    <span className="text-white font-semibold text-[10px] uppercase tracking-widest mt-2">Years of<br />experience</span>
                </div>
            </div>

            {/* Glassmorphism Nav */}
            <nav 
                className="hidden lg:flex flex-col gap-2 pointer-events-auto pb-8"
                style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
            >
                <a href="#home" className="px-4 py-2.5 rounded-full text-white/70 font-bold text-sm tracking-widest hover:bg-white/5 transition-colors">HOME</a>
                <a href="#about" className="px-4 py-2.5 rounded-full text-white/70 font-bold text-sm tracking-widest hover:bg-white/5 transition-colors">ABOUT ME</a>
                <a href="#projects" className="px-4 py-2.5 rounded-full bg-[#ffeb3b] text-black font-bold text-sm tracking-widest">PROJECTS</a>
                <a href="#services" className="px-4 py-2.5 rounded-full text-white/70 font-bold text-sm tracking-widest hover:bg-white/5 transition-colors">SERVICES</a>
                <a href="#clients" className="px-4 py-2.5 rounded-full text-white/70 font-bold text-sm tracking-widest hover:bg-white/5 transition-colors">CLIENTS</a>
            </nav>

            {/* Footer Actions (Pinned to bottom on desktop) */}
            <div className="mt-auto pointer-events-auto hidden lg:block">
                <button 
                    onClick={() => {
                        navigator.clipboard?.writeText("hello@nesh.com");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                    }}
                    className="w-full bg-[#222] rounded-xl p-4 text-white/50 text-xs flex justify-between items-center mb-3 hover:bg-[#2a2a2a] transition-colors"
                >
                    <span>hello@nesh.com</span>
                    {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                </button>
                <button className="w-full bg-[#ffeb3b] text-black font-extrabold py-4 rounded-xl hover:scale-[1.02] transition-transform">
                    Book a Call
                </button>
            </div>
        </aside>
    );
}

/* ── Main Gallery / Export ────────────────────────────────── */
export default function ProjectsModule() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const mm = gsap.matchMedia();

        // Desktop horizontal scroll
        mm.add("(min-width: 1024px)", () => {
            const track = trackRef.current!;
            const totalScroll = track.scrollWidth - window.innerWidth;
            
            // Only pin if there is enough content to scroll
            if (totalScroll > 0) {
                gsap.to(track, {
                    x: -totalScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${totalScroll}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section 
            ref={sectionRef} 
            className="relative w-full overflow-hidden bg-[#0f0f0f] text-white min-h-screen font-sans"
        >
            <FloatingSidebar />

            {/* Main Content Area */}
            <div className="w-full lg:ml-[340px] pt-16 pl-6 lg:pl-12 flex flex-col justify-between min-h-screen">
                
                {/* Header */}
                <div className="pr-6 lg:pr-12 w-full max-w-[1200px] flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end z-10 relative">
                    <div>
                        <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/60 mb-6">
                            Selected Work
                        </span>
                        <h2 className="text-5xl lg:text-8xl font-black tracking-tighter text-white mb-8 lg:mb-16 leading-[1.05]">
                            Built in Webflow,<br />
                            Made to Perform
                        </h2>
                    </div>
                    <p className="max-w-xs text-white/55 text-sm leading-relaxed mb-8 lg:mb-20">
                        Over seven years I've helped businesses across different industries turn their ideas into websites that look and work exactly how they imagined.
                    </p>
                </div>

                {/* GSAP Horizontal Scroll Gallery */}
                <div className="mt-auto pb-16 lg:pb-32 w-full z-10 relative overflow-x-auto lg:overflow-x-visible no-scrollbar">
                    <div 
                        ref={trackRef} 
                        className="flex lg:inline-flex px-6 lg:px-0 lg:pl-0"
                    >
                        {PROJECTS_DATA.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Global styles for hiding scrollbar on mobile container */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
}
