import { useState, useEffect, useRef } from 'react';
import FaultyTerminal from './components/FaultyTerminal';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Hoisted: a fresh array literal would tear down and rebuild the WebGL context
// on every render, since it's in the component's effect deps.
const GRID_MUL = [2, 1];

// One lap of the hue wheel, starting on the site's amber accent. Each stop holds
// five minutes, then crossfades over thirty seconds — ~27 min per full cycle.
const TINT_CYCLE = ['#ffa94d', '#7bd88f', '#5ecbe6', '#8b8cf0', '#e07bc4'];
const TINT_HOLD = 300;
const TINT_FADE = 30;

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The backdrop is `position: fixed`, so a static gradient can only fade toward
// the bottom of the viewport — it can't fade "past the hero". Drive its opacity
// from scroll instead, and pause the shader once it's effectively invisible.
function useBackdrop() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(REDUCED_MOTION);
  const pausedRef = useRef(REDUCED_MOTION);

  useEffect(() => {
    if (REDUCED_MOTION) return;
    const onScroll = () => {
      const h = window.innerHeight || 1;
      const t = Math.min(window.scrollY / (h * 0.7), 1);
      // Never all the way to 0 — a trace of the field keeps the page cohesive,
      // but body copy has to win, so the floor is low.
      ref.current?.style.setProperty('--backdrop-opacity', String(1 - t * 0.94));

      const next = window.scrollY > h * 1.2;
      if (next !== pausedRef.current) {
        pausedRef.current = next;
        setPaused(next);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return [ref, paused];
}

function App() {
  const [backdropRef, backdropPaused] = useBackdrop();

  return (
    <div className="app">
      <div className="site-backdrop" ref={backdropRef}>
        <FaultyTerminal
          dpr={1}
          scale={1.6}
          gridMul={GRID_MUL}
          digitSize={1.2}
          timeScale={0.4}
          pause={backdropPaused}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={0.6}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.15}
          tint="#ffa94d"
          tintCycle={REDUCED_MOTION ? null : TINT_CYCLE}
          tintHold={TINT_HOLD}
          tintFade={TINT_FADE}
          mouseReact
          mouseStrength={0.35}
          pageLoadAnimation
          brightness={0.9}
        />
      </div>

      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
