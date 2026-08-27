import { resumeData } from '../data/resume';
import '../styles/Skills.css';

// Spec-sheet rows, not a marquee — a recruiter scans this, they don't watch it.
const GROUPS = [
    { label: 'Languages', items: resumeData.skills.languages },
    { label: 'Backend', items: resumeData.skills.backend },
    { label: 'Frontend', items: resumeData.skills.frontend },
    { label: 'Databases', items: resumeData.skills.databases },
    { label: 'Cloud / DevOps', items: resumeData.skills.cloudDevOps },
    { label: 'Tools', items: resumeData.skills.tools },
];

const Skills = () => (
    <section id="stack" className="section">
        <div className="shell">
            <div className="section-head">
                <span className="section-label">Stack</span>
            </div>

            <div className="spec">
                {GROUPS.map(group => (
                    <div className="spec-row" key={group.label}>
                        <span className="spec-label">{group.label}</span>
                        <div className="spec-items">
                            {group.items.map(item => <span className="chip" key={item}>{item}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
