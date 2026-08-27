import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import '../styles/Header.css';

const NAV = [
    { id: 'about', label: 'about' },
    { id: 'work', label: 'work' },
    { id: 'stack', label: 'stack' },
    { id: 'contact', label: 'contact' },
];

// Siddhant is in UP, India — show his local time, not the visitor's.
const clockFmt = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: 'Asia/Kolkata',
});

const Header = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [active, setActive] = useState('index');
    const [time, setTime] = useState(() => clockFmt.format(new Date()));
    const [menuOpen, setMenuOpen] = useState(false);
    const progressRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const id = setInterval(() => setTime(clockFmt.format(new Date())), 1000);
        return () => clearInterval(id);
    }, []);

    // Scroll progress, written straight to a CSS var so it never re-renders React.
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            progressRef.current?.style.setProperty('--progress', pct);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // Which section is on screen — drives both the nav highlight and the
    // path readout in the bar.
    useEffect(() => {
        const sections = ['index', ...NAV.map(n => n.id)]
            .map(id => document.getElementById(id))
            .filter(Boolean);

        const io = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );
        sections.forEach(s => io.observe(s));
        return () => io.disconnect();
    }, []);

    const go = id => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="bar">
            <div className="bar-inner">
                <button className="bar-id" onClick={() => go('index')}>
                    <span className="dot" aria-hidden="true" />
                    <span className="bar-id-name">sid</span>
                    <span className="bar-id-path">/{active}</span>
                </button>

                <nav className="bar-nav" aria-label="Sections">
                    {NAV.map(item => (
                        <button
                            key={item.id}
                            className={`bar-link ${active === item.id ? 'is-active' : ''}`}
                            aria-current={active === item.id ? 'true' : undefined}
                            onClick={() => go(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                    <a className="bar-link" href="https://bit.ly/sidrastogi" target="_blank" rel="noopener noreferrer">
                        résumé<span className="bar-ext" aria-hidden="true">↗</span>
                    </a>
                </nav>

                <div className="bar-right">
                    <time className="bar-clock" aria-hidden="true">{time} IST</time>
                    <button
                        className="bar-icon"
                        onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                    </button>
                    <button
                        className="bar-icon bar-burger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            <div className="bar-progress" ref={progressRef} aria-hidden="true" />

            {menuOpen && (
                <nav className="bar-sheet" aria-label="Sections">
                    {NAV.map(item => (
                        <button key={item.id} onClick={() => go(item.id)}>{item.label}</button>
                    ))}
                    <a href="https://bit.ly/sidrastogi" target="_blank" rel="noopener noreferrer">résumé ↗</a>
                </nav>
            )}
        </header>
    );
};

export default Header;
