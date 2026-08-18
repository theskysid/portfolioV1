import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Editable Constants ── */
const NAV_ITEMS = [
  { label: "/ABOUT ME", href: "#about" },
  { label: "/ALL PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const LOGO_TEXT = "SIDDHANT";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Queried once, not on every scroll tick.
    const sections = Array.from(document.querySelectorAll("section"));
    const NAV_CENTER = 40;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // The section crossing the nav's centre line decides its colour.
      const under = sections.find((sec) => {
        const rect = sec.getBoundingClientRect();
        return rect.top <= NAV_CENTER && rect.bottom >= NAV_CENTER;
      });
      setIsLightMode(under?.classList.contains("bg-light") ?? false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
        !scrolled
          ? "bg-transparent text-white"
          : isLightMode
          ? "bg-light/90 backdrop-blur-xl text-dark"
          : "bg-dark/80 backdrop-blur-xl text-white"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => smoothScroll(e, "#hero")}
        className="font-bold text-lg tracking-[0.2em] font-[var(--font-heading)] hover:text-accent-orange transition-colors duration-300 relative flex items-center"
      >
        {scrolled ? (
          <motion.span layoutId="logo" className="inline-block" transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            {LOGO_TEXT}
          </motion.span>
        ) : (
          <span className="opacity-0 inline-block pointer-events-none">
            {LOGO_TEXT}
          </span>
        )}
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => smoothScroll(e, item.href)}
            className="text-mono-label opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation menu"
        id="nav-hamburger"
      >
        <motion.span
          className={`block w-6 h-[2px] ${isLightMode && scrolled ? "bg-dark" : "bg-white"}`}
          animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
        />
        <motion.span
          className={`block w-6 h-[2px] ${isLightMode && scrolled ? "bg-dark" : "bg-white"}`}
          animate={{ opacity: mobileOpen ? 0 : 1 }}
        />
        <motion.span
          className={`block w-6 h-[2px] ${isLightMode && scrolled ? "bg-dark" : "bg-white"}`}
          animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-white/5 flex flex-col items-center gap-6 py-8 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => smoothScroll(e, item.href)}
              className="text-mono-label text-white/60 hover:text-white transition-colors duration-300 text-base"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
