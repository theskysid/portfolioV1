import { useState } from "react";
import IntroLoader from "./components/IntroLoader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import EducationCerts from "./components/EducationCerts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("portfolio-intro-seen");
  const [introComplete, setIntroComplete] = useState(!!alreadySeen);

  return (
    <>
      {/* Intro loader — mounts once, skips on revisit */}
      {!alreadySeen && <IntroLoader onComplete={() => setIntroComplete(true)} />}

      {/* Main site — always mounted behind the loader so it fades in seamlessly */}
      <div
        className={`transition-opacity duration-700 ${introComplete ? "opacity-100" : "opacity-0"}`}
      >
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <EducationCerts />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
