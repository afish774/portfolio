import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

type Props = {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** vertical travel in px */
    y?: number;
    /** horizontal travel in px */
    x?: number;
    /** scale from 0-1, default 1 */
    scale?: number;
    /** rotation in degrees */
    rotate?: number;
    as?: "div" | "section" | "article" | "span" | "figure";
};

export function Reveal({ children, className = "", delay = 0, y = 28, x = 0, scale = 1, rotate = 0, as = "div" }: Props) {
    const ref = useRef<HTMLElement | null>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setShown(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setShown(true);
                        io.disconnect();
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const Tag = as as any;
    const transform = shown
        ? "none"
        : `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    return (
        <Tag
            ref={ref as any}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform,
                filter: shown ? "none" : "blur(6px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.8s ease ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </Tag>
    );
}

/** Reveals children one after another with a stagger. */
export function RevealGroup({
    children,
    step = 90,
    className = "",
    y,
    x,
    scale,
    rotate,
}: {
    children: ReactNode[];
    step?: number;
    className?: string;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
}) {
    return (
        <div className={className}>
            {children.map((child, i) => (
                <Reveal key={i} delay={i * step} {...(y === undefined ? {} : { y })} {...(x === undefined ? {} : { x })} {...(scale === undefined ? {} : { scale })} {...(rotate === undefined ? {} : { rotate })}>
                    {child}
                </Reveal>
            ))}
        </div>
    );
}


export function LineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);

    // We use the delay as a pseudo-stagger by shifting the start offset.
    // We use the delay as a pseudo-stagger by shifting the start offset.
    // Base 80% means it waits until the element is 20% up from the bottom before starting.
    const offsetStart = 80 - (delay / 30);
    // Reduced from 20 to 10 to make the reveal complete twice as fast during scrolling
    const offsetEnd = offsetStart - 10;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${offsetStart}%`, `start ${offsetEnd}%`]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["110%", "0%"]);

    return (
        <span ref={ref} className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block"
                style={{ y }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function RollingYear({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "start 75%"] // Finishes faster (at 75% instead of 60%)
    });

    const characters = text.split("");

    return (
        <span ref={ref} className={`inline-flex overflow-hidden ${className}`} style={{ height: "1em", lineHeight: "1em" }}>
            {characters.map((char, index) => {
                const isDigit = /\d/.test(char);
                if (!isDigit) {
                    return (
                        <span key={index} className="inline-flex items-center justify-center" style={{ height: "1em" }}>
                            {char}
                        </span>
                    );
                }

                const targetDigit = parseInt(char, 10);
                const column = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, targetDigit];

                return (
                    <DigitColumn
                        key={index}
                        column={column}
                        progress={scrollYProgress}
                        index={index}
                    />
                );
            })}
        </span>
    );
}

function DigitColumn({ column, progress, index }: { column: number[], progress: any, index: number }) {
    const start = 0;
    const end = 1;

    // We want the column to translate up by 1em for each digit
    const y = useTransform(progress, [start, end], ["0em", `-${column.length - 1}em`]);

    return (
        <span className="inline-flex flex-col overflow-hidden" style={{ height: "1em" }}>
            <motion.span style={{ y }} className="flex flex-col">
                {column.map((num, i) => (
                    <span key={i} className="inline-flex items-center justify-center" style={{ height: "1em" }}>
                        {num}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

export function CardScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        // Start animation when the top of the card is 90% down the screen.
        // Finish animation when the top of the card is 50% down the screen (center).
        offset: ["start 90%", "start 50%"]
    });

    // Apply physical momentum to the scroll progress for a buttery smooth parallax effect
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y = useTransform(smoothProgress, [0, 1], [120, 0]);
    const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
    const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
    const rotateX = useTransform(smoothProgress, [0, 1], [12, 0]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                y,
                opacity,
                scale,
                rotateX,
                transformOrigin: "50% 100%",
                perspective: 1200,
                willChange: "transform, opacity"
            }}
        >
            {children}
        </motion.div>
    );
}

export function CheckpointScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 50%"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Perfectly mirror the CardScrollReveal for a seamless attached feel
    const y = useTransform(smoothProgress, [0, 1], [120, 0]);
    const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
    const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{
                y,
                opacity,
                scale,
                transformOrigin: "50% 100%",
                willChange: "transform, opacity"
            }}
        >
            {children}
        </motion.div>
    );
}

export function PremiumLineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    
    const offsetStart = 85 - (delay / 25);
    const offsetEnd = offsetStart - 15;

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`start ${offsetStart}%`, `start ${offsetEnd}%`]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["110%", "0%"]);

    return (
        <span ref={ref} className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block"
                style={{ y }}
            >
                {children}
            </motion.span>
        </span>
    );
}
