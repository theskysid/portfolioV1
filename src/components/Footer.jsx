import '../styles/Footer.css';

const Footer = () => (
    <footer className="foot">
        <div className="foot-inner">
            <span>© {new Date().getFullYear()} Siddhant Rastogi</span>
            <span className="foot-mid">React · Vite · WebGL</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to top ↑
            </button>
        </div>
    </footer>
);

export default Footer;
