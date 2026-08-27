import { resumeData } from '../data/resume';
import { ArrowUpRight } from 'lucide-react';
import '../styles/Contact.css';

const { personalInfo } = resumeData;

const LINKS = [
    { label: 'GitHub', href: personalInfo.links.github },
    { label: 'LinkedIn', href: personalInfo.links.linkedin },
    { label: 'LeetCode', href: personalInfo.links.leetcode },
    { label: 'Résumé', href: 'https://bit.ly/sidrastogi' },
];

const Contact = () => (
    <section id="contact" className="section contact">
        <div className="shell">
            <div className="section-head">
                <span className="section-label">Contact</span>
            </div>

            <p className="contact-status">
                <span className="dot" aria-hidden="true" />
                Open to backend and full-stack internships
            </p>

            <a className="contact-email" href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
                <ArrowUpRight className="contact-arrow" size={28} />
            </a>

            <div className="contact-links">
                {LINKS.map(link => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label} <span aria-hidden="true">↗</span>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

export default Contact;
