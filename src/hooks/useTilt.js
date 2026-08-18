import { useEffect, useRef, useState } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ── Cursor-tracked 3D tilt ──
   Returns motion values to spread onto a `.layer-3d` element sitting inside a
   `.scene` parent. Children given their own translateZ will parallax against
   each other as the surface turns.

   Options:
     max   — peak rotation in degrees, default 14
     restX — resting rotateX when the cursor is away (isometric pose)
     restY — resting rotateY when the cursor is away
*/

const SPRING = { stiffness: 280, damping: 20, mass: 0.6 };

/* Tilt is a pointer affordance — no cursor, no tilt. Devices that can't hover
   keep the resting pose, which is why restX/restY are worth setting. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export function useTilt({ max = 14, restX = 0, restY = 0 } = {}) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`${FINE_POINTER} and ${MOTION_OK}`);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pointer position within the element, normalised to -0.5…0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // 0 at rest, 1 while hovered — blends between the rest pose and live tilt.
  const hover = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const sHover = useSpring(hover, SPRING);

  // Blend from the resting pose into live tilt as the cursor arrives.
  const rotateY = useTransform(
    [sx, sHover],
    ([v, h]) => restY * (1 - h) + v * 2 * max * h
  );
  const rotateX = useTransform(
    [sy, sHover],
    ([v, h]) => restX * (1 - h) - v * 2 * max * h
  );

  // Specular highlight that tracks the cursor across the surface.
  const sheenX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const sheenAlpha = useTransform(sHover, [0, 1], [0, 0.16]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,${sheenAlpha}), transparent 55%)`;

  // Cast shadow swings opposite the tilt, as if the light stayed put.
  const shadowX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const shadowY = useTransform(sy, [-0.5, 0.5], [26, -26]);
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.5)`;

  const handlers = enabled
    ? {
        onPointerMove: (e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        },
        onPointerEnter: () => hover.set(1),
        onPointerLeave: () => {
          px.set(0);
          py.set(0);
          hover.set(0);
        },
      }
    : {};

  return { ref, enabled, rotateX, rotateY, sheen, shadow, handlers };
}
