import { resumeData } from '../data/resume';
import '../styles/About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="education-column">
                        <h2 className="section-title">Education</h2>
                        <div className="timeline">
                            {resumeData.education.map((edu, index) => (
                                <div key={index} className="timeline-item">
                                    <h3 className="school-name">{edu.school}</h3>
                                    <p className="degree">{edu.degree}</p>
                                    <div className="ed-meta">
                                        <span>{edu.duration}</span>
                                        <span>{edu.location}</span>
                                    </div>
                                    <p className="score">{edu.score}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="achievements-column">
                        <h2 className="section-title">Achievements</h2>
                        <ul className="achievements-list">
                            {resumeData.achievements.map((item, index) => (
                                <li key={index}>{item.replace("**", "").replace("**", "")}</li>
                                /* Simple strip of markdown bold if present, though data is clean */
                            ))}
                        </ul>
                        <h2 className="section-title" style={{ marginTop: '40px' }}>Certificates</h2>
                        <ul className="achievements-list">
                            {resumeData.certificates.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
