import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FireGlow from "./FireGlow";

/* ── Editable Constants ── */
const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "こんにちは",
  "नमस्ते",
  "你好",
  "Ciao",
  "Hallo",
  "Olá",
  "Namaste",
];

const INTERVAL_MS = 400;
const FADE_OUT_MS = 600;

export default function IntroLoader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Skip on repeat visits within the same session
    if (sessionStorage.getItem("portfolio-intro-seen")) {
      onComplete?.();
      setShowLoader(false);
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= GREETINGS.length - 1) {
          clearInterval(timer);
          // Begin fade-out after the last word
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              sessionStorage.setItem("portfolio-intro-seen", "true");
              setShowLoader(false);
              onComplete?.();
            }, FADE_OUT_MS);
          }, INTERVAL_MS);
          return prev;
        }
        return prev + 1;
      });
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!showLoader) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark"
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: FADE_OUT_MS / 1000, ease: "easeInOut" }}
    >
      {/* Fire glow running faintly behind */}
      <FireGlow intensity={0.3} position="bottom" />

      {/* Dot motif */}
      <div className="dot-motif mb-8 opacity-80" />

      {/* Greeting word */}
      <div className="relative h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className="text-4xl md:text-6xl font-bold text-white font-[var(--font-heading)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {GREETINGS[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
