import { motion } from "framer-motion";

/* ── Editable Constants ── */
const HEADLINE = "I'm always open to backend roles, collaborations, and interesting engineering problems. If you have an opportunity in mind or just want to talk systems, I'd love to hear from you.";

const EMAIL = "23x10sid@gmail.com";
const PHONE = "+91 8273141618";

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/theskysid", icon: "GH" },
  { label: "LinkedIn", url: "https://linkedin.com/in/rxsiddhant", icon: "IN" },
  { label: "Codolio", url: "https://codolio.com/profile/theskysid", icon: "CO" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="relative bg-dark py-32 md:py-44 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* End label */}
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-mono-label text-white/30 border border-white/10 px-3 py-1 rounded">[ END ]</span>
        </motion.div>

        {/* Dot */}
        <motion.div
          className="flex justify-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
        >
          <span className="dot-motif" />
        </motion.div>

        {/* Headline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/80 font-[var(--font-heading)] mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.4}
        >
          {HEADLINE}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.6}
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block px-10 py-4 rounded-full border-2 border-white text-white font-bold font-[var(--font-heading)] text-lg tracking-wider hover:bg-white hover:text-dark transition-all duration-400"
            id="contact-cta"
          >
            LET'S TALK
          </a>
        </motion.div>

        {/* Phone */}
        <motion.p
          className="text-mono-label text-white/30 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.7}
        >
          {PHONE}
        </motion.p>

        {/* Socials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.8}
        >
          <p className="text-mono-label text-white/30 mb-6">MORE ABOUT ME?</p>
          <div className="flex justify-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-300 text-xs font-mono font-bold"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
