import { useSyncExternalStore } from 'react';
import { resumeData } from '../data/resume';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import WarpText from './WarpText';
import '../styles/Hero.css';

// The name is rasterised into a WebGL texture, so it can't inherit `color` the
// way the rest of the page does — the token has to be resolved to a literal and
// handed over as a prop, and re-resolved whenever the theme attribute flips.
const subscribeToTheme = onChange => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
};
const readTextColor = () => getComputedStyle(document.documentElement).getPropertyValue('--text').trim();

const { personalInfo, summary, skills, projects, achievements } = resumeData;

// The signature: the hero reads as `systemctl status` for one running service.
// Every value below is real data from resume.js — nothing invented.
const MANIFEST = [
    { k: 'Loaded', v: 'loaded (/home/sid/.profile; enabled)' },
    { k: 'Active', v: <><strong>active (building)</strong> since 2023</> },
    { k: 'Node', v: 'ABES Engineering College · Ghaziabad, IN' },
    { k: 'Stack', v: [...skills.backend.slice(0, 2), ...skills.databases.slice(0, 1), 'React', 'AWS'].join(' · ') },
    { k: 'Tasks', v: `${projects.length} systems shipped · ${achievements.length} milestones` },
];

const Hero = () => {
    const textColor = useSyncExternalStore(subscribeToTheme, readTextColor);

    return (
    <section id="index" className="hero">
        <div className="shell">
            <p className="hero-eyebrow">
                <span className="dot" aria-hidden="true" />
                Ghaziabad, IN · UTC+5:30
            </p>

            <WarpText
                className="hero-name"
                text={'Siddhant\nRastogi'}
                color={textColor}
                align="left"
                fontSize="var(--t-hero)"
                fontWeight={800}
                letterSpacing="-0.05em"
                lineHeight={0.86}
                warpStrength={0.09}
                warpScale={1.9}
                speed={0.5}
                pointerInfluence={0.34}
                pointerStrength={0.42}
                refraction={0.022}
                ripple
            />

            <p className="hero-role">
                {personalInfo.title} — backend systems in Java and Spring Boot
            </p>

            <div className="hero-grid">
                <div className="hero-brief">
                    <p>{summary}</p>
                    <div className="hero-actions">
                        <button className="btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
                            View work <ArrowDown size={15} />
                        </button>
                        <div className="hero-links">
                            <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
                            <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                            <a href={`mailto:${personalInfo.email}`} aria-label="Email"><Mail size={17} /></a>
                        </div>
                    </div>
                </div>

                <div className="pane hero-manifest">
                    <div className="pane-bar">
                        <span>systemctl status sid.service</span>
                        <span className="hero-manifest-ok">● running</span>
                    </div>
                    <div className="readout hero-manifest-body">
                        {MANIFEST.map(row => (
                            <div className="readout-row" key={row.k}>
                                <span className="readout-key">{row.k}</span>
                                <span className="readout-val">{row.v}</span>
                            </div>
                        ))}
                        <div className="readout-row">
                            <span className="readout-key">Logs</span>
                            <span className="readout-val">
                                journalctl -u sid<span className="caret" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Hero;
