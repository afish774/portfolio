import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-velocity "echo smear" — the signature effect from heynesh.com.
 *
 * While the page scrolls, the wrapped content leaves a short trail of ghost
 * copies behind its motion: each echo is offset further along the scroll
 * direction and fades out more, so fast scrolling produces the stretched,
 * duplicated look and everything settles back to a single copy at rest.
 */

const ECHOES = 3;
// how far each echo trails (multiplier of the smoothed scroll velocity)
const TRAIL = [0.9, 1.9, 3.0];
// peak opacity per echo
const OPACITY = [0.55, 0.34, 0.18];
// max px offset for the furthest echo
const MAX_OFFSET = 110;

type Props = {
    children: ReactNode;
    className?: string;
};

export function SmearTrail({ children, className = "" }: Props) {
    const echoRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let raf = 0;
        let lastY = window.scrollY;
        let smooth = 0;

        const loop = () => {
            const y = window.scrollY;
            const velocity = y - lastY; // px scrolled this frame
            lastY = y;

            // ease toward the live velocity so the trail stretches and settles
            smooth += (velocity - smooth) * 0.16;

            const visible = Math.min(1, Math.abs(smooth) / 7);
            echoRefs.current.forEach((el, i) => {
                if (!el) return;
                const raw = smooth * (TRAIL[i] ?? 1) * 2.2;
                const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw));
                el.style.transform = `translate3d(0, ${offset}px, 0)`;
                el.style.opacity = String((OPACITY[i] ?? 0.2) * visible);
            });

            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div className={`relative ${className}`}>
            {Array.from({ length: ECHOES }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        echoRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 select-none"
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                >
                    {children}
                </div>
            ))}
            <div className="relative">{children}</div>
        </div>
    );
}
