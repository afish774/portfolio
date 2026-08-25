import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function TimelineThread({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    const [path, setPath] = useState("");
    const [dashedPath, setDashedPath] = useState("");
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 50%"] // Draw exactly at viewport center to wait for cards to fully form
    });

    // Add buttery smooth spring physics to the drawing animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001
    });

    // Make the solid line draw first (0% to 90% of scroll progress)
    const solidProgress = useTransform(smoothProgress, [0, 0.9], [0, 1]);
    
    // Then the dashed line draws (90% to 100% of scroll progress)
    const dashedProgress = useTransform(smoothProgress, [0.9, 1], [0, 1]);

    const pathRef = useRef<SVGPathElement>(null);
    const [anchorPoints, setAnchorPoints] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        const updatePath = () => {
            if (!containerRef.current) return;
            const anchors = Array.from(containerRef.current.querySelectorAll('.timeline-anchor')) as HTMLElement[];
            if (anchors.length < 2) return;

            // Helper to generate perfectly smooth, zero-bounce continuous curves.
            // Uses a distance-scaled tangent approach (similar to Centripetal Catmull-Rom) 
            // which mathematically prevents wild overshoots, loops, or kinks regardless of point spacing.
            const generateSmoothSpline = (points: { x: number, y: number, element?: HTMLElement | null }[], tension = 0.35) => {
                if (points.length < 2) return { solid: '', dashed: '' };
                let dSolid = `M ${points[0]!.x} ${points[0]!.y} `;
                let dDashed = '';

                for (let i = 0; i < points.length - 1; i++) {
                    const p0 = i === 0 ? points[0]! : points[i - 1]!;
                    const p1 = points[i]!;
                    const p2 = points[i + 1]!;
                    const p3 = i + 2 < points.length ? points[i + 2]! : p2;

                    // Distance between current points (chord length)
                    const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);

                    // Tangent at p1
                    const tx1 = p2.x - p0.x;
                    const ty1 = p2.y - p0.y;
                    const len1 = Math.hypot(tx1, ty1) || 1;

                    // Tangent at p2
                    const tx2 = p3.x - p1.x;
                    const ty2 = p3.y - p1.y;
                    const len2 = Math.hypot(tx2, ty2) || 1;

                    const isDashed = p2.element?.dataset?.['dashed'] === "true";
                    
                    // Control points are strictly bounded by the chord length to prevent loops
                    const cp1x = p1.x + (tx1 / len1) * (d12 * tension);
                    const cp1y = p1.y + (ty1 / len1) * (d12 * tension);

                    const cp2x = p2.x - (tx2 / len2) * (d12 * tension);
                    const cp2y = p2.y - (ty2 / len2) * (d12 * tension);

                    const segment = `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
                    dSolid += segment;

                    // If this endpoint requests a trailing dashed line, shoot it out along the exact end tangent!
                    if (p2.element?.dataset?.['dashedAfter'] === "true") {
                        const dashLen = 160; // Length of the dashed tail
                        const endX = p2.x + (tx2 / len2) * dashLen;
                        const endY = p2.y + (ty2 / len2) * dashLen;
                        dDashed += `M ${p2.x} ${p2.y} L ${endX} ${endY} `;
                    }
                }
                return { solid: dSolid, dashed: dDashed };
            };

            const rawPoints: { x: number, y: number, element: HTMLElement }[] = [];

            // 1. Gather all actual anchor dot positions bypassing framer-motion transforms
            anchors.forEach((anchor) => {
                let x = 0;
                let y = 0;
                let el: HTMLElement | null = anchor;

                // Traverse offset parents up to the container to get the true layout position,
                // completely ignoring any active scroll-reveal animations (transforms).
                while (el && el !== containerRef.current) {
                    x += el.offsetLeft;
                    y += el.offsetTop;
                    el = el.offsetParent as HTMLElement;
                }

                // The anchor has classes: absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                // Because of `left-1/2`, `offsetLeft` is already pointing exactly at the parent's center line.
                // The `-translate-x-1/2` visually shifts the dot so its visual center perfectly rests on that line.
                // Therefore, `x` (which is just offsetLeft) is EXACTLY the visual center horizontally.

                // Because of `bottom-0`, `offsetTop` is the top edge of the dot.
                // The `translate-y-1/2` visually shifts the dot down by exactly half its height.
                // So the visual center vertically is: offsetTop + (height/2 for box center) + (height/2 for translate) = offsetTop + height.
                y += anchor.offsetHeight;

                rawPoints.push({ x, y, element: anchor });
            });

            // 2. Inject extra points to force the massive C-curve sweeps on same-side cards
            const finalPoints: { x: number, y: number, element?: HTMLElement | null }[] = [];
            const halfWidth = (containerRef.current?.offsetWidth || 1000) / 2;

            for (let i = 0; i < rawPoints.length; i++) {
                if (i > 0) {
                    const prevPt = rawPoints[i - 1]!;
                    const pt = rawPoints[i]!;
                    const prevIsLeft = prevPt.x < halfWidth;
                    const isLeft = pt.x < halfWidth;

                    if (prevIsLeft === isLeft) {
                        // Same side! Inject a midway point far out to the side to create the huge sweeping C-curve
                        const dy = pt.y - prevPt.y;
                        let bulge = Math.max(120, dy * 0.4);
                        const padding = 30; // Prevent going outside the screen edge

                        let bulgeX = 0;
                        if (isLeft) {
                            const extremeX = Math.min(prevPt.x, pt.x);
                            bulge = Math.min(bulge, extremeX - padding); // clamp left
                            bulgeX = extremeX - bulge;
                        } else {
                            const extremeX = Math.max(prevPt.x, pt.x);
                            const maxWidth = containerRef.current?.offsetWidth || 1000;
                            bulge = Math.min(bulge, maxWidth - padding - extremeX); // clamp right
                            bulgeX = extremeX + bulge;
                        }

                        finalPoints.push({
                            x: bulgeX,
                            y: prevPt.y + dy / 2
                        });
                    }
                }
                finalPoints.push(rawPoints[i]!);
            }

            // 3. Generate the mathematically perfect, zero-bounce continuous flow path
            const paths = generateSmoothSpline(finalPoints, 0.35);
            console.log("Timeline paths generated:", paths);
            setPath(paths.solid);
            setDashedPath(paths.dashed);
        };

        updatePath();
        const ro = new ResizeObserver(() => {
            window.requestAnimationFrame(updatePath);
        });
        if (containerRef.current) {
            ro.observe(containerRef.current);
        }
        return () => ro.disconnect();
    }, [containerRef]);

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block overflow-visible" style={{ minHeight: '100%' }}>
            <defs>
                <mask id="dashed-mask">
                    <motion.path
                        d={dashedPath}
                        fill="none"
                        stroke="white"
                        strokeWidth="10"
                        style={{ pathLength: dashedProgress }}
                    />
                </mask>
            </defs>
            <motion.path
                ref={pathRef}
                d={path}
                fill="none"
                stroke="#2B2B2B"
                strokeWidth="2"
                style={{ pathLength: solidProgress }}
            />
            {dashedPath && (
                <path
                    d={dashedPath}
                    fill="none"
                    stroke="#2B2B2B"
                    strokeWidth="2"
                    strokeDasharray="20 20"
                    strokeDashoffset="20"
                    mask="url(#dashed-mask)"
                />
            )}
        </svg>
    );
}
