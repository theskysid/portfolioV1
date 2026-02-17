const Footer = () => {
    return (
        <footer style={{
            padding: '32px 24px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--bg-dark)',
            position: 'relative',
            zIndex: 10
        }}>
            <p>&copy; {new Date().getFullYear()} Siddhant Rastogi. Designed & Built on Earth.</p>
        </footer>
    );
};

export default Footer;
