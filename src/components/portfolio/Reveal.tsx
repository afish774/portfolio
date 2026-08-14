import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** vertical travel in px */
    y?: number;
    as?: "div" | "section" | "article" | "span";
};

export function Reveal({ children, className = "", delay = 0, y = 28, as = "div" }: Props) {
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
    return (
        <Tag
            ref={ref as any}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
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
}: {
    children: ReactNode[];
    step?: number;
    className?: string;
    y?: number;
}) {
    return (
        <div className={className}>
            {children.map((child, i) => (
                <Reveal key={i} delay={i * step} {...(y === undefined ? {} : { y })}>
                    {child}
                </Reveal>
            ))}
        </div>
    );
}
