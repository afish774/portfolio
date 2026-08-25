import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { RollingYear } from "./Reveal";

/* ------------------------------------------------------------------ */
/*  Timeline data – matches the 6 cards from heynesh.com reference    */
/* ------------------------------------------------------------------ */

export const TIMELINE_DATA = [
    {
        year: "'19",
        title: "Starting out with my brother",
        body: "My brother Stefan showed me Webflow. I bothered him with questions for three months straight. He probably regrets it.",
        handle: "@stefan",
        when: "7years ago",
        initials: "ST",
    },
    {
        year: "'20",
        title: "First freelance steps",
        body: "First real client. First real panic. Working for yourself and working for someone else are completely different.",
        handle: "@webflow",
        when: "6years ago",
        initials: "WF",
    },
    {
        year: "'21",
        title: "Beyond what I knew",
        body: "A biotech project that made me think this isn't possible in Webflow. Turns out it was.",
        handle: "@fiftyseven",
        when: "5years ago",
        initials: "F/S",
    },
    {
        year: "'22",
        title: "Leveling up",
        body: "The year animations and CMS stopped being extras and started shaping how every project feels.",
        handle: "@gsap",
        when: "4years ago",
        initials: "GS",
    },
    {
        year: "'23",
        title: "From trust to referrals",
        body: "No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different.",
        handle: "@clients",
        when: "3years ago",
        initials: "CL",
    },
    {
        year: "'24",
        title: "A life-changing year",
        body: "I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it.",
        handle: "@family",
        when: "2years ago",
        initials: "FM",
    },
];

/* ------------------------------------------------------------------ */
/*  Card positioning – matching reference frame analysis               */
/*  right / center-left alternating pattern from frames                */
/* ------------------------------------------------------------------ */

const CARD_LAYOUT: Array<{
    side: "right" | "left";
    posClass: string;
}> = [
    { side: "right",  posClass: "lg:ml-auto lg:mr-[3%]" },    // '19 - right
    { side: "left",   posClass: "lg:ml-[8%] lg:mr-auto" },    // '20 - center-left
    { side: "left",   posClass: "lg:ml-[5%] lg:mr-auto" },    // '21 - center-left
    { side: "right",  posClass: "lg:ml-auto lg:mr-[5%]" },    // '22 - right
    { side: "right",  posClass: "lg:ml-auto lg:mr-[3%]" },    // '23 - right
    { side: "left",   posClass: "lg:ml-[5%] lg:mr-auto" },    // '24 - center-left
];

/* ------------------------------------------------------------------ */
/*  Single Timeline Card                                               */
/* ------------------------------------------------------------------ */

function TimelineCard({
    item,
    index,
}: {
    item: (typeof TIMELINE_DATA)[number];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });

    const layout = CARD_LAYOUT[index];

    return (
        <div
            ref={ref}
            className={`w-full lg:w-[44%] relative z-10 ${layout.posClass}`}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, 60px, 0) scale(0.97)",
                filter: isInView ? "none" : "blur(4px)",
                transition:
                    "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s ease",
            }}
        >
            <article
                className="w-full rounded-[1.5rem] p-8 sm:p-10 shadow-sm"
                style={{
                    background: "oklch(0.93 0.008 100 / 65%)",
                    border: "1px solid oklch(0.88 0.012 105 / 50%)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* Year */}
                <div
                    className="font-display leading-none font-black tracking-[-0.06em]"
                    style={{
                        fontSize: "clamp(4rem, 7vw, 5.5rem)",
                        color: "var(--primary)",
                    }}
                >
                    <RollingYear text={item.year} />
                </div>

                {/* Title */}
                <h3
                    className="mt-3 font-black tracking-[-0.03em]"
                    style={{
                        fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
                        lineHeight: 1.15,
                        color: "var(--foreground)",
                    }}
                >
                    {item.title}
                </h3>

                {/* Body */}
                <p
                    className="mt-3 max-w-lg"
                    style={{
                        fontSize: "0.94rem",
                        lineHeight: 1.6,
                        color: "var(--muted-foreground)",
                    }}
                >
                    {item.body}
                </p>

                {/* Footer: avatar + handle + read more */}
                <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Avatar circle */}
                        <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[0.6rem] font-bold"
                            style={{
                                background: "var(--surface-dark)",
                                color: "var(--surface-dark-foreground)",
                            }}
                        >
                            {item.initials}
                        </span>
                        {/* Secondary icon */}
                        <SecondaryIcon handle={item.handle} />
                        <div className="min-w-0">
                            <p
                                className="truncate font-bold"
                                style={{ fontSize: "0.82rem" }}
                            >
                                {item.handle}
                            </p>
                            <p
                                className="truncate"
                                style={{
                                    fontSize: "0.72rem",
                                    color: "var(--muted-foreground)",
                                }}
                            >
                                {item.when}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="shrink-0 rounded-full px-4 py-2 text-[0.72rem] font-bold transition-colors"
                        style={{
                            border: "1px solid var(--border)",
                            background: "var(--background)",
                            color: "var(--foreground)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--primary)";
                            e.currentTarget.style.color = "var(--primary-foreground)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--background)";
                            e.currentTarget.style.color = "var(--foreground)";
                        }}
                    >
                        Read more
                    </button>
                </div>
            </article>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Secondary Icon – small yellow branded icon next to avatar          */
/* ------------------------------------------------------------------ */

function SecondaryIcon({ handle }: { handle: string }) {
    const iconMap: Record<string, string> = {
        "@stefan": "W",
        "@webflow": "W",
        "@fiftyseven": "F/S",
        "@gsap": "GS",
        "@clients": "✓",
        "@family": "★",
    };

    const content = iconMap[handle] || "•";

    return (
        <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.5rem] font-black -ml-2"
            style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                zIndex: 1,
            }}
        >
            {content}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/*  SVG Curved Connecting Line                                         */
