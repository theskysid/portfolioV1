import { resumeData } from '../data/resume';
import { ArrowUpRight } from 'lucide-react';
import '../styles/Projects.css';

const slug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const Projects = () => (
    <section id="work" className="section">
        <div className="shell">
            <div className="section-head">
                <span className="section-label">Work</span>
            </div>

            <h2 className="section-title projects-title">Systems built end to end.</h2>

            <div className="projects">
                {resumeData.projects.map(project => (
                    <article className="pane project" key={project.title}>
                        <div className="pane-bar">
                            <span>~/projects/{slug(project.title)}</span>
                            <span>{project.tech.length} deps</span>
                        </div>

                        <div className="project-body">
                            <div className="project-head">
                                <h3 className="project-name">{project.title}</h3>
                                {project.link && (
                                    <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">
                                        Source <ArrowUpRight size={14} />
                                    </a>
                                )}
                            </div>

                            <ul className="project-notes">
                                {project.description.map(line => <li key={line}>{line}</li>)}
                            </ul>

                            <div className="project-stack">
                                {project.tech.map(t => <span className="chip" key={t}>{t}</span>)}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
