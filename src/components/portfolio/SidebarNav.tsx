import { useEffect, useState } from "react";

import {
    BriefcaseBusiness,
    CircleHelp,
    CircleUserRound,
    House,
    Layers3,
    UsersRound,
    Zap,
    type LucideIcon,
} from "lucide-react";

const SECTIONS: { id: string; label: string; Icon: LucideIcon }[] = [
    { id: "home", label: "HOME", Icon: House },
    { id: "about", label: "ABOUT ME", Icon: CircleUserRound },
    { id: "projects", label: "PROJECTS", Icon: BriefcaseBusiness },
    { id: "offer", label: "WHAT YOU GET", Icon: Layers3 },
    { id: "services", label: "SERVICES", Icon: Zap },
    { id: "clients", label: "CLIENTS", Icon: UsersRound },
    { id: "faq", label: "FAQ", Icon: CircleHelp },
];

const LOGOS = ["SemiconBio", "CURRI", "Omicron", "puck", "1910", "alosant", "Lilipad"];

export function SidebarNav() {
    const [active, setActive] = useState("home");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <aside
            data-sidebar-container
            className="sticky top-6 hidden h-fit w-[clamp(15rem,16vw,18rem)] shrink-0 flex-col gap-3 lg:flex"
        >
            <div data-slot="wordmark" className="rounded-2xl bg-card p-4">
                <div className="flex items-center justify-between">
                    <span className="rounded-md bg-primary px-2 py-1 font-display text-sm font-black tracking-tight text-primary-foreground">
                        NESH<sup>®</sup>
                    </span>
                    <div className="flex gap-1">
                        {["X", "in"].map((s) => (
                            <a
                                key={s}
                                href="#contact"
                                aria-label={`Social ${s}`}
                                className="grid h-6 w-6 place-items-center rounded-md bg-surface-dark text-[0.6rem] font-bold text-surface-dark-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Working closely with your team to deliver builds that merge creativity, technical
                    excellence, and long-term value.
                </p>
            </div>

            <div className="grid grid-cols-2 rounded-2xl bg-card">
                <div data-slot="stat-1" className="border-r border-border p-4 text-center">
                    <p className="font-display text-2xl font-black text-primary">80+</p>
                    <p className="mt-1 text-[0.65rem] font-semibold text-muted-foreground">Projects</p>
                </div>
                <div data-slot="stat-2" className="p-4 text-center">
                    <p className="font-display text-2xl font-black text-primary">7+</p>
                    <p className="mt-1 text-[0.65rem] font-semibold text-muted-foreground">
                        Years of experience
                    </p>
                </div>
            </div>

            <nav className="flex flex-col gap-1 rounded-2xl bg-card/75 p-2">
                {SECTIONS.map(({ id, label, Icon }) => {
                    return (
                        <a
                            key={id}
                            data-slot={`nav-${id}`}
                            href={`#${id}`}
                            className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-bold tracking-wide transition-colors ${active === id
                                ? "bg-primary text-primary-foreground"
                                : "bg-background/65 text-foreground/80 hover:bg-muted"
                                }`}
                        >
                            <Icon className="h-3 w-3 shrink-0" strokeWidth={3} />
                            <span>{label}</span>
                        </a>
                    );
                })}
            </nav>

            <div data-fade className="overflow-hidden rounded-2xl bg-card py-3">
                <div className="flex w-max marquee-track gap-6 px-3">
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        <span
                            key={`${logo}-${i}`}
                            className="whitespace-nowrap text-xs font-bold text-muted-foreground"
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
                    navigator.clipboard?.writeText("hello@heynesh.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                }}
                className="flex items-center justify-between rounded-xl bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <span>hello@heynesh.com</span>
                <span className="font-bold">{copied ? "✓" : "⧉"}</span>
            </button>

            <a
                href="#contact"
                data-slot="cta"
                className="rounded-xl bg-primary py-3 text-center font-display text-sm font-black text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
                Book a Call
            </a>
        </aside>
    );
}