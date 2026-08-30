import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Sparkles, c as House, d as Check, f as BriefcaseBusiness, i as Target, l as CircleUserRound, n as X, o as ShieldCheck, r as UsersRound, s as Layers, t as Zap, u as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { a as motion, i as useScroll, n as useTransform, o as AnimatePresence, r as useMotionValue, t as useSpring } from "../_libs/framer-motion+[...].mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_54T2Qv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className = "", delay = 0, y = 28, x = 0, scale = 1, rotate = 0, as = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting) {
				setShown(true);
				io.disconnect();
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	const Tag = as;
	const transform = shown ? "none" : `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className,
		style: {
			opacity: shown ? 1 : 0,
			transform,
			filter: shown ? "none" : "blur(6px)",
			transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.8s ease ${delay}ms`,
			willChange: "opacity, transform"
		},
		children
	});
}
function LineReveal({ children, delay = 0, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const offsetStart = 80 - delay / 30;
	const offsetEnd = offsetStart - 10;
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: [`start ${offsetStart}%`, `start ${offsetEnd}%`]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["110%", "0%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: `block overflow-hidden ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "block",
			style: { y },
			children
		})
	});
}
function RollingYear({ text, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 95%", "start 75%"]
	});
	const characters = text.split("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: `inline-flex overflow-hidden ${className}`,
		style: {
			height: "1em",
			lineHeight: "1em"
		},
		children: characters.map((char, index) => {
			if (!/\d/.test(char)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center justify-center",
				style: { height: "1em" },
				children: char
			}, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitColumn, {
				column: [
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					parseInt(char, 10)
				],
				progress: scrollYProgress,
				index
			}, index);
		})
	});
}
function DigitColumn({ column, progress, index }) {
	const y = useTransform(progress, [0, 1], ["0em", `-${column.length - 1}em`]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex flex-col overflow-hidden",
		style: { height: "1em" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			style: { y },
			className: "flex flex-col",
			children: column.map((num, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center justify-center",
				style: { height: "1em" },
				children: num
			}, i))
		})
	});
}
function CardScrollReveal({ children, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 90%", "start 50%"]
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: .001
	});
	const y = useTransform(smoothProgress, [0, 1], [120, 0]);
	const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
	const scale = useTransform(smoothProgress, [0, 1], [.9, 1]);
	const rotateX = useTransform(smoothProgress, [0, 1], [12, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className,
		style: {
			y,
			opacity,
			scale,
			rotateX,
			transformOrigin: "50% 100%",
			perspective: 1200,
			willChange: "transform, opacity"
		},
		children
	});
}
function CheckpointScrollReveal({ children, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 90%", "start 50%"]
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: .001
	});
	const y = useTransform(smoothProgress, [0, 1], [120, 0]);
	const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
	const scale = useTransform(smoothProgress, [0, 1], [.9, 1]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className,
		style: {
			y,
			opacity,
			scale,
			transformOrigin: "50% 100%",
			willChange: "transform, opacity"
		},
		children
	});
}
function PremiumLineReveal({ children, delay = 0, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const offsetStart = 85 - delay / 25;
	const offsetEnd = offsetStart - 15;
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: [`start ${offsetStart}%`, `start ${offsetEnd}%`]
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: .001
	});
	const y = useTransform(smoothProgress, [0, 1], ["110%", "0%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: `block overflow-hidden ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "block",
			style: {
				y,
				willChange: "transform"
			},
			children
		})
	});
}
function TimelineThread({ containerRef }) {
	const [path, setPath] = (0, import_react.useState)("");
	const [dashedPath, setDashedPath] = (0, import_react.useState)("");
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 50%", "end 50%"]
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 20,
		restDelta: .001
	});
	const solidProgress = useTransform(smoothProgress, [0, .9], [0, 1]);
	const dashedProgress = useTransform(smoothProgress, [.9, 1], [0, 1]);
	const pathRef = (0, import_react.useRef)(null);
	const [anchorPoints, setAnchorPoints] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const updatePath = () => {
			if (!containerRef.current) return;
			const anchors = Array.from(containerRef.current.querySelectorAll(".timeline-anchor"));
			if (anchors.length < 2) return;
			const generateSmoothSpline = (points, tension = .35) => {
				if (points.length < 2) return {
					solid: "",
					dashed: ""
				};
				let dSolid = `M ${points[0].x} ${points[0].y} `;
				let dDashed = "";
				for (let i = 0; i < points.length - 1; i++) {
					const p0 = i === 0 ? points[0] : points[i - 1];
					const p1 = points[i];
					const p2 = points[i + 1];
					const p3 = i + 2 < points.length ? points[i + 2] : p2;
					const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
					const tx1 = p2.x - p0.x;
					const ty1 = p2.y - p0.y;
					const len1 = Math.hypot(tx1, ty1) || 1;
					const tx2 = p3.x - p1.x;
					const ty2 = p3.y - p1.y;
					const len2 = Math.hypot(tx2, ty2) || 1;
					p2.element?.dataset?.["dashed"];
					const segment = `C ${p1.x + tx1 / len1 * (d12 * tension)} ${p1.y + ty1 / len1 * (d12 * tension)}, ${p2.x - tx2 / len2 * (d12 * tension)} ${p2.y - ty2 / len2 * (d12 * tension)}, ${p2.x} ${p2.y} `;
					dSolid += segment;
					if (p2.element?.dataset?.["dashedAfter"] === "true") {
						const dashLen = 160;
						const endX = p2.x + tx2 / len2 * dashLen;
						const endY = p2.y + ty2 / len2 * dashLen;
						dDashed += `M ${p2.x} ${p2.y} L ${endX} ${endY} `;
					}
				}
				return {
					solid: dSolid,
					dashed: dDashed
				};
			};
			const rawPoints = [];
			anchors.forEach((anchor) => {
				let x = 0;
				let y = 0;
				let el = anchor;
				while (el && el !== containerRef.current) {
					x += el.offsetLeft;
					y += el.offsetTop;
					el = el.offsetParent;
				}
				y += anchor.offsetHeight;
				rawPoints.push({
					x,
					y,
					element: anchor
				});
			});
			const finalPoints = [];
			const halfWidth = (containerRef.current?.offsetWidth || 1e3) / 2;
			for (let i = 0; i < rawPoints.length; i++) {
				if (i > 0) {
					const prevPt = rawPoints[i - 1];
					const pt = rawPoints[i];
					const prevIsLeft = prevPt.x < halfWidth;
					const isLeft = pt.x < halfWidth;
					if (prevIsLeft === isLeft) {
						const dy = pt.y - prevPt.y;
						let bulge = Math.max(120, dy * .4);
						const padding = 30;
						let bulgeX = 0;
						if (isLeft) {
							const extremeX = Math.min(prevPt.x, pt.x);
							bulge = Math.min(bulge, extremeX - padding);
							bulgeX = extremeX - bulge;
						} else {
							const extremeX = Math.max(prevPt.x, pt.x);
							const maxWidth = containerRef.current?.offsetWidth || 1e3;
							bulge = Math.min(bulge, maxWidth - padding - extremeX);
							bulgeX = extremeX + bulge;
						}
						finalPoints.push({
							x: bulgeX,
							y: prevPt.y + dy / 2
						});
					}
				}
				finalPoints.push(rawPoints[i]);
			}
			const paths = generateSmoothSpline(finalPoints, .35);
			console.log("Timeline paths generated:", paths);
			setPath(paths.solid);
			setDashedPath(paths.dashed);
		};
		updatePath();
		const ro = new ResizeObserver(() => {
			window.requestAnimationFrame(updatePath);
		});
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [containerRef]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block overflow-visible",
		style: { minHeight: "100%" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
				id: "dashed-mask",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
					d: dashedPath,
					fill: "none",
					stroke: "white",
					strokeWidth: "10",
					style: { pathLength: dashedProgress }
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				ref: pathRef,
				d: path,
				fill: "none",
				stroke: "#2B2B2B",
				strokeWidth: "2",
				style: { pathLength: solidProgress }
			}),
			dashedPath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: dashedPath,
				fill: "none",
				stroke: "#2B2B2B",
				strokeWidth: "2",
				strokeDasharray: "20 20",
				strokeDashoffset: "20",
				mask: "url(#dashed-mask)"
			})
		]
	});
}
var hero_portrait_default$2 = "/assets/hero-portrait-DfIjHSCq.png";
var hero_portrait_default$1 = "/assets/hero-portrait-CUDSpHnd.webp";
var hero_portrait_default = "/assets/hero-portrait-cprGB9CG.webp";
var LOGOS = [
	{
		id: "tcs",
		name: "TCS",
		src: "data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22black%22%20role%3D%22img%22%20viewBox%3D%220%200%2024%2024%20%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3ETata%20Consultancy%20Services%3C%2Ftitle%3E%3Cpath%20d%3D%22M24%2016.262c0-1.305-.522-2.174-1.827-3.088l-1.785-1.24c-.033-.022-.06-.045-.092-.068-.629-.473-.91-.912-.91-1.43%200-.696.567-1.13%201.371-1.13%201.022%200%201.503.477%202.111.477.479%200%20.805-.326.805-.804%200-.348-.174-.631-.631-.848-.718-.348-1.503-.48-2.35-.48-.892%200-1.676.262-2.241.697a.984.984%200%200%200%200-.001%203.64%203.64%200%200%200-.326.283l-.008.01c-.65.695-1.19%201.714-1.623%203.145l-.501%201.652c-.893%202.912-2.306%204.304-4.504%204.304-2.415%200-3.938-1.675-3.938-4.153v.026-.025c0-2.468%201.509-4.159%203.69-4.174l.03-.002a4.857%204.857%200%200%201%202.089.457c.282.13.522.174.74.174.1%200%20.192-.017.279-.041.362-.103.592-.408.592-.83%200-.326-.196-.653-.653-.87-.827-.414-1.894-.653-3.046-.653-.86%200-1.653.152-2.359.436-2.117.851-3.452%202.886-3.452%205.545l.002-.024-.001.024c0%20.931.169%201.783.479%202.536-.452.985-1.143%201.509-2.046%201.509-1.087%200-1.804-.63-1.806-2.06V9.477h2.546c.588%200%20.979-.348.979-.848s-.39-.848-.98-.848H2.09V5.563c0-.653-.435-1.088-1.044-1.088C.435%204.475%200%204.911%200%205.563v10.285c0%202.393%201.37%203.655%203.7%203.655.486.001.97-.08%201.43-.24h.005a3.49%203.49%200%200%200%201.81-1.514c1.034%201.117%202.565%201.775%204.48%201.775.999%200%201.868-.195%202.65-.607h.003c1.588-.827%202.72-2.502%203.503-5.068l.457-1.5a2.984%202.984%200%200%201-.162-.234c.308.492.785.953%201.468%201.43l1.631%201.13c.244.17.463.34.668.51.289.322.378.67.378%201.078%200%20.935-.74%201.566-1.807%201.566-1.022%200-1.893-.522-2.371-.522s-.806.325-.806.804c0%20.348.174.63.632.848.631.304%201.653.566%202.567.566%201.153%200%202.111-.348%202.785-.957a1.59%201.59%200%200%200%20.156-.161A3.104%203.104%200%200%200%2024%2016.262z%22%2F%3E%3C%2Fsvg%3E"
	},
	{
		id: "ibm",
		name: "IBM",
		src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
	},
	{
		id: "tron",
		name: "Tron Academy",
		src: "/assets/tron-logo-BF_00gXi.svg"
	}
];
var SECTIONS = [
	{
		id: "home",
		label: "HOME",
		Icon: House
	},
	{
		id: "about",
		label: "ABOUT ME",
		Icon: CircleUserRound
	},
	{
		id: "projects",
		label: "PROJECTS",
		Icon: BriefcaseBusiness
	},
	{
		id: "offer",
		label: "WHAT YOU GET",
		Icon: Layers
	},
	{
		id: "services",
		label: "SERVICES",
		Icon: Zap
	},
	{
		id: "clients",
		label: "CLIENTS",
		Icon: UsersRound
	},
	{
		id: "faq",
		label: "FAQ",
		Icon: CircleQuestionMark
	}
];
var LEFT_NAV = [
	{
		label: "Home",
		href: "#home",
		morphKey: "nav-home"
	},
	{
		label: "About Me",
		href: "#about",
		morphKey: "nav-about"
	},
	{
		label: "Projects",
		href: "#projects",
		morphKey: "nav-projects"
	}
];
var RIGHT_NAV = [
	{
		label: "What You Get",
		href: "#offer",
		morphKey: "nav-offer"
	},
	{
		label: "Services",
		href: "#services",
		morphKey: "nav-services"
	},
	{
		label: "Clients",
		href: "#clients",
		morphKey: "nav-clients"
	},
	{
		label: "FAQ",
		href: "#faq",
		morphKey: "nav-faq"
	}
];
var InstagramIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "20",
			height: "20",
			x: "2",
			y: "2",
			rx: "5",
			ry: "5"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "17.5",
			x2: "17.51",
			y1: "6.5",
			y2: "6.5"
		})
	]
});
var LinkedinIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "4",
			height: "12",
			x: "2",
			y: "9"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "4",
			cy: "4",
			r: "2"
		})
	]
});
var SOCIALS = [{
	id: "ig",
	Icon: InstagramIcon,
	href: "#contact"
}, {
	id: "in",
	Icon: LinkedinIcon,
	href: "#contact"
}];
var TRAITS = [
	{
		label: "Creative",
		Icon: Sparkles
	},
	{
		label: "Reliable",
		Icon: ShieldCheck
	},
	{
		label: "Strategist",
		Icon: Target
	},
	{
		label: "Builder",
		Icon: Layers
	},
	{
		label: "Efficient",
		Icon: Zap
	}
];
var CUE = {
	a: 80,
	f: 200,
	i: 320,
	s: 440,
	h: 560,
	portrait: 720,
	portraitFocus: 1300,
	nav: 1600,
	headline: 1800,
	cards: 2050,
	buttons: 2300,
	footer: 2500
};
var EASE_OUT = [
	.16,
	1,
	.3,
	1
];
var EASE_SNAP = [
	.34,
	1.56,
	.64,
	1
];
function getRiseVariants(opts) {
	const { y = 24, x = 0, blur = 14, dur = 900, scale = 1, rotate = 0, delay = 0 } = opts;
	return {
		hidden: {
			opacity: 0,
			y,
			x,
			scale,
			rotate,
			filter: `blur(${blur}px)`
		},
		visible: {
			opacity: 1,
			y: 0,
			x: 0,
			scale: 1,
			rotate: 0,
			filter: "blur(0px)",
			transition: {
				duration: dur / 1e3,
				delay: delay / 1e3,
				ease: EASE_OUT
			}
		}
	};
}
function useCountUp(target, duration = 1200, start = 0, delayMs = 0) {
	const [value, setValue] = (0, import_react.useState)(start);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			const startTime = performance.now();
			let raf = 0;
			const tick = (now) => {
				const elapsed = now - startTime;
				const progress = Math.min(1, elapsed / duration);
				const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
				setValue(Math.round(start + (target - start) * eased));
				if (progress < 1) raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
			return () => cancelAnimationFrame(raf);
		}, delayMs);
		return () => clearTimeout(timer);
	}, [
		target,
		duration,
		start,
		delayMs
	]);
	return value;
}
function GlassCard({ className = "", children, morphKey, ...motionProps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"data-morph": morphKey,
		className: `rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.16] to-white/[0.035] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[7px] ${className}`,
		...motionProps,
		children
	});
}
function LetterReveal({ letter, delayMs, scrollY, morphActive, index }) {
	const constantZero = useMotionValue(0);
	const p = useTransform(morphActive ? constantZero : scrollY, [0, 800], [0, 1]);
	const yScroll = useTransform(p, (v) => v * -80);
	const initRot = [
		-8,
		6,
		-4,
		5,
		-6
	][index] ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "inline-block",
			initial: {
				opacity: 0,
				y: 100,
				scale: .5,
				rotate: initRot,
				filter: "blur(16px)",
				textShadow: "none"
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1,
				rotate: 0,
				filter: "blur(0px)",
				textShadow: "0 0 60px rgba(0,0,0,0.08)"
			},
			transition: {
				duration: 1,
				delay: delayMs / 1e3,
				ease: EASE_SNAP
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				style: {
					display: "inline-block",
					y: yScroll
				},
				children: letter
			})
		})
	});
}
function PortraitReveal({ morphActive, scrollY }) {
	const constantZero = useMotionValue(0);
	const p = useTransform(morphActive ? constantZero : scrollY, [0, 800], [0, 1]);
	const scrollBlur = useTransform(p, (v) => `blur(${Math.min(18, Math.max(0, (v - .04) * 19))}px)`);
	const scaleTransform = useTransform(p, (v) => 1 + v * .04);
	const yTransform = useTransform(p, (v) => v * 60);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"data-fx": "portrait",
		className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[min(82svh,42rem)] justify-center overflow-hidden lg:h-[min(101svh,67rem)]",
		initial: {
			opacity: 0,
			filter: "blur(22px)"
		},
		animate: {
			opacity: 1,
			filter: "blur(0px)"
		},
		transition: {
			duration: 1.2,
			delay: CUE.portrait / 1e3,
			ease: EASE_OUT
		},
		style: {
			y: yTransform,
			scale: scaleTransform,
			filter: scrollBlur,
			transformOrigin: "50% 100%"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "relative flex h-full w-full justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 z-10 pointer-events-none",
				style: { background: "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.15) 100%)" },
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: 1.5,
					delay: CUE.portraitFocus / 1e3,
					ease: "easeOut"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "h-full w-auto max-w-none",
				initial: {
					y: 140,
					scale: 1.12
				},
				animate: {
					y: 0,
					scale: 1
				},
				transition: {
					duration: 1.6,
					delay: CUE.portrait / 1e3,
					ease: EASE_OUT
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", {
					className: "h-full w-auto max-w-none block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							media: "(max-width: 767px)",
							srcSet: hero_portrait_default,
							type: "image/webp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							srcSet: hero_portrait_default$1,
							type: "image/webp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_portrait_default$2,
							alt: "Portrait of afish, Webflow expert",
							width: 1024,
							height: 1280,
							fetchPriority: "high",
							decoding: "async",
							className: "h-full w-auto max-w-none object-cover object-top mix-blend-multiply contrast-[1.04] saturate-[1.05]"
						})
					]
				})
			})]
		})
	});
}
function HeadlineReveal({ delayMs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "origin-center scale-x-[1.02] font-display text-center text-[clamp(3rem,5.05vw,6.2rem)] leading-[1.04] font-black text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]",
		children: [
			"Webflow,",
			"Applied",
			"Differently."
		].map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "inline-block",
				initial: {
					opacity: 0,
					y: "110%",
					filter: "blur(8px)"
				},
				animate: {
					opacity: 1,
					y: "0%",
					filter: "blur(0px)"
				},
				transition: {
					duration: .9,
					delay: (delayMs + i * 100) / 1e3,
					ease: EASE_OUT
				},
				children: line
			})
		}, line))
	});
}
function StatCard({ delayMs, morphKey, value, suffix, label, className = "", x }) {
	const count = useCountUp(value, 1400, 0, delayMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		morphKey,
		className,
		initial: "hidden",
		animate: "visible",
		variants: getRiseVariants({
			x: x ?? 0,
			y: 0,
			blur: 12,
			dur: 900,
			delay: delayMs
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-[clamp(3.2rem,4vw,4.8rem)] leading-none font-black text-primary",
			children: [count, suffix]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-[clamp(0.84rem,1.12vw,1.3rem)] leading-[1.18] font-bold text-white",
			children: label
		})]
	});
}
function NavGroup({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden lg:flex shrink-0 items-center justify-center",
		children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center",
			children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-fx": "fade-early",
				className: "mx-2 text-foreground/45 sm:mx-4",
				children: "|"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				"data-morph": item.morphKey,
				href: item.href,
				className: "block relative leading-none transition-colors hover:text-primary",
				children: item.label
			})]
		}, item.label))
	});
}
function MobileNav() {
	[...LEFT_NAV, ...RIGHT_NAV];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex lg:hidden w-full max-w-[28rem] flex-col gap-2 px-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md",
			children: LEFT_NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: item.href,
				className: "flex items-center justify-center rounded-xl py-2.5 text-[0.65rem] sm:text-[0.75rem] font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95",
				children: item.label
			}, item.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md",
			children: RIGHT_NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: item.href,
				className: "flex items-center justify-center rounded-xl py-2.5 text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-widest text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95",
				children: [item.label.split(" ")[0], " "]
			}, item.label))
		})]
	});
}
function HeroSidebar() {
	const [active, setActive] = (0, import_react.useState)("home");
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const centerLine = window.innerHeight / 2;
					let found = false;
					for (let i = SECTIONS.length - 1; i >= 0; i--) {
						const section = SECTIONS[i];
						if (!section) continue;
						const el = document.getElementById(section.id);
						if (el) {
							if (el.getBoundingClientRect().top <= centerLine) {
								setActive(section.id);
								found = true;
								break;
							}
						}
					}
					if (!found && SECTIONS.length > 0) {
						const firstSection = SECTIONS[0];
						if (firstSection) setActive(firstSection.id);
					}
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const isDarkSection = active === "projects";
	const transitionClass = "transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"data-sidebar-container": true,
		className: "hidden h-fit w-[clamp(14.5rem,15vw,17rem)] shrink-0 flex-col gap-4 lg:flex pb-8 pointer-events-auto",
		style: { opacity: 0 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[2rem] border border-white/5" : "bg-card rounded-xl border border-transparent"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-slot": "wordmark",
						onClick: () => {
							if (window.lenis) window.lenis.scrollTo(document.documentElement, { duration: 2.2 });
							else window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						className: `rounded-md px-3 py-1.5 font-display text-lg font-black tracking-tight text-black transition-colors duration-500 ease-in-out hover:bg-primary/0 ${isDarkSection ? "bg-[#ffeb3b]" : "bg-primary"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-start",
							children: ["AFISH", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
								className: "ml-[1px] mt-[4px] text-[10px] opacity-80 leading-none",
								children: "®"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: SOCIALS.map(({ id, Icon, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"data-slot": `social-${id}`,
							href,
							"aria-label": `Social ${id}`,
							className: `grid h-8 w-8 place-items-center rounded-md border transition-colors ${isDarkSection ? "border-white/10 bg-white/10 text-white/70 hover:bg-[#ffeb3b] hover:text-black" : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-fade": true,
					className: `mt-6 text-sm leading-relaxed text-left ${transitionClass} ${isDarkSection ? "text-white/60" : "text-muted-foreground"}`,
					children: "Working closely with your team to deliver builds that merge creativity, technical excellence, and long-term value."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-slot": "stat-1",
					className: `relative flex flex-col items-center justify-center p-5 overflow-hidden border shadow-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[1.5rem] border-white/5" : "bg-card rounded-xl border-white/5"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display text-4xl font-black z-10 ${isDarkSection ? "text-[#ffeb3b]" : "text-primary"}`,
						children: "6+"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `mt-2 text-center text-[10px] font-bold uppercase tracking-widest z-10 ${transitionClass} ${isDarkSection ? "text-white/90" : "text-muted-foreground"}`,
						children: [
							"Projects",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Delivered"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-slot": "stat-2",
					className: `relative flex flex-col items-center justify-center p-5 overflow-hidden border shadow-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDarkSection ? "bg-[#1a1a1a] rounded-[1.5rem] border-white/5" : "bg-card rounded-xl border-white/5"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `font-display text-4xl font-black z-10 ${isDarkSection ? "text-[#ffeb3b]" : "text-primary"}`,
						children: "1+"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: `mt-2 text-center text-[10px] font-bold uppercase tracking-widest z-10 ${transitionClass} ${isDarkSection ? "text-white/90" : "text-muted-foreground"}`,
						children: [
							"Years of",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Experience"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: `relative flex flex-col gap-1.5 rounded-xl p-2.5 overflow-hidden ${transitionClass} ${isDarkSection ? "bg-[#1a1a1a]" : "bg-card"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
					style: { transform: active === "projects" ? "translateY(0%)" : "translateY(100%)" }
				}), SECTIONS.map(({ id, label, Icon }) => {
					const isActive = active === id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `#${id}`,
						onClick: (e) => {
							if (id === "home") {
								e.preventDefault();
								if (window.lenis) window.lenis.scrollTo(document.documentElement, { duration: 3 });
								else window.scrollTo({
									top: 0,
									behavior: "smooth"
								});
							}
						},
						className: "relative flex items-center gap-3.5 rounded-full px-4 py-3 text-[18px] font-display font-bold uppercase tracking-wider leading-none transition-colors group z-10",
						children: [
							isActive && id !== "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "sidebar-active-pill",
								className: `absolute inset-0 rounded-full -z-10 ${isDarkSection ? "bg-[#ffeb3b]" : "bg-[#FAFF00]"}`,
								transition: {
									type: "spring",
									stiffness: 100,
									damping: 20
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								"data-icon-for": `nav-${id}`,
								className: `h-4 w-4 shrink-0 transition-colors duration-300 ${isActive && id !== "home" ? "text-black" : isDarkSection ? "text-white/70 hover:text-white" : "text-foreground group-hover:text-primary"}`,
								strokeWidth: 2.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-slot": `nav-${id}`,
								className: `block transition-colors duration-300 ${isActive && id !== "home" ? "text-black font-bold" : isDarkSection ? "text-white/70 hover:text-white" : "text-foreground group-hover:text-primary"}`,
								children: label
							})
						]
					}, id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-fade": true,
				className: "overflow-hidden py-1.5 flex group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 w-max marquee-track gap-8 pr-8",
					children: [...LOGOS, ...LOGOS].map((logo, i) => logo.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo.src,
						alt: logo.name,
						className: `h-5 object-contain transition-all duration-300 ${isDarkSection ? "brightness-0 invert opacity-50" : "brightness-0 invert-0 opacity-70"}`
					}, `1-${logo.id}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `whitespace-nowrap text-xs font-black uppercase tracking-widest ${transitionClass} ${isDarkSection ? "text-white/50" : "text-foreground"}`,
						children: logo.name
					}, `1-${logo.id}-${i}`))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "flex shrink-0 w-max marquee-track gap-8 pr-8",
					children: [...LOGOS, ...LOGOS].map((logo, i) => logo.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo.src,
						alt: logo.name,
						className: `h-5 object-contain transition-all duration-300 ${isDarkSection ? "brightness-0 invert opacity-50" : "brightness-0 invert-0 opacity-70"}`
					}, `2-${logo.id}-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `whitespace-nowrap text-xs font-black uppercase tracking-widest ${transitionClass} ${isDarkSection ? "text-white/50" : "text-foreground"}`,
						children: logo.name
					}, `2-${logo.id}-${i}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-fade": true,
				onClick: () => {
					navigator.clipboard?.writeText("hello@afish.com");
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				},
				className: `flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium ${transitionClass} ${isDarkSection ? "bg-[#222] text-white/50 hover:bg-[#333]" : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "hello@afish.com" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold",
					children: copied ? "✓" : "⧉"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contact",
				"data-slot": "cta",
				className: "rounded-xl bg-primary py-4 text-center font-display text-base font-black tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5",
				children: "Book a Call"
			})
		]
	});
}
function Hero({ morphActive = false }) {
	const { scrollY } = useScroll();
	const scrollOpacity = useTransform(scrollY, [100, 700], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-hero-container": true,
		id: "home",
		className: "relative h-[100svh] overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-fx": "orbs",
			className: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full opacity-30",
				style: {
					background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
					filter: "blur(80px)",
					animation: "orbFloat 12s ease-in-out infinite alternate"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -right-[20%] top-[40%] h-[50%] w-[50%] rounded-full opacity-20",
				style: {
					background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
					filter: "blur(100px)",
					animation: "orbFloat 15s ease-in-out infinite alternate-reverse"
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "relative mx-auto flex h-full min-h-[100svh] max-w-none flex-col px-[clamp(1rem,2.8vw,3.5rem)] pt-[clamp(1.25rem,5.7vh,3.75rem)]",
			style: { opacity: scrollOpacity },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none relative z-0 w-full min-w-0 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-morph": "wordmark",
						className: "flex w-full justify-between font-display leading-[0.82] font-black text-primary",
						style: {
							fontSize: "clamp(6.5rem, 28vw, 33rem)",
							perspective: "800px"
						},
						children: [
							"A",
							"F",
							"I",
							"S",
							"H"
						].map((letter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterReveal, {
							letter,
							delayMs: Object.values(CUE)[i],
							scrollY,
							morphActive,
							index: i
						}, letter))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortraitReveal, {
					morphActive,
					scrollY
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.nav, {
					className: "relative z-30 pointer-events-auto mt-[clamp(0.45rem,1.4vh,1.1rem)] flex flex-col items-center gap-2 whitespace-normal font-display text-[18px] tracking-wider leading-none font-bold uppercase lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:whitespace-nowrap lg:absolute lg:inset-x-[clamp(1.7rem,2.8vw,3.5rem)] lg:top-[50.8svh] lg:mt-0",
					initial: "hidden",
					animate: "visible",
					variants: getRiseVariants({
						y: 14,
						blur: 8,
						dur: 700,
						delay: CUE.nav
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavGroup, { items: LEFT_NAV }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavGroup, { items: RIGHT_NAV })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-20 flex flex-1 items-end pb-[clamp(1.25rem,2.8vh,2.2rem)] lg:static",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-end justify-between gap-5 lg:contents",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden flex-col lg:absolute lg:left-[clamp(17rem,18vw,22rem)] lg:top-[61.5svh] lg:flex",
								style: { width: "clamp(13rem, 16vw, 19rem)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
									morphKey: "stat-1",
									className: "grid w-[clamp(13rem,14.9vw,18rem)] grid-cols-[1fr_auto] items-center gap-4 px-7 py-6",
									initial: "hidden",
									animate: "visible",
									variants: getRiseVariants({
										x: -32,
										y: 0,
										blur: 12,
										delay: CUE.cards
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "origin-left scale-x-[1.12] font-display text-[clamp(3.2rem,4.1vw,5rem)] leading-[0.65] font-black italic text-primary",
										children: "W"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-display text-[clamp(0.85rem,1.15vw,1.35rem)] leading-[1.18] font-bold text-white",
										children: [
											"6+",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Projects"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									delayMs: CUE.cards + 140,
									morphKey: "stat-2",
									value: 1,
									suffix: "+",
									label: "Years of experience",
									className: "ml-[clamp(2.9rem,4.4vw,5.6rem)] mt-7 w-[clamp(10rem,9.7vw,12rem)] px-6 py-7 text-center",
									x: -32
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-fx": "headline",
								className: "pointer-events-none flex min-w-0 flex-1 flex-col items-center self-end lg:absolute lg:inset-x-0 lg:bottom-[5.1svh] lg:pb-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-auto w-fit max-w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadlineReveal, { delayMs: CUE.headline }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										className: "mt-6 flex flex-wrap justify-center gap-4",
										initial: "hidden",
										animate: "visible",
										variants: getRiseVariants({
											y: 22,
											blur: 12,
											dur: 800,
											scale: .92,
											delay: CUE.buttons
										}),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												"data-morph": "cta",
												href: "#contact",
												className: "group relative flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center overflow-hidden rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "relative z-10",
													children: "Book a Call"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute inset-0 scale-x-0 bg-white/15 transition-transform duration-500 group-hover:scale-x-100",
													style: { transformOrigin: "left" }
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												"data-fx": "fade-early",
												href: "#about",
												className: "flex h-[clamp(3.15rem,3.25vw,3.9rem)] min-w-[clamp(9.6rem,10vw,12.2rem)] items-center justify-center rounded-[0.5rem] bg-primary px-6 font-display text-[clamp(0.95rem,1.18vw,1.4rem)] font-black text-primary-foreground shadow-[0_14px_26px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]",
												children: "About Me"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-3",
												children: SOCIALS.map(({ id, Icon, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													"data-morph": `social-${id}`,
													href,
													"aria-label": `Social ${id}`,
													className: "group grid h-[clamp(3.15rem,3.25vw,3.9rem)] w-[clamp(3.15rem,3.25vw,3.9rem)] place-items-center rounded-[0.5rem] border border-white/10 bg-white/5 text-muted-foreground transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_10px_20px_-10px_rgba(255,215,0,0.2)]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[clamp(1.2rem,1.5vw,1.8rem)] w-[clamp(1.2rem,1.5vw,1.8rem)] transition-transform duration-500 group-hover:scale-110" })
												}, id))
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-fx": "traits",
								className: "hidden justify-end lg:absolute lg:right-[clamp(18rem,22vw,26.5rem)] lg:top-[58svh] lg:flex",
								style: { width: "clamp(13rem, 16vw, 19rem)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
									className: "w-[clamp(12rem,11.5vw,14rem)] px-7 py-7",
									initial: "hidden",
									animate: "visible",
									variants: getRiseVariants({
										x: 32,
										y: 0,
										blur: 12,
										delay: CUE.cards + 70
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-3.5",
										children: TRAITS.map(({ label, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-[2.2rem] w-[2.2rem] shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_12px_-3px_rgba(255,215,0,0.4)]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													className: "h-[1.1rem] w-[1.1rem] text-primary",
													strokeWidth: 2.5
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-[clamp(0.85rem,1.12vw,1.32rem)] leading-none font-bold text-white",
												children: label
											})]
										}, label))
									})
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "relative z-20 hidden items-end justify-between gap-6 pb-6 text-[clamp(0.86rem,1.15vw,1.35rem)] leading-[1.5] text-foreground sm:pb-8 md:flex lg:absolute lg:inset-x-[clamp(2rem,3.5vw,4rem)] lg:bottom-[2.8svh] lg:p-0",
					initial: "hidden",
					animate: "visible",
					variants: getRiseVariants({
						y: 14,
						blur: 8,
						dur: 700,
						delay: CUE.footer
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-fx": "fade-early",
						className: "max-w-[15rem]",
						children: [
							"The Webflow Expert.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"That's afish."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-fx": "fade-early",
						className: "hidden max-w-[21rem] text-right md:block",
						children: "Working closely with your team to deliver Webflow builds that merge creativity, technical excellence, and long-term value."
					})]
				})
			]
		})]
	}) });
}
var ITEMS = [
	{
		q: "Why a custom build instead of a template?",
		a: "Templates fight you the moment your content grows. A custom build maps to how your team actually works, and stays fast as it scales."
	},
	{
		q: "Do you handle design, or only development?",
		a: "Both. I can take a Figma file and build it precisely, or design and build the whole thing from a brief."
	},
	{
		q: "Already have a site that needs work?",
		a: "I audit what's there first, then fix performance, structure and CMS setup before touching the visuals."
	},
	{
		q: "What does ongoing support look like?",
		a: "Monthly retainers cover updates, new pages, performance checks and small experiments — no ticket queue."
	},
	{
		q: "What's the process from start to launch?",
		a: "Discovery, structure, design pass, build, QA, launch. You see progress at the end of every stage."
	},
	{
		q: "How do you handle revisions and feedback?",
		a: "Two structured revision rounds per stage, collected on a live staging link so nothing gets lost in email."
	},
	{
		q: "Do you work under NDA?",
		a: "Yes. I've worked on projects requiring strict confidentiality, from pre-launch products to internal tools."
	},
	{
		q: "Not sure which plan fits your project?",
		a: "Book a call. Fifteen minutes is usually enough to tell you the honest scope and range."
	}
];
function Faq() {
	const [open, setOpen] = (0, import_react.useState)(6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: ITEMS.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-fit rounded-xl bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(open === i ? null : i),
				className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
				"aria-expanded": open === i,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-bold",
					children: item.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-lg leading-none text-muted-foreground",
					children: open === i ? "−" : "+"
				})]
			}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pb-5 text-sm leading-relaxed text-muted-foreground",
				children: item.a
			})]
		}, item.q))
	});
}
gsapWithCSS.registerPlugin(ScrollTrigger);
function ProjectCard({ project }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: project.url ?? "#",
		target: "_blank",
		rel: "noopener noreferrer",
		className: "group relative flex w-[350px] lg:w-[420px] h-[clamp(350px,60vh,550px)] shrink-0 flex-col rounded-[2.5rem] border border-white/5 bg-[#161616] p-6 lg:p-8 transition-colors duration-300 hover:bg-[#1c1c1c] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/70",
					children: project.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5",
					children: project.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-white/70",
						children: tag
					}, tag))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8 mt-6 h-[55%] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-black",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: project.img,
					alt: `${project.name} project preview`,
					loading: "lazy",
					decoding: "async",
					className: "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-3xl font-bold tracking-tight text-white leading-tight",
					children: project.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pr-14 text-sm leading-relaxed text-white/60",
					children: project.desc
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-[#ffeb3b] text-black transition-transform duration-300 ease-out group-hover:scale-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 17l9.2-9.2M17 17V7H7" })
				})
			})
		]
	});
}
function ProjectsSection({ projects }) {
	const sectionRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const section = sectionRef.current;
		const track = trackRef.current;
		if (!section || !track) return;
		const ctx = gsapWithCSS.context(() => {
			const totalScroll = track.scrollWidth - window.innerWidth;
			gsapWithCSS.to(track, {
				x: () => -(track.scrollWidth - window.innerWidth),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${totalScroll}`,
					pin: true,
					scrub: 1,
					anticipatePin: 1,
					invalidateOnRefresh: true
				}
			});
		}, section);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "projects",
		className: "scroll-mt-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			ref: sectionRef,
			className: "relative overflow-hidden bg-[#0f0f0f] text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col pt-4 lg:pt-8 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-[110rem] px-4 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block rounded-full border border-white/20 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/60",
								children: "Selected Work"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 text-[3rem] leading-[1.1] lg:text-[5.5rem] font-black tracking-tighter text-white mb-4 lg:leading-[1.05]",
								children: [
									"Built in Webflow,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Made to Perform"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm pb-4 text-[0.95rem] leading-[1.7] text-white/55 z-10 relative",
								children: "Over the past year I've helped businesses across different industries turn their ideas into websites that look and work exactly how they imagined."
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 lg:mt-6 lg:mb-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-full max-w-[110rem] px-4 sm:px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: trackRef,
							className: "flex gap-8 lg:pl-[calc(clamp(14.5rem,15vw,17rem)+2rem)]",
							style: { willChange: "transform" },
							children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p }, p.name))
						})
					})
				})]
			})
		})
	});
}
var clamp01 = (v) => Math.min(1, Math.max(0, v));
var easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
var easeOut = (t) => 1 - Math.pow(1 - t, 3);
/** Staggered flight windows matching reference frames 2-5 */
var PAIR_WINDOWS = {
	wordmark: [.05, .6],
	"stat-1": [.08, .55],
	"stat-2": [.1, .58],
	"nav-home": [.08, .52],
	"nav-about": [.11, .55],
	"nav-projects": [.14, .58],
	"nav-offer": [.17, .62],
	"nav-services": [.2, .65],
	"nav-clients": [.23, .68],
	"nav-faq": [.26, .72],
	cta: [.15, .65]
};
var SCALED_KEYS = /* @__PURE__ */ new Set([
	"wordmark",
	"stat-1",
	"stat-2",
	"cta"
]);
var RIGHT_NAV_KEYS = /* @__PURE__ */ new Set([
	"nav-offer",
	"nav-services",
	"nav-clients",
	"nav-faq"
]);
function useHeroMorph(enabled, rootRef) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(enabled);
	}, [enabled]);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const root = rootRef.current;
		if (!root) return;
		let pairs = [];
		let fxEls = [];
		let fadeEls = [];
		let asideEl = null;
		let heroContainer = null;
		let raf = 0;
		let maxScroll = 1;
		let disposed = false;
		let transitionsKilled = false;
		const killTransitions = () => {
			if (transitionsKilled) return;
			transitionsKilled = true;
			for (const pair of pairs) {
				pair.el.style.transition = "none";
				pair.slot.style.transition = "none";
			}
			for (const { el } of fxEls) el.style.transition = "none";
			for (const el of fadeEls) el.style.transition = "none";
			if (asideEl) asideEl.style.transition = "none";
		};
		const measure = () => {
			maxScroll = 120 / 100 * window.innerHeight;
			asideEl = root.querySelector("[data-sidebar-container]");
			heroContainer = root.querySelector("[data-hero-container]");
			if (!asideEl) return;
			pairs = [];
			fxEls = [];
			fadeEls = [];
			root.querySelectorAll("[data-morph]").forEach((el) => {
				const key = el.dataset["morph"];
				const slot = root.querySelector(`[data-slot="${key}"]`);
				if (!slot) return;
				const from = el.getBoundingClientRect();
				const to = slot.getBoundingClientRect();
				const dx = to.left - from.left;
				const dy = to.top - from.top;
				const scale = SCALED_KEYS.has(key) ? to.width / Math.max(1, from.width) : 1;
				const [start, end] = PAIR_WINDOWS[key] ?? [.15, .6];
				pairs.push({
					el,
					slot,
					key,
					dx,
					dy,
					scale,
					start,
					end,
					isRightNav: RIGHT_NAV_KEYS.has(key)
				});
				el.style.transformOrigin = key === "cta" ? "center center" : "top left";
				el.style.willChange = "transform, opacity, filter";
				slot.style.opacity = "0";
				slot.style.willChange = "transform, opacity";
			});
			root.querySelectorAll("[data-fx]").forEach((el) => {
				fxEls.push({
					el,
					kind: el.dataset["fx"]
				});
				el.style.willChange = "transform, opacity, filter";
			});
			root.querySelectorAll("[data-fade]").forEach((el) => {
				fadeEls.push(el);
				el.style.opacity = "0";
				el.style.willChange = "transform, opacity";
			});
			if (asideEl) {
				asideEl.style.opacity = "0";
				asideEl.style.willChange = "opacity";
			}
		};
		const apply = () => {
			if (disposed) return;
			const scrollY = window.scrollY;
			const p = clamp01(scrollY / maxScroll);
			if (p > 0) killTransitions();
			if (asideEl) {
				if (p <= .15) {
					asideEl.style.opacity = "0";
					asideEl.style.pointerEvents = "none";
				} else {
					const asideAlpha = clamp01((p - .2) / .35);
					asideEl.style.opacity = String(asideAlpha);
					asideEl.style.pointerEvents = p > .6 ? "auto" : "none";
				}
			}
			if (heroContainer) {
				if (p >= 1) {
					heroContainer.style.opacity = "0";
					heroContainer.style.pointerEvents = "none";
				} else {
					const heroAlpha = 1 - clamp01((p - .7) / .3);
					heroContainer.style.opacity = String(heroAlpha);
					heroContainer.style.pointerEvents = p > .75 ? "none" : "auto";
				}
			}
			for (const pair of pairs) {
				const q = easeInOut(clamp01((p - pair.start) / (pair.end - pair.start)));
				if (q <= 0) {
					pair.el.style.transform = "";
					pair.el.style.opacity = "";
					pair.slot.style.opacity = "0";
					continue;
				}
				const arcY = pair.isRightNav ? Math.sin(q * Math.PI) * 20 : 0;
				const currX = pair.dx * q;
				const currY = pair.dy * q + arcY;
				const s = 1 + (pair.scale - 1) * q;
				pair.el.style.transform = `translate3d(${currX}px, ${currY}px, 0) scale(${s})`;
				const isWordmark = pair.key === "wordmark";
				const fadeThreshold = isWordmark ? .8 : .72;
				const heroAlpha = 1 - clamp01((q - fadeThreshold) / (1 - fadeThreshold));
				pair.el.style.opacity = String(heroAlpha);
				const slotThreshold = isWordmark ? .7 : .62;
				const slotProg = easeOut(clamp01((q - slotThreshold) / (1 - slotThreshold)));
				pair.slot.style.opacity = String(slotProg);
				pair.slot.style.transform = `scale(${.96 + slotProg * .04})`;
			}
			for (const { el, kind } of fxEls) switch (kind) {
				case "headline": {
					const q = clamp01(p / .45);
					const liftY = -q * 160;
					const blur = q * 14;
					const opacity = 1 - clamp01(q / .85);
					el.style.transform = `translate3d(0, ${liftY}px, 0)`;
					el.style.filter = `blur(${blur}px)`;
					el.style.opacity = String(opacity);
					break;
				}
				case "portrait": {
					const q = clamp01((p - .04) / .56);
					const blur = q * 35;
					const scale = 1 - q * .15;
					const opacity = 1 - clamp01((q - .25) / .75);
					el.style.transform = `translate3d(0, ${q * 30}px, 0) scale(${scale})`;
					el.style.filter = `blur(${blur}px)`;
					el.style.opacity = String(opacity);
					break;
				}
				case "traits": {
					const q = clamp01(p / .2);
					el.style.transform = `translate3d(0, ${-q * 20}px, 0)`;
					el.style.filter = `blur(${q * 10}px)`;
					el.style.opacity = String(1 - q);
					break;
				}
				case "footer": {
					const q = clamp01(p / .12);
					el.style.opacity = String(1 - q);
					break;
				}
				case "fade-early": {
					const q = clamp01(p / .18);
					el.style.opacity = String(1 - q);
					break;
				}
			}
			for (const el of fadeEls) {
				const q = easeInOut(clamp01((p - .45) / .35));
				el.style.opacity = String(q);
				el.style.transform = `translate3d(0, ${(1 - q) * 8}px, 0)`;
			}
		};
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(apply);
		};
		const onResize = () => {
			measure();
			apply();
		};
		measure();
		apply();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			for (const pair of pairs) {
				pair.el.style.cssText = "";
				pair.slot.style.cssText = "";
			}
			for (const { el } of fxEls) el.style.cssText = "";
			for (const el of fadeEls) el.style.cssText = "";
			if (asideEl) asideEl.style.cssText = "";
			if (heroContainer) heroContainer.style.cssText = "";
		};
	}, [enabled, rootRef]);
	return ready;
}
/** True only on desktop viewports without reduced-motion preference. */
function useMorphEnabled() {
	const [enabled, setEnabled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setEnabled(mq.matches && !rm.matches);
		update();
		mq.addEventListener("change", update);
		rm.addEventListener("change", update);
		return () => {
			mq.removeEventListener("change", update);
			rm.removeEventListener("change", update);
		};
	}, []);
	return enabled;
}
var PROJECTS = [
	{
		n: "01",
		img: "/assets/proj-1-0wJvw9BP.webp",
		name: "1910.ai",
		desc: "Pioneering small and large molecule therapeutics discovery through multimodal data.",
		tags: [
			"Components",
			"GSAP",
			"SEO"
		]
	},
	{
		n: "02",
		img: "/assets/proj-2-D7kb7syO.webp",
		name: "SemiconBio",
		desc: "Realizing the promise of molecular electronics with a chip partnership platform.",
		tags: [
			"CMS",
			"API",
			"Motion"
		]
	},
	{
		n: "03",
		img: "/assets/proj-3-DbMgGA-M.webp",
		name: "PSSLTD",
		desc: "Asset and inspection management built alongside UK councils for over 35 years.",
		tags: [
			"CMS",
			"GSAP",
			"Localization"
		]
	},
	{
		n: "04",
		img: "/assets/proj-4-CaaanEMZ.webp",
		name: "Lilipad",
		desc: "A quiet place to belong — libraries that come to children wherever they are.",
		tags: [
			"CMS",
			"GSAP",
			"SEO"
		]
	},
	{
		n: "05",
		img: "/assets/proj-5-Cl2bvCtx.webp",
		name: "Alosant",
		desc: "Resident experience platform keeping communities, shoppers and staff informed.",
		tags: [
			"Performance",
			"CMS",
			"API"
		]
	},
	{
		n: "06",
		img: "/assets/proj-6-DzKQEcZL.webp",
		name: "Omicron",
		desc: "A blockchain studio helping founders turn ideas into shipped, funded products.",
		tags: [
			"Motion",
			"Components",
			"CMS"
		]
	}
];
var SERVICES = [
	{
		title: "Design to build",
		body: "Pixel-faithful development from your Figma file, with the motion and states the static file can't show."
	},
	{
		title: "Design & development",
		body: "Full ownership from brief to launch — structure, art direction, build, QA and handover."
	},
	{
		title: "Rescue & performance",
		body: "Audit an existing site, then fix speed, structure, SEO and a CMS your team stopped trusting."
	},
	{
		title: "Ongoing partner",
		body: "A monthly retainer for new pages, experiments and steady improvements without re-scoping every time."
	}
];
var CLIENTS = [
	{
		name: "Klemen Vute",
		role: "PM from Povio",
		quote: "Everything landed ahead of schedule and the animations survived every browser we threw at them."
	},
	{
		name: "Johanna Dahlroos",
		role: "Co-Founder, Moat Agency",
		quote: "The clearest communication we've had with a developer. Our team can finally edit the site alone."
	},
	{
		name: "Marko Ilić",
		role: "Legacy Automation",
		quote: "Took a messy rebuild and turned it into something our sales team actually shows off."
	}
];
function Index() {
	const rootRef = (0, import_react.useRef)(null);
	const morphEnabled = useMorphEnabled();
	const morphReady = useHeroMorph(morphEnabled, rootRef);
	(0, import_react.useLayoutEffect)(() => {
		if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
		if ("scrollRestoration" in history) history.scrollRestoration = "manual";
		window.scrollTo(0, 0);
		if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
		document.body.style.overflow = "hidden";
		if (window.lenis) window.lenis.stop();
		const timer = setTimeout(() => {
			document.body.style.overflow = "";
			if (window.lenis) window.lenis.start();
		}, 2800);
		return () => {
			clearTimeout(timer);
			document.body.style.overflow = "";
			if (window.lenis) window.lenis.start();
		};
	}, []);
	const [card1Expanded, setCard1Expanded] = (0, import_react.useState)(false);
	const [card2Expanded, setCard2Expanded] = (0, import_react.useState)(false);
	const [card3Expanded, setCard3Expanded] = (0, import_react.useState)(false);
	const [card4Expanded, setCard4Expanded] = (0, import_react.useState)(false);
	const [card5Expanded, setCard5Expanded] = (0, import_react.useState)(false);
	const [card6Expanded, setCard6Expanded] = (0, import_react.useState)(false);
	const [card7Expanded, setCard7Expanded] = (0, import_react.useState)(false);
	const timelineRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 z-40 mx-auto hidden max-w-[110rem] px-4 sm:px-6 lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-[1.5rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSidebar, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: morphEnabled ? "sticky" : "relative",
					top: morphEnabled ? 0 : void 0,
					zIndex: morphEnabled ? 10 : 1
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { morphActive: morphReady })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "morph-track",
				style: { height: morphEnabled ? `120vh` : 0 },
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[110rem] gap-8 px-4 sm:px-6 pointer-events-none",
				style: {
					paddingTop: morphEnabled ? "1.5rem" : "3rem",
					paddingBottom: "7rem",
					marginTop: morphEnabled ? `-120vh` : 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-[clamp(14.5rem,15vw,17rem)] shrink-0 lg:block pointer-events-none",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 space-y-20 sm:space-y-28 md:space-y-40 pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "about",
						className: "scroll-mt-24 pt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
									delay: 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Start small grow big" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-6 display-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumLineReveal, {
										delay: 0,
										children: "About Me (&)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumLineReveal, {
										delay: 150,
										children: "My Journey"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
									delay: 450,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 max-w-md body-copy",
										children: "Seven years ago I opened my first editor. What happened after that is easier to show than explain."
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: timelineRef,
							className: "mt-10 sm:mt-16 relative w-full flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-[120px] sm:pb-[180px] lg:pb-[250px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineThread, { containerRef: timelineRef }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-end relative z-10 lg:mr-16 mt-10 lg:-mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -right-4 lg:-right-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card1Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card1Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card1Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'19" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "Starting out with my brother"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "My brother Stefan showed me Webflow. I bothered him with questions for three months straight. He probably regrets it."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "relative flex",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																			src: "https://i.pravatar.cc/150?u=stefan",
																			alt: "Stefan",
																			className: "h-12 w-12 rounded-full relative z-10 border-2 border-[#E6E5D8]"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-full bg-[#E5E6D8] -ml-4 z-0 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																				className: "h-10 w-10 rounded-full bg-[#EAEBDC] flex items-center justify-center",
																				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "text-[#FAFF00] font-black text-xl tracking-tighter",
																					children: "W"
																				})
																			})
																		})]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@stefan"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-xs font-medium text-black/50 leading-tight",
																			children: "7years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard1Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2019"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard1Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center mb-6",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative flex items-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-full bg-[#404040] z-0 flex items-center justify-center",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#FAFF00] font-black text-2xl tracking-tighter",
																	children: "W"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: "https://i.pravatar.cc/150?u=stefan",
																alt: "Stefan",
																className: "h-14 w-14 rounded-full border-2 border-[#2B2B2B] relative z-10 -ml-4"
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "Starting out with my brother"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "My brother Stefan, a UX designer, opened Webflow and created something right in front of me. I had no idea what I was doing but I couldn't close the laptop. No master plan, no career goal. Just a guy who found something and couldn't let go. Three months of late nights and annoying my brother with questions later, I knew this was it."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-start relative z-10 lg:ml-64",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card2Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card2Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card2Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'20" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "First freelance steps"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "First real client. First real panic. Working for yourself and working for someone else are completely different."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "relative flex",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "h-12 w-12 rounded-full bg-[#404040] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[#FAFF00] font-black text-xl tracking-tighter",
																				children: "W"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "absolute -bottom-0.5 -right-0.5 flex items-end gap-[1.5px] bg-[#404040] rounded-sm p-[2px]",
																				children: [
																					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[3px] h-1 bg-[#FAFF00] rounded-sm" }),
																					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[3px] h-1.5 bg-[#FAFF00] rounded-sm" }),
																					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[3px] h-2 bg-[#FAFF00] rounded-sm" })
																				]
																			})]
																		})
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@webflow"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-xs font-medium text-black/50 leading-tight",
																			children: "6years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard2Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2020"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard2Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "relative flex items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "h-14 w-14 rounded-full bg-[#404040] z-0 flex items-center justify-center",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#FAFF00] font-black text-2xl tracking-tighter",
																	children: "W"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "absolute -bottom-1 -right-1 flex items-end gap-[2px] bg-[#404040] rounded-sm p-1",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-1.5 bg-[#FAFF00] rounded-sm" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-2.5 bg-[#FAFF00] rounded-sm" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-3.5 bg-[#FAFF00] rounded-sm" })
																	]
																})]
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@webflow"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "6years ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "First freelance steps"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "First real client. First real panic. Working for yourself and working for someone else are completely different. I had to learn how to manage time, expectations, and actually deliver something end-to-end without a safety net."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-start relative z-10 lg:ml-64 lg:mt-16",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card3Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card3Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card3Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'21" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "Beyond what I knew"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "A biotech project that made me think this isn't possible in Webflow. Turns out it was."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "relative flex",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-lg bg-[#8A8A8A] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-white font-black text-sm tracking-wider",
																				children: "F/S"
																			})
																		})
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col justify-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@fiftyseven"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm text-black/50 mt-0.5",
																			children: "5years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard3Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2021"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard3Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "relative flex items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-lg bg-[#8A8A8A] z-0 flex items-center justify-center border-2 border-[#2B2B2B]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-white font-black text-lg tracking-wider",
																	children: "F/S"
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@fiftyseven"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "5years ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "Beyond what I knew"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "A biotech project that made me think this isn't possible in Webflow. Turns out it was. Pushing the platform to its absolute limits taught me more than any tutorial ever could."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-end relative z-10 lg:mr-16",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -right-4 lg:-right-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card4Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card4Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card4Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'22" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "Leveling up"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "The year animations and CMS stopped being extras and started shaping how every project feels."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "relative flex",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-lg bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-black font-black text-[0.7rem] tracking-wider",
																				children: "GSAP"
																			})
																		})
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col justify-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@gsap"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm text-black/50 mt-0.5",
																			children: "4years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard4Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2022"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard4Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "relative flex items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-lg bg-[#FAFF00] z-0 flex items-center justify-center border-2 border-[#2B2B2B]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-black font-black text-sm tracking-wider",
																	children: "GSAP"
																})
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@gsap"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "4years ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "Leveling up"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "The year animations and CMS stopped being extras and started shaping how every project feels. With GSAP, things that seemed impossible before became a regular Tuesday. Every project became an opportunity to push motion further."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-end relative z-10 lg:mr-20 mt-10 lg:-mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card5Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card5Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card5Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'23" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "From trust to referrals"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "relative flex",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-full bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																				size: 18,
																				className: "text-black stroke-[3]"
																			})
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-full bg-[#FAFF00] relative z-0 flex items-center justify-center border-2 border-[#E6E5D8] -ml-4",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																				size: 18,
																				className: "text-black stroke-[3]"
																			})
																		})]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col justify-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@clients"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm text-black/50 mt-0.5",
																			children: "3years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard5Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2023"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard5Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative flex items-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-full bg-[#FAFF00] relative z-10 flex items-center justify-center border-2 border-[#2B2B2B]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																	size: 24,
																	className: "text-black stroke-[3]"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-full bg-[#FAFF00] relative z-0 flex items-center justify-center border-2 border-[#2B2B2B] -ml-4",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																	size: 24,
																	className: "text-black stroke-[3]"
																})
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@clients"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "3years ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "From trust to referrals"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different. The entire year was sustained by word-of-mouth recommendations alone. That was the moment I realized the actual value of over-delivering."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-start relative z-10 lg:ml-64 mt-10 lg:-mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card6Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card6Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card6Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'24" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "A life-changing year"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "relative flex",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-full bg-[#D1D0C3] relative z-10 flex items-center justify-center border-2 border-[#E6E5D8]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
																				size: 20,
																				className: "text-[#FAFF00] fill-[#FAFF00]"
																			})
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "h-12 w-12 rounded-full overflow-hidden relative z-0 border-2 border-[#E6E5D8] -ml-4",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																				src: "https://i.pravatar.cc/150?img=32",
																				alt: "Djina",
																				className: "w-full h-full object-cover"
																			})
																		})]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col justify-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@family"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm text-black/50 mt-0.5",
																			children: "2years ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard6Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2024"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard6Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative flex items-center",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-full bg-[#D1D0C3] relative z-10 flex items-center justify-center border-2 border-[#2B2B2B]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
																	size: 24,
																	className: "text-[#FAFF00] fill-[#FAFF00]"
																})
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "h-14 w-14 rounded-full overflow-hidden relative z-0 border-2 border-[#2B2B2B] -ml-4",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: "https://i.pravatar.cc/150?img=32",
																	alt: "Djina",
																	className: "w-full h-full object-cover"
																})
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@family"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "2years ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "A life-changing year"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it. It's no longer just about pushing pixels or writing clean code, it's about building a future for them."
													})
												]
											}, "expanded")
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full lg:w-[38%] self-end relative z-10 lg:mr-24 mt-10 lg:mt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckpointScrollReveal, {
										className: "absolute -left-4 lg:-left-10 top-0 -bottom-4 w-[2px] rounded-full bg-gradient-to-b from-black/40 via-black/20 to-transparent hidden sm:block pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											"data-straight": "true",
											"data-dashed-after": "true",
											className: "timeline-anchor absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[11px] h-[11px] bg-[#FAFF00] rounded-full border-[2px] border-[#2B2B2B]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardScrollReveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
										layout: true,
										initial: false,
										animate: {
											backgroundColor: card7Expanded ? "#2B2B2B" : "#E6E5D8",
											borderColor: card7Expanded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.05)"
										},
										transition: {
											layout: {
												type: "spring",
												bounce: 0,
												duration: .65
											},
											backgroundColor: {
												duration: .5,
												ease: "easeInOut"
											}
										},
										className: "relative w-full rounded-2xl p-8 sm:p-10 shadow-sm overflow-hidden border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											mode: "popLayout",
											initial: false,
											children: !card7Expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .5,
													ease: [
														.32,
														.72,
														0,
														1
													]
												},
												className: "w-full flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
														delay: 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RollingYear, { text: "'26" })
														})
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 50,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-[1.5rem] leading-tight font-black tracking-[-0.02em] text-black",
																children: "The journey continues"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 100,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-3 max-w-[24rem] text-[0.95rem] leading-relaxed text-black/70 font-medium",
																children: "Seven years in. Still obsessed. Now figuring out how AI fits into what I do."
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineReveal, {
															delay: 150,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex min-w-0 items-center gap-4",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "relative",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																			src: "https://i.pravatar.cc/150?img=11",
																			alt: "Nenad",
																			className: "w-12 h-12 rounded-full object-cover border-2 border-[#E6E5D8]"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#40C057] rounded-full border-2 border-[#E6E5D8]" })]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex flex-col justify-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm font-semibold text-black leading-tight",
																			children: "@nenad"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-sm text-black/50 mt-0.5",
																			children: "2hours ago"
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => setCard7Expanded(true),
																	className: "shrink-0 self-start sm:self-auto rounded-xl bg-[#F0EFDF] px-6 py-2.5 text-[0.85rem] font-bold text-black transition-colors hover:bg-black/5",
																	children: "Read more"
																})]
															})
														})
													]
												})]
											}, "collapsed") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: {
													opacity: 0,
													filter: "blur(8px)",
													y: 15
												},
												animate: {
													opacity: 1,
													filter: "blur(0px)",
													y: 0
												},
												exit: {
													opacity: 0,
													filter: "blur(4px)",
													y: -10,
													transition: {
														duration: .3,
														ease: "easeIn"
													}
												},
												transition: {
													duration: .6,
													ease: [
														.32,
														.72,
														0,
														1
													],
													delay: .1
												},
												className: "w-full flex flex-col",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between items-start mb-8",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-none font-black tracking-[-0.04em] text-[#FAFF00]",
															children: "2026"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setCard7Expanded(false),
															className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-colors",
															"aria-label": "Close details",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center mb-6",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "relative",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: "https://i.pravatar.cc/150?img=11",
																alt: "Nenad",
																className: "w-14 h-14 rounded-full object-cover border-2 border-[#2B2B2B]"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-4 h-4 bg-[#40C057] rounded-full border-2 border-[#2B2B2B]" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "ml-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[1.05rem] font-bold text-white leading-none",
																children: "@nenad"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[0.95rem] text-white/50 mt-1",
																children: "2hours ago"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-[1.75rem] sm:text-[2rem] lg:text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight font-black tracking-[-0.02em] text-white mb-4",
														children: "The journey continues"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[1.05rem] leading-relaxed text-white/80 font-medium",
														children: "Seven years in. Still obsessed. Now figuring out how AI fits into what I do. The tools keep changing, but the goal remains the same: building digital experiences that feel human and leave a lasting impression."
													})
												]
											}, "expanded")
										})
									}) })]
								})
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsSection, { projects: PROJECTS }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[110rem] gap-8 px-4 sm:px-6 pointer-events-none",
				style: { paddingBottom: "7rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-[clamp(14.5rem,15vw,17rem)] shrink-0 lg:block pointer-events-none",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "min-w-0 flex-1 space-y-20 sm:space-y-28 md:space-y-40 pointer-events-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "offer",
							className: "scroll-mt-24 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Capabilities overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mx-auto mt-7 max-w-5xl display-lg",
								children: [
									"Strategy, precision, and development combined — turning your vision into a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "powerful digital experience"
									}),
									" that feels effortless."
								]
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "services",
							className: "scroll-mt-24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Services" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 max-w-2xl display-lg",
									children: "Ways we can work together"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-12 grid gap-4 md:grid-cols-2",
									children: SERVICES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										delay: i * 120,
										y: 30,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "rounded-3xl bg-card p-8 transition-all duration-500 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 hover:bg-card/80",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xl font-bold",
												children: s.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 body-copy",
												children: s.body
											})]
										})
									}, s.title))
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "clients",
							className: "scroll-mt-24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Clients" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 max-w-2xl display-lg",
									children: "People who trusted the process"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-12 grid gap-4 md:grid-cols-3",
									children: CLIENTS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										delay: i * 150,
										y: 30,
										as: "figure",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
											className: "rounded-3xl bg-card p-7 transition-all duration-500 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1 h-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
												className: "text-[0.95rem] leading-[1.6]",
												children: [
													"\"",
													c.quote,
													"\""
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
												className: "mt-5 flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-dark text-xs font-bold text-surface-dark-foreground",
													children: c.name.split(" ").map((w) => w[0]).join("")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-sm font-bold",
														children: c.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-xs text-muted-foreground",
														children: c.role
													})]
												})]
											})]
										})
									}, c.name))
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "faq",
							className: "scroll-mt-24",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "FAQ" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 max-w-lg display-lg",
									children: "Got any questions?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {})
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "contact",
							className: "scroll-mt-24 rounded-[1.5rem] sm:rounded-[2rem] bg-surface-dark px-5 sm:px-8 py-14 sm:py-20 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mx-auto max-w-3xl display-lg text-surface-dark-foreground",
									children: "Let's build something worth showing off."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-6 max-w-md text-[0.9375rem] leading-[1.62] text-surface-dark-foreground/60",
									children: "Currently taking on two new projects a month. Tell me what you're building and I'll tell you honestly whether I'm the right fit."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:hello@afish.com",
									className: "mt-8 inline-block rounded-lg bg-primary px-8 py-4 font-display text-sm font-black text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]",
									children: "Book a Call"
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" afish. All rights reserved."
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Designed and built end to end." })]
						})
					]
				})]
			})
		]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block rounded-full bg-card px-3.5 py-1.5 text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground uppercase",
		children
	});
}
//#endregion
export { Index as component };
