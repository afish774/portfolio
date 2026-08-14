import { useEffect, useState } from "react";

export const INTRO_DONE_EVENT = "intro:done";

/** True once the intro curtain has lifted (or was skipped). */
export function useIntroDone() {
    const [done, setDone] = useState(false);
    useEffect(() => {
        if ((window as any).__introDone) {
            setDone(true);
            return;
        }
        const on = () => setDone(true);
        window.addEventListener(INTRO_DONE_EVENT, on);
        return () => window.removeEventListener(INTRO_DONE_EVENT, on);
    }, []);
    return done;
}

function markIntroDone() {
    (window as any).__introDone = true;
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

const LETTERS = ["N", "E", "S", "H"] as const;
const LETTER_STAGGER = 220;
const LOAD_DURATION = 1400;

/**
 * Warm-beige preloader that mirrors the hero's letter-reveal choreography.
 * The background stays consistent so the transition into the hero feels seamless.
 */
export function Intro() {
    const [phase, setPhase] = useState<"loading" | "revealing" | "gone">("loading");
    const [progress, setProgress] = useState(0);
    const [lettersRevealed, setLettersRevealed] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPhase("gone");
            markIntroDone();
            return;
        }

        document.body.style.overflow = "hidden";

        // Progress counter
        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / LOAD_DURATION);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setPhase("revealing");
                markIntroDone();
                window.setTimeout(() => {
                    setPhase("gone");
                    document.body.style.overflow = "";
                }, 900);
            }
        };
        raf = requestAnimationFrame(tick);

        // Letter stagger
        const letterTimer = window.setInterval(() => {
            setLettersRevealed((prev) => {
                if (prev >= LETTERS.length) {
                    window.clearInterval(letterTimer);
                    return prev;
                }
                return prev + 1;
            });
        }, LETTER_STAGGER);

        return () => {
            cancelAnimationFrame(raf);
            window.clearInterval(letterTimer);
            document.body.style.overflow = "";
        };
    }, []);

    if (phase === "gone") return null;

    const isRevealing = phase === "revealing";

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col justify-between px-6 py-8 sm:px-10"
            aria-hidden="true"
            style={{
                backgroundColor: "var(--color-background)",
                opacity: isRevealing ? 0 : 1,
                transition: "opacity 800ms cubic-bezier(0.45, 0, 0.55, 1)",
            }}
        >
            {/* Top bar */}
            <div className="flex items-start justify-between font-display text-[0.7rem] font-bold tracking-[0.25em] text-foreground/40 uppercase">
                <span
                    style={{
                        opacity: lettersRevealed >= 1 ? 1 : 0,
                        transform: lettersRevealed >= 1 ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 500ms ease-out, transform 600ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                >
                    Creative Web Developer
                </span>
                <span
                    style={{
                        opacity: lettersRevealed >= 2 ? 1 : 0,
                        transform: lettersRevealed >= 2 ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 500ms ease-out, transform 600ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                >
                    Portfolio &rsquo;26
                </span>
            </div>

            {/* Center wordmark — letters reveal sequentially */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h2
                    className="font-display leading-[0.8] font-black tracking-[-0.045em] text-primary select-none"
                    style={{ fontSize: "clamp(5rem, 28vw, 24rem)" }}
                >
                    {LETTERS.map((letter, i) => {
                        const revealed = lettersRevealed > i;
                        return (
                            <span
                                key={letter}
                                className="inline-block"
                                style={{
                                    opacity: revealed ? 1 : 0,
                                    transform: revealed
                                        ? "translateY(0) scale(1)"
                                        : "translateY(60px) scale(0.7)",
                                    filter: revealed ? "blur(0px)" : "blur(14px)",
                                    transition:
                                        "opacity 550ms ease-out, transform 750ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 600ms ease-out",
                                }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                </h2>
            </div>

            {/* Bottom bar — progress */}
            <div className="relative z-10">
                <div className="flex items-end justify-between">
                    <span
                        className="font-display text-[0.7rem] font-bold tracking-[0.25em] text-foreground/40 uppercase"
                        style={{
                            opacity: lettersRevealed >= 1 ? 1 : 0,
                            transition: "opacity 400ms ease-out",
                        }}
                    >
                        Loading
                    </span>
                    <span
                        className="font-display text-5xl leading-none font-black text-foreground/25 tabular-nums sm:text-7xl"
                        style={{
                            opacity: lettersRevealed >= 3 ? 1 : 0,
                            transform: lettersRevealed >= 3 ? "translateY(0)" : "translateY(12px)",
                            transition: "opacity 500ms ease-out, transform 600ms cubic-bezier(0.16,1,0.3,1)",
                        }}
                    >
                        {progress.toString().padStart(3, "0")}
                    </span>
                </div>
                <div className="mt-4 h-[2px] w-full overflow-hidden bg-foreground/10">
                    <div
                        className="h-full bg-primary"
                        style={{
                            width: `${progress}%`,
                            transition: "width 80ms linear",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
