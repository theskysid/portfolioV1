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
// a minute, then crossfades over ten seconds — ~6 min per full cycle.
const TINT_CYCLE = ['#ffa94d', '#7bd88f', '#5ecbe6', '#8b8cf0', '#e07bc4'];
const TINT_HOLD = 60;
const TINT_FADE = 10;

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function App() {
  return (
    <div className="app">
      <div className="site-backdrop">
        <FaultyTerminal
          dpr={1}
          scale={1.6}
          gridMul={GRID_MUL}
          digitSize={1.2}
          timeScale={0.4}
          pause={REDUCED_MOTION}
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
