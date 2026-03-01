import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Work' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <motion.header
            className={`header ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container header-content glass-panel">
                <div className="logo" onClick={() => scrollToSection('hero')}>
                    SID
                </div>

                <nav className="desktop-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button onClick={() => scrollToSection(item.id)}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <a href="https://bit.ly/sidrastogi" target="_blank" rel="noopener noreferrer" className="nav-resume-link">
                                <FileText size={16} /> Resume
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        <AnimatePresence mode="wait" initial={false}>
                            {theme === 'dark' ? (
                                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun size={20} />
                                </motion.div>
                            ) : (
                                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu glass-panel"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul>
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button onClick={() => scrollToSection(item.id)}>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <a href="https://bit.ly/sidrastogi" target="_blank" rel="noopener noreferrer" className="nav-resume-link">
                                    <FileText size={16} /> Resume
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
