import { useState } from "react";

const ITEMS = [
    {
        q: "Why a custom build instead of a template?",
        a: "Templates fight you the moment your content grows. A custom build maps to how your team actually works, and stays fast as it scales.",
    },
    {
        q: "Do you handle design, or only development?",
        a: "Both. I can take a Figma file and build it precisely, or design and build the whole thing from a brief.",
    },
    {
        q: "Already have a site that needs work?",
        a: "I audit what's there first, then fix performance, structure and CMS setup before touching the visuals.",
    },
    {
        q: "What does ongoing support look like?",
        a: "Monthly retainers cover updates, new pages, performance checks and small experiments — no ticket queue.",
    },
    {
        q: "What's the process from start to launch?",
        a: "Discovery, structure, design pass, build, QA, launch. You see progress at the end of every stage.",
    },
    {
        q: "How do you handle revisions and feedback?",
        a: "Two structured revision rounds per stage, collected on a live staging link so nothing gets lost in email.",
    },
    {
        q: "Do you work under NDA?",
        a: "Yes. I've worked on projects requiring strict confidentiality, from pre-launch products to internal tools.",
    },
    {
        q: "Not sure which plan fits your project?",
        a: "Book a call. Fifteen minutes is usually enough to tell you the honest scope and range.",
    },
];

export function Faq() {
    const [open, setOpen] = useState<number | null>(6);

    return (
        <div className="grid gap-3 md:grid-cols-2">
            {ITEMS.map((item, i) => (
                <div key={item.q} className="h-fit rounded-xl bg-card">
                    <button
                        type="button"
                        onClick={() => setOpen(open === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        aria-expanded={open === i}
                    >
                        <span className="text-sm font-bold">{item.q}</span>
                        <span className="shrink-0 text-lg leading-none text-muted-foreground">
                            {open === i ? "−" : "+"}
                        </span>
                    </button>
                    {open === i && (
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                    )}
                </div>
            ))}
        </div>
    );
}