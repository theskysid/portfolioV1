import { resumeData } from '../data/resume';
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <motion.div
                    className="contact-content glass-panel"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="contact-title">Let's create something extraordinary.</h2>
                    <p className="contact-subtitle">
                        Whether you have a project in mind or just want to say hi, I'm always open to discussing new ideas.
                    </p>

                    <a href={`mailto:${resumeData.personalInfo.email}`} className="email-link">
                        {resumeData.personalInfo.email}
                        <ArrowUpRight className="arrow-icon" size={32} />
                    </a>

                    <div className="social-grid">
                        <a href={resumeData.personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="social-card">
                            <Linkedin size={24} />
                            <span>LinkedIn</span>
                        </a>
                        <a href={resumeData.personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="social-card">
                            <Github size={24} />
                            <span>GitHub</span>
                        </a>
                        <a href={resumeData.personalInfo.links.leetcode} target="_blank" rel="noopener noreferrer" className="social-card">
                            <FileText size={24} />
                            <span>LeetCode</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
