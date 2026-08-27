import { resumeData } from '../data/resume';
import '../styles/About.css';

const About = () => (
    <section id="about" className="section">
        <div className="shell">
            <div className="section-head">
                <span className="section-label">About</span>
            </div>

            <div className="about-grid">
                <h2 className="section-title">Backend first, with the fundamentals to back it up.</h2>

                <div className="about-body">
                    {/* Education is genuinely a sequence, so it gets a timeline. */}
                    <h3 className="about-sub">Education</h3>
                    <ul className="timeline">
                        {resumeData.education.map(edu => (
                            <li className="timeline-row" key={`${edu.school}-${edu.degree}`}>
                                <span className="timeline-when">{edu.duration}</span>
                                <span className="timeline-what">
                                    <strong>{edu.school}</strong>
                                    <span>{edu.degree}</span>
                                </span>
                                <span className="timeline-score">{edu.score}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="about-split">
                        <div>
                            <h3 className="about-sub">Achievements</h3>
                            <ul className="marked">
                                {resumeData.achievements.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="about-sub">Certificates</h3>
                            <ul className="marked">
                                {resumeData.certificates.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default About;
