import { resumeData } from '../data/resume';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { BentoGrid, BentoItem } from './BentoGrid';
import { motion } from 'framer-motion';
import '../styles/Projects.css';

const Projects = () => {
    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </motion.h2>

                <BentoGrid>
                    {resumeData.projects.map((project, index) => (
                        <BentoItem
                            key={index}
                            className={index === 0 || index === 3 ? "col-span-2" : ""}
                            title={project.title}
                            icon={<Code2 size={24} />}
                            header={
                                <div className="project-tech-header">
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <span key={i} className="tech-badge">{t}</span>
                                    ))}
                                    {project.tech.length > 3 && <span className="tech-badge">+{project.tech.length - 3}</span>}
                                </div>
                            }
                        >
                            <div className="project-details">
                                <ul className="project-bullets">
                                    {project.description.slice(0, 2).map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>

                                <div className="project-links">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-link">
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    )}
                                    {/* Assuming there might be a github link in data or just using link as primary */}
                                </div>
                            </div>
                        </BentoItem>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

export default Projects;
