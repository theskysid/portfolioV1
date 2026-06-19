import { motion } from "framer-motion";

/* ── Reusable animated fire-glow background ──
   Place inside a `position: relative; overflow: hidden` parent.
   Props:
     intensity  — overall opacity multiplier (0–1), default 0.7
     position   — "bottom" | "top" | "center", default "bottom"
*/

const BLOBS = [
  {
    color: "#FF7A1A",
    size: "45%",
    initialX: "20%",
    initialY: "75%",
    animateX: ["20%", "35%", "15%", "30%", "20%"],
    animateY: ["75%", "65%", "80%", "70%", "75%"],
    animateScale: [1, 1.2, 0.9, 1.15, 1],
    duration: 14,
  },
  {
    color: "#C9311A",
    size: "50%",
    initialX: "60%",
    initialY: "80%",
    animateX: ["60%", "50%", "70%", "55%", "60%"],
    animateY: ["80%", "70%", "85%", "75%", "80%"],
    animateScale: [1, 0.85, 1.1, 0.95, 1],
    duration: 18,
  },
  {
    color: "#FF7A1A",
    size: "35%",
    initialX: "80%",
    initialY: "70%",
    animateX: ["80%", "70%", "85%", "75%", "80%"],
    animateY: ["70%", "80%", "65%", "75%", "70%"],
    animateScale: [1, 1.15, 0.9, 1.05, 1],
    duration: 16,
  },
];

const positionMap = {
  bottom: "translate(-50%, 0%) translateY(-20%)",
  top: "translate(-50%, -80%)",
  center: "translate(-50%, -50%)",
};

export default function FireGlow({ intensity = 0.7, position = "bottom" }) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {BLOBS.map((blob, i) => {
        const yBase = position === "top" ? "20%" : position === "center" ? "50%" : blob.initialY;
        const animY =
          position === "top"
            ? blob.animateY.map((v) => `${parseInt(v) - 55}%`)
            : position === "center"
            ? blob.animateY.map((v) => `${parseInt(v) - 30}%`)
            : blob.animateY;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.initialX,
              top: yBase,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              filter: "blur(100px)",
              opacity: intensity,
              transform: positionMap[position],
            }}
            animate={
              reducedMotion
                ? {}
                : {
                    left: blob.animateX,
                    top: animY,
                    scale: blob.animateScale,
                  }
            }
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
