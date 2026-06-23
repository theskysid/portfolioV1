import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FireGlow from "./FireGlow";

/* ── Editable Constants ── */
const NAME = "SIDDHANT RASTOGI";
const TAGLINE = "Backend Engineer & Full-Stack Developer";
const SUBTITLE = "Building Robust Backends & Scalable Applications.";
const BADGE = "Computer Science Student (AI & ML) · ABES Engineering College";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark"
    >
      {/* Fire glow effect */}
      <FireGlow intensity={0.7} position="bottom" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 pt-24 pb-20 w-full">
        {/* Dot + Badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="dot-motif" />
          <span className="text-mono-label text-white/50">{BADGE}</span>
        </motion.div>

        {/* Giant Name */}
        <motion.h1
          className="text-huge text-white leading-[0.85] mb-6 select-none flex flex-wrap gap-x-4"
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

        {/* Tagline */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-2 font-[var(--font-heading)]">
            {TAGLINE}
          </p>
          <p className="text-base md:text-lg text-white/50 font-[var(--font-body)]">
            {SUBTITLE}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-mono-label text-white/30">SCROLL</span>
          <motion.div
            className="w-[1px] h-8 bg-white/20"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