/* ------------------------------------------------------------------ */

function ConnectingLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 30%"],
    });

    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    const dashOffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0]);

    // Dot visibility transforms
    const dot1Opacity = useTransform(scrollYProgress, [0.08, 0.12], [0, 1]);
    const dot2Opacity = useTransform(scrollYProgress, [0.22, 0.26], [0, 1]);
    const dot3Opacity = useTransform(scrollYProgress, [0.38, 0.42], [0, 1]);
    const dot4Opacity = useTransform(scrollYProgress, [0.52, 0.56], [0, 1]);
    const dot5Opacity = useTransform(scrollYProgress, [0.68, 0.72], [0, 1]);
    const dot6Opacity = useTransform(scrollYProgress, [0.82, 0.86], [0, 1]);

    const dotOpacities = [dot1Opacity, dot2Opacity, dot3Opacity, dot4Opacity, dot5Opacity, dot6Opacity];

    // S-curve path connecting card positions
    // ViewBox: 1000 x 3600
    // Cards: right(~780) → left(~300) → left(~280) → right(~720) → right(~780) → left(~300)
    const svgPath = [
        "M 780,80",
        "C 780,200 900,350 780,450",
        "C 650,560 350,480 300,620",
        "C 240,780 200,900 280,1020",
        "C 360,1140 300,1250 300,1350",
        "C 300,1480 400,1600 550,1700",
        "C 700,1800 850,1850 780,2020",
        "C 700,2200 900,2300 800,2450",
        "C 700,2600 950,2650 850,2800",
        "C 750,2950 500,2900 400,3050",
        "C 300,3200 280,3300 350,3450",
    ].join(" ");

    // Dot positions at inflection points
    const dotPositions = [
        { cx: 780, cy: 80 },
        { cx: 300, cy: 620 },
        { cx: 280, cy: 1020 },
        { cx: 550, cy: 1700 },
        { cx: 850, cy: 2800 },
        { cx: 350, cy: 3450 },
    ];

    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 1000 3600"
            preserveAspectRatio="none"
            fill="none"
            style={{ zIndex: 1 }}
        >
            <motion.path
                ref={pathRef}
                d={svgPath}
                stroke="var(--foreground)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: dashOffset,
                }}
            />

            {dotPositions.map((dot, i) => (
                <motion.circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="6"
                    fill="oklch(0.75 0.15 120)"
                    stroke="var(--foreground)"
                    strokeWidth="1.5"
                    style={{ opacity: dotOpacities[i] }}
                />
            ))}
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Main JourneyTimeline Component                                     */
/* ------------------------------------------------------------------ */

export function JourneyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="mt-16 relative">
            {/* SVG connecting line */}
            <ConnectingLine containerRef={containerRef} />

            {/* Timeline cards */}
            <div className="flex flex-col gap-16 sm:gap-24 relative z-10">
                {TIMELINE_DATA.map((item, index) => (
                    <TimelineCard key={item.year} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}
