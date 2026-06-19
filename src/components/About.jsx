import { motion } from "framer-motion";

/* ── Editable Constants ── */
const LABEL = "INTRO";

const PARAGRAPH_1 =
  "I'm a Computer Science student who builds robust backends and scalable full-stack systems. I focus on clean architecture, efficient APIs, and shipping production-ready applications — from real-time messaging platforms to cloud-deployed services.";

const PARAGRAPH_2 =
  "My goal is to make backend systems as reliable and well-engineered as the products they power.";

const AUTHOR_NAME = "SIDDHANT RASTOGI";

const TRANSITION_HEADLINE = "SELECTED PROJECTS";

const TAG_LABELS = [
  "BACKEND",
  "FULL-STACK",
  "CLOUD & DEVOPS",
  "DATABASES",
];

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-light text-dark py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16 mb-20 md:mb-28">
          {/* Left: label */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="text-mono-label text-dark/40">{LABEL}</span>
          </motion.div>

          {/* Right: editorial text */}
          <div>
            <motion.p
              className="text-2xl md:text-3xl lg:text-[2.5rem] leading-snug font-medium text-dark/90 mb-8 font-[var(--font-heading)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0.5}
            >
              {PARAGRAPH_1}
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl leading-relaxed text-dark/60 mb-12 font-[var(--font-heading)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              {PARAGRAPH_2}
            </motion.p>

            {/* Byline / signature */}
            <motion.div
              className="flex items-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1.5}
            >
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-dark/10 flex items-center justify-center text-dark/40 text-lg font-bold font-[var(--font-heading)]">
                SR
              </div>
              <span className="text-mono-label text-dark/50">{AUTHOR_NAME}</span>
            </motion.div>
          </div>
        </div>

        {/* Transition headline */}
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
        >
          <div className="dot-motif-dark mb-4" />
          <h2
            className="text-section-title text-dark font-bold select-none"
            style={{ marginLeft: "-0.03em" }}
          >
            {TRANSITION_HEADLINE}
          </h2>
        </motion.div>

        {/* Tags row */}
        <motion.div
          className="flex flex-wrap gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.5}
        >
          {TAG_LABELS.map((tag) => (
            <span
              key={tag}
              className="text-mono-label text-dark/40 border border-dark/15 rounded-full px-4 py-1.5"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
