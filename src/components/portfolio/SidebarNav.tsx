import { useEffect, useState } from "react";
import tronLogo from "@/assets/tron-logo.svg";

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

const LOGOS = [
    { id: "tcs", name: "TCS", src: "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22black%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%20%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ETata%20Consultancy%20Services%3C%2Ftitle%3E%3Cpath%20d%3D%22M24%2016.262c0-1.305-.522-2.174-1.827-3.088l-1.785-1.24c-.033-.022-.06-.045-.092-.068-.629-.473-.91-.912-.91-1.43%200-.696.567-1.13%201.371-1.13%201.022%200%201.503.477%202.111.477.479%200%20.805-.326.805-.804%200-.348-.174-.631-.631-.848-.718-.348-1.503-.48-2.35-.48-.892%200-1.676.262-2.241.697a.984.984%200%200%200%200-.001%203.64%203.64%200%200%200-.326.283l-.008.01c-.65.695-1.19%201.714-1.623%203.145l-.501%201.652c-.893%202.912-2.306%204.304-4.504%204.304-2.415%200-3.938-1.675-3.938-4.153v.026-.025c0-2.468%201.509-4.159%203.69-4.174l.03-.002a4.857%204.857%200%200%201%202.089.457c.282.13.522.174.74.174.1%200%20.192-.017.279-.041.362-.103.592-.408.592-.83%200-.326-.196-.653-.653-.87-.827-.414-1.894-.653-3.046-.653-.86%200-1.653.152-2.359.436-2.117.851-3.452%202.886-3.452%205.545l.002-.024-.001.024c0%20.931.169%201.783.479%202.536-.452.985-1.143%201.509-2.046%201.509-1.087%200-1.804-.63-1.806-2.06V9.477h2.546c.588%200%20.979-.348.979-.848s-.39-.848-.98-.848H2.09V5.563c0-.653-.435-1.088-1.044-1.088C.435%204.475%200%204.911%200%205.563v10.285c0%202.393%201.37%203.655%203.7%203.655.486.001.97-.08%201.43-.24h.005a3.49%203.49%200%200%200%201.81-1.514c1.034%201.117%202.565%201.775%204.48%201.775.999%200%201.868-.195%202.65-.607h.003c1.588-.827%202.72-2.502%203.503-5.068l.457-1.5a2.984%202.984%200%200%201-.162-.234c.308.492.785.953%201.468%201.43l1.631%201.13c.244.17.463.34.668.51.289.322.378.67.378%201.078%200%20.935-.74%201.566-1.807%201.566-1.022%200-1.893-.522-2.371-.522s-.806.325-.806.804c0%20.348.174.63.632.848.631.304%201.653.566%202.567.566%201.153%200%202.111-.348%202.785-.957a1.59%201.59%200%200%200%20.156-.161A3.104%203.104%200%200%200%2024%2016.262z%22%2F%3E%3C%2Fsvg%3E" },
    { id: "ibm", name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { id: "tron", name: "Tron Academy", src: tronLogo },
];

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
            <div className="rounded-2xl bg-card p-4">
                <div className="flex items-center justify-between">
                    <span data-slot="wordmark" className="rounded-md bg-primary px-2 py-1 font-display text-sm font-black tracking-tight text-primary-foreground">
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
                    <p className="font-display text-2xl font-black text-primary">6+</p>
                    <p className="mt-1 text-[0.65rem] font-semibold text-muted-foreground">Projects</p>
                </div>
                <div data-slot="stat-2" className="p-4 text-center">
                    <p className="font-display text-2xl font-black text-primary">1+</p>
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

            <div data-fade className="overflow-hidden rounded-2xl bg-card py-3 flex group">
                <div className="flex shrink-0 w-max marquee-track gap-6 pr-6">
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        logo.src ? (
                            <img
                                key={`1-${logo.id}-${i}`}
                                src={logo.src}
                                alt={logo.name}
                                className="h-4 object-contain opacity-40 brightness-0 transition-all hover:opacity-100 hover:brightness-0"
                            />
                        ) : (
                            <span
                                key={`1-${logo.id}-${i}`}
                                className="whitespace-nowrap text-xs font-bold uppercase text-muted-foreground"
                            >
                                {logo.name}
                            </span>
                        )
                    ))}
                </div>
                <div aria-hidden="true" className="flex shrink-0 w-max marquee-track gap-6 pr-6">
                    {[...LOGOS, ...LOGOS].map((logo, i) => (
                        logo.src ? (
                            <img
                                key={`2-${logo.id}-${i}`}
                                src={logo.src}
                                alt={logo.name}
                                className="h-4 object-contain opacity-40 brightness-0 transition-all hover:opacity-100 hover:brightness-0"
                            />
                        ) : (
                            <span
                                key={`2-${logo.id}-${i}`}
                                className="whitespace-nowrap text-xs font-bold uppercase text-muted-foreground"
                            >
                                {logo.name}
                            </span>
                        )
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