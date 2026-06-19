import { motion } from "framer-motion";

/* ── Editable Constants ── */
const EDUCATION = [
  {
    institution: "ABES Engineering College",
    degree: "B.Tech CSE (AI & ML)",
    period: "2023 – 2027 (Expected)",
    score: "78.64%",
  },
  {
    institution: "Divya Public School",
    degree: "Intermediate (XII)",
    period: "2022",
    score: "81.83%",
  },
  {
    institution: "Divya Public School",
    degree: "High School (X)",
    period: "2020",
    score: "91.83%",
  },
];

const CERTIFICATES = [
  "AWS Academy Graduate – Cloud Architecting",
  "AWS Academy Graduate – Intro to Cloud Sem 1",
  "AWS Services Fundamentals for Beginners",
];

const ACHIEVEMENTS = [
  "300+ LeetCode Problems (100-Day Badge)",
  "Smart India Hackathon — College Representative",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function EducationCerts() {
  return (
    <section className="relative bg-dark py-24 md:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Education */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <h3 className="text-mono-label text-white/40 mb-8">EDUCATION</h3>
            <div className="space-y-8">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  className="border-l-2 border-white/10 pl-6 hover:border-accent-orange/50 transition-colors duration-300"
                  variants={fadeUp}
                  custom={i * 0.2}
                >
                  <h4 className="text-lg font-bold text-white font-[var(--font-heading)]">{edu.institution}</h4>
                  <p className="text-sm text-white/60 mt-1">{edu.degree}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-mono-label text-white/30">{edu.period}</span>
                    <span className="text-sm font-mono text-accent-orange/80">{edu.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificates & Achievements */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-12">
              <h3 className="text-mono-label text-white/40 mb-8">CERTIFICATES</h3>
              <div className="space-y-3">
                {CERTIFICATES.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent-orange/20 transition-colors duration-300"
                    variants={fadeUp}
                    custom={i * 0.15}
                  >
                    <span className="text-accent-orange mt-0.5 text-lg">⬡</span>
                    <span className="text-sm text-white/70">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
              <h3 className="text-mono-label text-white/40 mb-8">ACHIEVEMENTS</h3>
              <div className="space-y-3">
                {ACHIEVEMENTS.map((ach, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent-orange/20 transition-colors duration-300"
                    variants={fadeUp}
                    custom={i * 0.15}
                  >
                    <span className="text-accent-orange mt-0.5 text-lg">◆</span>
                    <span className="text-sm text-white/70">{ach}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
