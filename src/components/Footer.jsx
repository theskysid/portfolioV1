import { motion } from "framer-motion";
import FireGlow from "./FireGlow";

/* ── Editable Constants ── */
const NAV_LINKS = [
  { label: "[ /ABOUT ME ]", href: "#about" },
  { label: "[ /ALL PROJECTS ]", href: "#projects" },
  { label: "[ LET'S CONNECT ]", href: "#contact" },
];

const COPYRIGHT = `©${new Date().getFullYear()} SIDDHANT RASTOGI`;

export default function Footer() {
  const smoothScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark py-16 md:py-24 overflow-hidden border-t border-white/5">
      <FireGlow intensity={0.5} position="bottom" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Dot */}
        <div className="flex justify-center mb-12">
          <span className="dot-motif opacity-60" />
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
          {/* Left: copyright */}
          <motion.p
            className="text-mono-label text-white/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {COPYRIGHT}
          </motion.p>

          {/* Center: nav links */}
          <div className="flex flex-col items-center gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className="text-mono-label text-white/30 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: back to top */}
          <div className="flex justify-center md:justify-end">
            <a
              href="#hero"
              onClick={scrollToTop}
              className="text-mono-label text-white/30 hover:text-white transition-colors duration-300"
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
