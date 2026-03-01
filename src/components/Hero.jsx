import { resumeData } from '../data/resume';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="container hero-content">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span>👋 Welcome to my universe</span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    I'm <span className="highlight">{resumeData.personalInfo.name}</span>
                    <br />
                    <span className="subtitle-text">{resumeData.personalInfo.title}</span>
                </motion.h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {resumeData.summary}
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <button className="btn btn-primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                        View Projects <ArrowRight size={18} />
                    </button>
                    <div className="social-links">
                        <a href={resumeData.personalInfo.links?.github || '#'} target="_blank" rel="noopener noreferrer" className="social-btn">
                            <Github size={24} />
                        </a>
                        <a href={resumeData.personalInfo.links?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="social-btn">
                            <Linkedin size={24} />
                        </a>
                        <a href={`mailto:${resumeData.personalInfo.email}`} className="social-btn">
                            <Mail size={24} />
                        </a>
                        <a href="https://bit.ly/sidrastogi" target="_blank" rel="noopener noreferrer" className="social-btn" title="Resume">
                            <FileText size={24} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
