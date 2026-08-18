import { motion } from "framer-motion";
import echoImg from "../assets/echo-messaging.png";
import { useTilt } from "../hooks/useTilt";

/* ── Editable Constants ── */
const PROJECTS = [
  {
    title: "Echo Messaging",
    description: "Real-time chat backend with Spring Boot WebSockets, JWT multi-provider auth, and full CI/CD to AWS EC2.",
    tags: ["Java", "Spring Boot", "WebSocket", "PostgreSQL", "Docker", "AWS"],
    github: "https://github.com/theskysid",
    liveUrl: "https://echomessaging.duckdns.org/",
    image: echoImg,
    mockupType: "chat",
  },
  {
    title: "Library Management System",
    description: "RESTful library platform with JWT auth, role-based access control, and real-time inventory tracking.",
    tags: ["Java", "Spring Boot", "Spring Security", "JPA", "MySQL"],
    github: "https://github.com/theskysid",
    mockupType: "code",
  },
  {
    title: "Coming Soon",
    description: "A new project is in the works — stay tuned for updates.",
    tags: ["???"],
    github: null,
    mockupType: "terminal",
  },
  {
    title: "Coming Soon",
    description: "Another exciting build on the horizon.",
    tags: ["???"],
    github: null,
    mockupType: "browser",
  },
];


function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* Simplified mockup cards */
function MockupCard({ type }) {
  const configs = {
    chat: { title: "Echo Messaging", lines: ["$ ws connect :8080", "→ Connected", "← { user: 'sid', msg: 'hello' }", "→ { status: 'delivered' }"] },
    code: { title: "LibraryController.java", lines: ["@RestController", "@RequestMapping(\"/api/books\")", "public class LibraryController {", "  @GetMapping", "  public List<Book> getAll() {", "    return service.findAll();", "  }", "}"] },
    terminal: { title: "Terminal", lines: ["$ docker compose up -d", "✓ postgres started", "✓ redis started", "✓ app started", "$ curl :8080/health", '{ "status": "UP" }'] },
    browser: { title: "Browser", lines: ["GET /api/v1/resource", "Status: 200 OK", "Content-Type: application/json", "---", "Coming Soon..."] },
  };
  const c = configs[type] || configs.browser;
  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#222]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] font-mono text-white/30">{c.title}</span>
      </div>
      <div className="p-4 space-y-1">
        {c.lines.map((line, i) => (
          <p key={i} className="text-[11px] font-mono text-white/50 leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  );
}

const CARD_HEIGHTS = ["min-h-[340px]", "min-h-[400px]", "min-h-[360px]", "min-h-[320px]"];

/* Depth ladder — how far each part of a card floats above its surface.
   The gaps are what produce the parallax when the card turns. */
const Z = {
  github: 70,
  sheen: 62,
  art: 45,
  panel: 18,
  tags: 10,
};

function ProjectCard({ project, index }) {
  const { ref, rotateX, rotateY, sheen, shadow, handlers } = useTilt();
  const open = project.liveUrl
    ? () => window.open(project.liveUrl, "_blank", "noopener,noreferrer")
    : undefined;

  return (
    <motion.div
      ref={ref}
      {...handlers}
      /* No `overflow-hidden` here — it would flatten the depth ladder.
         Each child clips itself instead. */
      className={`relative rounded-2xl bg-dark edge-light layer-3d ${CARD_HEIGHTS[index % 4]} flex flex-col ${project.liveUrl ? "cursor-pointer" : ""}`}
      style={{ rotateX, rotateY, boxShadow: shadow }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ z: 26 }}
      onClick={open}
    >
      {/* Specular highlight riding the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: sheen, z: Z.sheen }}
      />

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/50 hover:text-white transition-colors duration-300 backdrop-blur-md flex items-center justify-center"
          style={{ transform: `translateZ(${Z.github}px)` }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`${project.title} GitHub`}
        >
          <GitHubIcon />
        </a>
      )}

      <div
        className={`flex-1 flex items-stretch justify-center ${project.image ? "p-[5px]" : "p-4 md:p-6"}`}
        style={{ transform: `translateZ(${Z.art}px)` }}
      >
        <div className={`w-full h-full ${project.image ? "" : "max-w-[380px]"}`}>
          {project.image ? (
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/5 shadow-[var(--shadow-e2)]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
            </div>
          ) : (
            <MockupCard type={project.mockupType} />
          )}
        </div>
      </div>

      <div
        className="layer-3d rounded-b-2xl p-5 md:p-6 bg-gradient-to-t from-dark via-dark/95 to-transparent"
        style={{ transform: `translateZ(${Z.panel}px)` }}
      >
        <h3 className="text-lg md:text-xl font-bold text-white font-[var(--font-heading)] mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 mb-3 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5" style={{ transform: `translateZ(${Z.tags}px)` }}>
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/40">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-light text-dark py-6 md:py-12 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="scene grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
