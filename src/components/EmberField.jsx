import { useEffect, useRef, useState } from "react";
import FireGlow from "./FireGlow";

/* ── Ember field ──
   A single full-screen fragment shader: rising sparks, turbulent heat, and an
   aura that swells toward the cursor. Falls back to the CSS <FireGlow /> when
   WebGL is unavailable or the visitor asked for reduced motion.

   Costs nothing off-screen — the render loop stops when the hero scrolls away
   or the tab is hidden.
*/

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;   // 0..1, y up
uniform float uIntensity; // 0..1, decays when the cursor leaves

const vec3 BG    = vec3(0.0392, 0.0392, 0.0392); // #0A0A0A
const vec3 FLAME = vec3(1.000, 0.478, 0.102);    // #FF7A1A
const vec3 DEEP  = vec3(0.788, 0.192, 0.102);    // #C9311A
const vec3 CORE  = vec3(1.000, 0.878, 0.616);    // hot spark centre

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

/* One layer of sparks. Each grid cell may hold a single ember that rises,
   drifts sideways, and burns out — so a pixel only ever tests its 3x3
   neighbourhood instead of every particle on screen. */
float sparkLayer(vec2 uv, float t, float seed, float density, float speed, float thresh) {
  vec2 gv = uv * density;
  vec2 id = floor(gv);
  vec2 lv = fract(gv) - 0.5;
  float acc = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 off = vec2(float(x), float(y));
      float h = hash21(id + off + seed);
      if (h < thresh) continue;
      float h2 = fract(h * 57.13);       // decorrelated second value
      float h3 = fract(h * 113.77);      // and a third, for size variety

      float life = fract(t * speed * (0.6 + 0.9 * h) + h * 23.0);
      vec2 pos = vec2(h2 - 0.5, -0.6 + life * 1.25);
      pos.x += 0.18 * sin(life * 6.2831 + h * 30.0);   // lateral drift

      /* Squashing y stretches the ember into a rising streak rather than a
         dot. Gaussian core plus a wide bloom: sqrt(0.693/90) ~ 0.088 of a
         cell, which at these densities is roughly 10-16px on screen. */
      vec2 q = (lv - off - pos) * vec2(1.0, 0.55);
      float d2 = dot(q, q);
      float core = exp(-d2 * (90.0 + 140.0 * h3));
      float bloom = exp(-d2 * 14.0) * 0.30;

      // fade in off the floor, burn out near the top
      float fade = smoothstep(0.0, 0.08, life) * smoothstep(1.0, 0.35, life);
      float flicker = 0.75 + 0.25 * sin(t * 11.0 + h * 60.0);
      acc += (core + bloom) * fade * flicker;
    }
  }
  return acc;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float t = uTime;

  /* Heat sitting low on the floor. Kept tight and only lightly warped — a
     broad lumpy wash reads as a smudge, not as fire. */
  float warp = fbm(vec2(uv.x * 2.0, uv.y * 1.4 - t * 0.14));
  float floorGlow = pow(smoothstep(0.72, 0.0, uv.y + warp * 0.10 - 0.05), 2.0);
  // Break the flat gradient up so it reads as heat, not as a fill.
  floorGlow *= 0.72 + 0.55 * fbm(vec2(uv.x * 4.0, uv.y * 3.0 - t * 0.22));

  // Aura swelling toward the cursor.
  vec2 pd = (uv - uPointer) * vec2(aspect, 1.0);
  float swell = exp(-dot(pd, pd) * 5.5) * uIntensity;

  // Three ember layers at different depths.
  vec2 suv = vec2(uv.x * aspect, uv.y);
  float sparks =
      sparkLayer(suv, t, 0.0,  6.0, 0.16, 0.35) * 1.00
    + sparkLayer(suv, t, 3.7, 11.0, 0.24, 0.35) * 0.55
    + sparkLayer(suv, t, 9.1, 17.0, 0.32, 0.55) * 0.30;

  sparks *= smoothstep(1.05, 0.0, uv.y);   // thin out toward the top
  sparks *= 1.0 + swell * 1.2;             // cursor fans the fire

  vec3 color = BG;
  color += mix(DEEP, FLAME, floorGlow) * floorGlow * 0.22;
  color += FLAME * swell * 0.10;
  color += mix(FLAME, CORE, clamp(sparks, 0.0, 1.0)) * sparks * 0.95;

  // Vignette keeps the corners from muddying.
  vec2 vig = uv - 0.5;
  color *= 1.0 - dot(vig, vig) * 0.55;

  // Ordered dither — dark gradients band badly without it.
  color += (hash21(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`;

/* The field is all soft gradients and bloom, so there is no detail to lose by
   rendering below native density — and the per-pixel spark cost is real. */
const MAX_DPR = 1.25;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function EmberField({ intensity = 0.7 }) {
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (fallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = vs && fs && gl.createProgram();
    if (!program) {
      setFallback(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // One oversized triangle covers the viewport with no index buffer.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPointer = gl.getUniformLocation(program, "uPointer");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    // Pointer is smoothed toward its target so the aura eases rather than snaps.
    const target = { x: 0.5, y: 0.35, i: 0 };
    const current = { x: 0.5, y: 0.35, i: 0 };

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height; // GL y points up
      target.i = intensity;
    };
    const onPointerLeave = () => {
      target.i = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    // pointerleave on the root doesn't bubble, so this fires only when the
    // cursor actually leaves the page — not on every element boundary.
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let frame = 0;
    let running = true;
    const start = performance.now();

    const draw = (now) => {
      if (!running) return;
      resize();
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      current.i += (target.i - current.i) * 0.04;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, current.x, current.y);
      gl.uniform1f(uIntensity, current.i);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const setRunning = (next) => {
      if (next === running) return;
      running = next;
      if (next) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };

    // Stop burning cycles once the hero is scrolled past or the tab is hidden.
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0 }
    );
    observer.observe(canvas);
    const onVisibility = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [fallback, intensity]);

  if (fallback) return <FireGlow intensity={intensity} position="bottom" />;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
