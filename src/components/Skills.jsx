import { resumeData } from '../data/resume';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const SkillTag = ({ skill }) => (
    <div className="skill-pill glass-panel">
        {skill}
    </div>
);

const MarqueeRow = ({ skills, direction = 'normal', speed = '40s' }) => {
    return (
        <div className="marquee-container" style={{ '--speed': speed, '--direction': direction }}>
            <div className="marquee-content">
                {skills.map((skill, i) => <SkillTag key={i} skill={skill} />)}
                {/* Duplicate for seamless loop */}
                {skills.map((skill, i) => <SkillTag key={`dup-${i}`} skill={skill} />)}
            </div>
            <div className="marquee-content" aria-hidden="true">
                {skills.map((skill, i) => <SkillTag key={`dup2-${i}`} skill={skill} />)}
                {skills.map((skill, i) => <SkillTag key={`dup3-${i}`} skill={skill} />)}
            </div>
        </div>
    );
};

const Skills = () => {
    const row1 = [...resumeData.skills.languages, ...resumeData.skills.frontend];
    const row2 = [...resumeData.skills.backend, ...resumeData.skills.databases];
    const row3 = [...resumeData.skills.tools, ...resumeData.skills.cloudDevOps];

    return (
        <section id="skills" className="section skills-section">
            <div className="container full-width-overflow">
                <motion.h2
                    className="section-title text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Arsenal
                </motion.h2>

                <div className="skills-wrapper">
                    <MarqueeRow skills={row1} speed="40s" direction="normal" />
                    <MarqueeRow skills={row2} speed="50s" direction="reverse" />
                    <MarqueeRow skills={row3} speed="45s" direction="normal" />
                </div>
            </div>
        </section>
    );
};

export default Skills;
