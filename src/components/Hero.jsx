import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import EmberField from "./EmberField";

/* ── Editable Constants ── */
const TAGLINE = "Backend Engineer & Full-Stack Developer";
const SUBTITLE = "Building Robust Backends & Scalable Applications.";
const RESUME_URL = "https://drive.google.com/file/d/1ahDzUN4isIRaYIpV6RzpSayDVl3Rn9IP/view";

/* A systems readout, not a scoreboard — every value here is verifiable
   elsewhere on the page. */
const STATS = [
  { label: "STATUS", value: "AVAILABLE", live: true },
  { label: "FOCUS", value: "BACKEND & CLOUD" },
  { label: "SOLVED", value: "300+ PROBLEMS" },
  { label: "CERTIFIED", value: "3 × AWS" },
  {
    label: "EDUCATION",
    value: "B.TECH CSE — AI & ML",
    note: "ABES Engineering College",
  },
];

/* Depth tuning. Layers that lag the scroll read as farther away; the name is
   the anchor plane and deliberately carries no parallax — it also hosts the
   shared-layout flight into the nav, which stays crisp without a transform. */
const SCROLL_RANGE = [0, 600];
const POINTER_SPRING = { stiffness: 120, damping: 22, mass: 0.7 };

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Scroll parallax ── */
  const { scrollY } = useScroll();
  const copyScrollY = useTransform(scrollY, SCROLL_RANGE, [0, 95]);
  const copyFade = useTransform(scrollY, [0, 420], [1, 0]);
  const statsY = useTransform(scrollY, SCROLL_RANGE, [0, 55]);
  const hintFade = useTransform(scrollY, [0, 180], [1, 0]);

  /* ── Pointer parallax ──
     Normalised -0.5…0.5 across the viewport, spring-smoothed. */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, POINTER_SPRING);
  const pointerY = useSpring(rawY, POINTER_SPRING);
  const copyX = useTransform(pointerX, [-0.5, 0.5], [-16, 16]);
  const copyY = useTransform(pointerY, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = (e) => {
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      className="scene relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark"
    >
      <EmberField intensity={0.7} />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pt-24 pb-28 w-full">
        {/* Giant Name — the anchor plane */}
        <div className="relative mb-6">
          <motion.h1
            className="relative text-huge text-white leading-[0.85] select-none flex flex-wrap gap-x-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              marginLeft: "-0.04em",
              marginRight: "-0.04em",
            }}
          >
            {!scrolled ? (
              <motion.span
                layoutId="logo"
                className="glitch-hover inline-block"
                data-text="SIDDHANT"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                SIDDHANT
              </motion.span>
            ) : (
              <span className="opacity-0 inline-block pointer-events-none">
                SIDDHANT
              </span>
            )}
            <motion.span
              className="glitch-hover inline-block"
              data-text="RASTOGI"
              animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
              transition={{ duration: 0.4 }}
            >
              RASTOGI
            </motion.span>
          </motion.h1>
        </div>

        {/* Tagline + CTA — the near plane, drifting with the cursor */}
        <motion.div style={{ x: copyX, y: copyY }}>
          <motion.div style={{ y: copyScrollY, opacity: copyFade }}>
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <p className="text-xl md:text-2xl font-medium text-white/90 mb-2 font-[var(--font-heading)]">
                {TAGLINE}
              </p>
              <p className="text-base md:text-lg text-white/60 font-[var(--font-body)]">
                {SUBTITLE}
              </p>
            </motion.div>

            {/* Resume Button */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-orange/10 hover:bg-accent-orange text-accent-orange hover:text-white border border-accent-orange/40 hover:border-accent-orange font-[var(--font-heading)] font-bold tracking-wide transition-all duration-300 shadow-[0_6px_24px_-8px_rgba(255,122,26,0.55)] hover:shadow-[0_10px_32px_-8px_rgba(255,122,26,0.75)]"
              >
                <span>VIEW RESUME</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Systems readout */}
        <motion.dl
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-6 border-t border-white/10 pt-6"
          style={{ y: statsY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-mono-label text-white/55 mb-2">{stat.label}</dt>
              <dd className="flex items-center gap-2 font-mono text-sm text-white/90">
                {stat.live && (
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-70 animate-ping motion-reduce:animate-none" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-orange" />
                  </span>
                )}
                {stat.value}
              </dd>
              {stat.note && (
                <p className="mt-1 font-mono text-xs text-white/55">{stat.note}</p>
              )}
            </div>
          ))}
        </motion.dl>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: hintFade }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="text-mono-label text-white/55">SCROLL</span>
            <motion.div
              className="w-[1px] h-8 bg-white/25"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
