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
            className="group relative flex w-[28rem] shrink-0 flex-col rounded-2xl border border-white/[0.06] bg-[#141414] p-5 transition-colors duration-300 hover:bg-[#1c1c1c]"
        >
            {/* Top Row: Number + Tags */}
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/40">{project.n}</span>
                <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/15 px-3 py-1 text-[0.7rem] font-medium text-white/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Media */}
            <div className="h-72 w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-black">
                <img
                    src={project.img}
                    alt={`${project.name} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                />
            </div>

            {/* Text */}
            <h3 className="mt-5 text-[1.75rem] font-bold tracking-tight text-white leading-tight">{project.name}</h3>
            <p className="mt-2 pr-14 text-sm leading-relaxed text-white/45">{project.desc}</p>

            {/* FAB — Yellow Arrow */}
            <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-[#FAFF00] text-black transition-all duration-300 group-hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 13L13 1M13 1H3.4M13 1V10.6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
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
        <section
            ref={sectionRef}
            id="projects"
            className="relative scroll-mt-24 overflow-hidden bg-[#0a0a0a] text-white"
        >
            <div className="flex min-h-screen flex-col justify-between py-16 lg:py-20">
                {/* ── Header ──────────────────────────────────────── */}
                <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6">
                    {/* Offset to match the sidebar placeholder width */}
                    <div className="lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/60">
                                    Selected Work
                                </span>
                                <h2 className="mt-6 text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                                    Built in Webflow,
                                    <br />
                                    Made to Perform
                                </h2>
                            </div>
                            <p className="max-w-sm pb-2 text-[0.95rem] leading-[1.7] text-white/55">
                                Over seven years I've helped businesses across different industries turn
                                their ideas into websites that look and work exactly how they imagined.
                                Here's a look at some of that work.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Horizontal Track ────────────────────────────── */}
                <div className="mt-auto pt-12">
                    <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-6">
                        <div
                            ref={trackRef}
                            className="flex gap-5 lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]"
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
    );
}
