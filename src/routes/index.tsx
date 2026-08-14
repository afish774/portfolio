import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/portfolio/Reveal";
import { SmearTrail } from "@/components/portfolio/SmearTrail";
import { Hero } from "@/components/portfolio/Hero";

import { Faq } from "@/components/portfolio/Faq";
import { SidebarNav } from "@/components/portfolio/SidebarNav";
import proj1 from "@/assets/proj-1.jpg";
import proj2 from "@/assets/proj-2.jpg";
import proj3 from "@/assets/proj-3.jpg";
import proj4 from "@/assets/proj-4.jpg";
import proj5 from "@/assets/proj-5.jpg";
import proj6 from "@/assets/proj-6.jpg";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Nesh — Creative Web Developer & Designer" },
            {
                name: "description",
                content:
                    "Creative web developer with 7+ years and 80+ shipped projects. Fast, motion-rich, CMS-driven websites for ambitious brands.",
            },
            { property: "og:title", content: "Nesh — Creative Web Developer & Designer" },
            {
                property: "og:description",
                content:
                    "80+ projects across biotech, fintech and hospitality. Design, motion and development, applied differently.",
            },
        ],
    }),
    component: Index,
});

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
    return (
        <div className="min-h-screen bg-background">
            <Hero />

            <div className="relative z-10 mx-auto flex max-w-[110rem] gap-8 px-4 pt-12 pb-28 sm:px-6">
                <SidebarNav />

                <main className="min-w-0 flex-1 space-y-32 md:space-y-40">
                    <section id="about" className="scroll-mt-24 pt-10">
                        <Reveal>
                            <SmearTrail>
                                <div className="max-w-xl">
                                    <SectionLabel>Start small grow big</SectionLabel>
                                    <h2 className="mt-6 display-lg">
                                        About Me (&amp;)
                                        <br />
                                        My Journey
                                    </h2>
                                    <p className="mt-6 max-w-md body-copy">
                                        Seven years ago I opened my first editor. What happened after that is easier to
                                        show than explain.
                                    </p>
                                </div>
                            </SmearTrail>
                        </Reveal>

                        <div className="mt-16 flex flex-col gap-6 sm:gap-8">
                            {TIMELINE.map((t, i) => (
                                <Reveal key={t.year} delay={60}>
                                    <SmearTrail
                                        className={`lg:w-[80%] ${i % 2 ? "lg:mr-auto" : "lg:ml-auto"}`}
                                    >
                                        <article className="w-full rounded-3xl bg-card p-6 sm:p-8">
                                            <p className="font-display text-[2.6rem] leading-none font-black tracking-[-0.06em] text-primary">
                                                {t.year}
                                            </p>
                                            <h3 className="mt-4 text-[1.45rem] leading-tight font-black tracking-[-0.04em]">
                                                {t.title}
                                            </h3>
                                            <p className="mt-3 max-w-lg body-copy">{t.body}</p>
                                            <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-dark text-[0.62rem] font-bold text-surface-dark-foreground">
                                                        {t.handle.slice(1, 3).toUpperCase()}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-[0.82rem] font-bold">{t.handle}</p>
                                                        <p className="text-[0.72rem] text-muted-foreground">{t.when}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-[0.72rem] font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    Read more
                                                </button>
                                            </div>
                                        </article>
                                    </SmearTrail>
                                </Reveal>
                            ))}
                        </div>
                    </section>

                    <Reveal><section id="projects" className="scroll-mt-24">
                        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                            <h2 className="display-lg max-w-2xl">Built with care, Made to Perform</h2>
                            <p className="body-copy max-w-md">
                                Over 80 projects across biotech, civic tech, hospitality and fintech — helping teams
                                in very different industries turn their ideas into websites that look and work
                                exactly how they imagined. Here's some of that work.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {PROJECTS.map((p) => (
                                <article
                                    key={p.name}
                                    className="group relative overflow-hidden rounded-3xl bg-surface-dark"
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <span className="rounded-full bg-surface-dark-foreground/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-surface-dark-foreground/70">
                                            {p.n}
                                        </span>
                                        <div className="flex flex-wrap justify-end gap-1">
                                            {p.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-surface-dark-foreground/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-surface-dark-foreground/70"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <img
                                        src={p.img}
                                        alt={`${p.name} project preview`}
                                        loading="lazy"
                                        width={900}
                                        height={1100}
                                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="flex items-end justify-between gap-4 p-6">
                                        <div className="min-w-0">
                                            <h3 className="text-[1.7rem] leading-none font-black tracking-[-0.04em] text-surface-dark-foreground">{p.name}</h3>
                                            <p className="mt-3 text-[0.875rem] leading-[1.55] text-surface-dark-foreground/60">
                                                {p.desc}
                                            </p>
                                        </div>
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                                            ↗
                                        </span>
                                    </div>
                                </article>
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
                            {SERVICES.map((s) => (
                                <article key={s.title} className="rounded-3xl bg-card p-8">
                                    <h3 className="text-xl font-bold">{s.title}</h3>
                                    <p className="mt-3 body-copy">{s.body}</p>
                                </article>
                            ))}
                        </div>
                    </section></Reveal>

                    <Reveal><section id="clients" className="scroll-mt-24">
                        <SectionLabel>Clients</SectionLabel>
                        <h2 className="mt-5 max-w-2xl display-lg">
                            People who trusted the process
                        </h2>
                        <div className="mt-12 grid gap-4 md:grid-cols-3">
                            {CLIENTS.map((c) => (
                                <figure key={c.name} className="rounded-3xl bg-card p-7">
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
                        className="scroll-mt-24 rounded-[2rem] bg-surface-dark px-8 py-20 text-center"
                    >
                        <h2 className="mx-auto max-w-3xl display-lg text-surface-dark-foreground">
                            Let's build something worth showing off.
                        </h2>
                        <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-[1.62] text-surface-dark-foreground/60">
                            Currently taking on two new projects a month. Tell me what you're building and I'll
                            tell you honestly whether I'm the right fit.
                        </p>
                        <a
                            href="mailto:hello@heynesh.com"
                            className="mt-8 inline-block rounded-lg bg-primary px-8 py-4 font-display text-sm font-black text-primary-foreground transition-transform hover:-translate-y-0.5"
                        >
                            Book a Call
                        </a>
                    </section></Reveal>

                    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
                        <p>© {new Date().getFullYear()} Nesh. All rights reserved.</p>
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
