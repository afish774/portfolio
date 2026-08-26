import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Types ────────────────────────────────────────────────── */
interface ProjectData {
    n: string;
    img: string;
    name: string;
    desc: string;
    tags: string[];
    url?: string;
}

/* ── Project Card ─────────────────────────────────────────── */
function ProjectCard({ project }: { project: ProjectData }) {
    return (
        <a
            href={project.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-[350px] lg:w-[420px] h-[clamp(350px,60vh,550px)] shrink-0 flex-col rounded-[2.5rem] border border-white/5 bg-[#161616] p-6 lg:p-8 transition-colors duration-300 hover:bg-[#1c1c1c] overflow-hidden"
        >
            {/* Top Row: Number + Tags */}
            <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/70">
                    {project.n}
                </span>
                <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Media */}
            <div className="mb-8 mt-6 h-[55%] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-black">
                <img
                    src={project.img}
                    alt={`${project.name} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                />
            </div>

            {/* Text */}
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-3xl font-bold tracking-tight text-white leading-tight">{project.name}</h3>
                <p className="pr-14 text-sm leading-relaxed text-white/60">{project.desc}</p>
            </div>

            {/* FAB — Yellow Arrow */}
            <span className="absolute bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-[#ffeb3b] text-black transition-transform duration-300 ease-out group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
            </span>
        </a>
    );
}

/* ── Projects Section ─────────────────────────────────────── */
export function ProjectsSection({ projects }: { projects: ProjectData[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            /* ─── Horizontal pin + scroll ──────────────────────── */
            const totalScroll = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${totalScroll}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <div id="projects" className="scroll-mt-24">
            <section
                ref={sectionRef}
                className="relative overflow-hidden bg-[#0f0f0f] text-white"
            >
                <div className="flex min-h-screen flex-col pt-4 lg:pt-8 pb-4">
                {/* ── Header ──────────────────────────────────────── */}
                <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6">
                    {/* Offset to match the sidebar placeholder width */}
                    <div className="lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/60">
                                    Selected Work
                                </span>
                                <h2 className="mt-4 text-[3rem] leading-[1.1] lg:text-[5.5rem] font-black tracking-tighter text-white mb-4 lg:leading-[1.05]">
                                    Built in Webflow,
                                    <br />
                                    Made to Perform
                                </h2>
                            </div>
                            <p className="max-w-sm pb-4 text-[0.95rem] leading-[1.7] text-white/55 z-10 relative">
                                Over seven years I've helped businesses across different industries turn
                                their ideas into websites that look and work exactly how they imagined.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Horizontal Track ────────────────────────────── */}
                <div className="mt-2 lg:mt-6 lg:mb-auto">
                    <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6">
                        <div
                            ref={trackRef}
                            className="flex gap-8 lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]"
                            style={{ willChange: "transform" }}
                        >
                            {projects.map((p) => (
                                <ProjectCard key={p.name} project={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}
