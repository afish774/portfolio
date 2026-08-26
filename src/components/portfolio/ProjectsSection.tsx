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
            className="group relative flex w-[380px] shrink-0 flex-col rounded-2xl border border-white/5 bg-[#141414] p-6 transition-colors duration-300 hover:bg-[#1a1a1a]"
        >
            {/* Top Row: Number + Tags */}
            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-white/50">{project.n}</span>
                <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Media */}
            <div className="h-64 w-full overflow-hidden rounded-xl">
                <img
                    src={project.img}
                    alt={`${project.name} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                />
            </div>

            {/* Text */}
            <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">{project.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{project.desc}</p>

            {/* FAB — Yellow Arrow */}
            <span className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-[#FAFF00] text-black transition-transform duration-300 group-hover:scale-110">
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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!section || !wrapper || !track) return;

        const ctx = gsap.context(() => {
            /* ─── 1. Dark-theme crossfade ─────────────────────────── */
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress;
                    // Interpolate background from transparent to #0a0a0a
                    section.style.backgroundColor = `rgba(10, 10, 10, ${p})`;
                },
            });

            /* ─── 2. Horizontal pin + scroll ──────────────────────── */
            const totalScroll = track.scrollWidth - wrapper.clientWidth;

            gsap.to(track, {
                x: () => -totalScroll,
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
            className="scroll-mt-24 relative text-white"
        >
            {/* ── Inner wrapper (gets pinned) ─────────────────────── */}
            <div ref={wrapperRef} className="min-h-screen overflow-hidden">
                {/* ── Header ──────────────────────────────────────── */}
                <div className="flex flex-col gap-10 px-[clamp(1rem,2.8vw,3.5rem)] pt-24 pb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
                            Selected Work
                        </span>
                        <h2 className="mt-5 text-5xl font-bold tracking-tight lg:text-7xl">
                            Built in Webflow,
                            <br />
                            Made to Perform
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-white/60 lg:pb-2">
                        Over seven years I've helped businesses across different industries turn
                        their ideas into websites that look and work exactly how they imagined.
                        Here's a look at some of that work.
                    </p>
                </div>

                {/* ── Horizontal Track ────────────────────────────── */}
                <div
                    ref={trackRef}
                    className="flex gap-6 px-[clamp(1rem,2.8vw,3.5rem)] pb-24"
                    style={{ willChange: "transform" }}
                >
                    {projects.map((p) => (
                        <ProjectCard key={p.name} project={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
