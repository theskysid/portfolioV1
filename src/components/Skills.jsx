import { useState } from "react";
import { motion } from "framer-motion";
import FireGlow from "./FireGlow";
import { useTilt } from "../hooks/useTilt";

/* ── Editable Constants ── */
const LABEL = "WHAT I CAN DO";

const SKILL_CATEGORIES = [
  {
    name: "Backend Development",
    details: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate"],
    mockupLines: ["@Service", "public class OrderService {", "  @Transactional", "  public Order process(OrderDTO dto) {", "    validate(dto);", "    return repo.save(map(dto));", "  }", "}"],
    mockupTitle: "OrderService.java",
  },
  {
    name: "REST & WebSocket APIs",
    details: ["RESTful Design", "WebSocket Real-time", "JWT Auth", "API Versioning"],
    mockupLines: ["GET /api/v1/users/123", "Authorization: Bearer eyJhbG...", "---", "200 OK", '{ "id": 123,', '  "name": "Siddhant",', '  "role": "ADMIN" }'],
    mockupTitle: "API Response",
  },
  {
    name: "Database Design",
    details: ["PostgreSQL", "MySQL", "Schema Design", "Query Optimization"],
    mockupLines: ["CREATE TABLE users (", "  id SERIAL PRIMARY KEY,", "  email VARCHAR(255) UNIQUE,", "  role user_role DEFAULT 'USER',", "  created_at TIMESTAMPTZ DEFAULT NOW()", ");", "CREATE INDEX idx_email ON users(email);"],
    mockupTitle: "schema.sql",
  },
  {
    name: "Cloud & DevOps",
    details: ["AWS (EC2, S3, IAM, Lambda)", "Docker", "GitHub Actions", "CI/CD"],
    mockupLines: ["$ aws ec2 describe-instances", "$ docker build -t app:latest .", "$ docker push ecr.aws/app:latest", "---", "✓ Build succeeded", "✓ Tests passed (47/47)", "✓ Deployed to production"],
    mockupTitle: "deploy.sh",
  },
  {
    name: "System Architecture",
    details: ["Microservices", "Clean Architecture", "Design Patterns", "Scalability"],
    mockupLines: ["┌─────────┐  ┌──────────┐", "│  Client │──│ API GW   │", "└────┬────┘  └────┬─────┘", "     │            │", "┌────┴────┐  ┌────┴─────┐", "│ Auth Svc│  │ Core Svc │", "└─────────┘  └──────────┘"],
    mockupTitle: "architecture.md",
  },
  {
    name: "Frontend (Basic)",
    details: ["React.js", "HTML/CSS", "Responsive Design", "Tailwind CSS"],
    mockupLines: ["const App = () => (", "  <Layout>", "    <Hero />", "    <Projects />", "    <Contact />", "  </Layout>", ");"],
    mockupTitle: "App.jsx",
  },
];

const ALL_SKILLS = {
  Languages: ["Java", "JavaScript", "HTML", "CSS", "SQL"],
  Frameworks: ["Spring Boot", "Spring Security", "JPA"],
  Backend: ["REST APIs", "WebSockets", "JWT Authentication"],
  Databases: ["PostgreSQL", "MySQL"],
  "Cloud & DevOps": ["AWS (EC2, S3, IAM, Lambda)", "Docker", "GitHub Actions"],
  Tools: ["Git", "GitHub", "Postman", "Linux"],
  "Frontend": ["React.js", "HTML", "CSS"],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* Resting pose — the card sits angled on the desk until you approach it. */
const REST_POSE = { restX: 6, restY: -14 };

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = SKILL_CATEGORIES[activeIndex];
  const { ref, rotateX, rotateY, sheen, shadow, handlers } = useTilt(REST_POSE);

  return (
    <section id="skills" className="relative bg-dark py-24 md:py-36 overflow-hidden">
      <FireGlow intensity={0.25} position="center" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="text-mono-label text-white/40">{LABEL}</span>
        </motion.div>

        {/* Interactive skill spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Left: skill list */}
          <motion.div className="space-y-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
            {SKILL_CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`block w-full text-left text-2xl md:text-3xl lg:text-4xl font-[var(--font-heading)] transition-all duration-400 py-2 ${
                  activeIndex === i ? "text-white font-bold" : "text-white/25 font-medium hover:text-white/50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Right: mockup card */}
          <motion.div className="scene flex items-center justify-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.6}>
            <motion.div
              ref={ref}
              {...handlers}
              className="relative w-full max-w-md layer-3d"
              style={{ rotateX, rotateY, boxShadow: shadow, borderRadius: "1rem" }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Back slab, sitting behind and slightly proud of the face —
                  when the card turns, this edge reads as its thickness. */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[1.25rem] bg-[#0a0a0a] border border-white/5"
                style={{ transform: "translateZ(-18px)" }}
              />

              {/* Specular highlight */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
                style={{ background: sheen, z: 2 }}
              />

              {/* Face — swaps with a turn rather than a fade */}
              <motion.div
                key={activeIndex}
                className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] edge-light"
                initial={{ opacity: 0, rotateY: -35 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#222]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-auto text-[10px] font-mono text-white/30">
                    {active.mockupTitle}
                  </span>
                </div>
                <div className="p-5 space-y-1.5">
                  {active.mockupLines.map((line, j) => (
                    <p key={j} className="text-xs font-mono text-white/50 leading-relaxed">{line}</p>
                  ))}
                </div>
                {/* Details pills */}
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                  {active.details.map((d) => (
                    <span key={d} className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-accent-orange/30 text-accent-orange/70">{d}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Full skills grid */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
          <h3 className="text-mono-label text-white/40 mb-8">ALL SKILLS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Object.entries(ALL_SKILLS).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-sm font-bold text-white/70 mb-3 font-[var(--font-heading)]">{category}</h4>
                <div className="space-y-1.5">
                  {skills.map((skill) => (
                    <p key={skill} className="text-sm text-white/40 font-mono">{skill}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
