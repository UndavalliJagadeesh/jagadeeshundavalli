import { socialLinks } from '../data/portfolioData';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-content">
                    <p>© <span id="year">{new Date().getFullYear()}</span> Jagadeesh Undavalli — Crafted with <span className="heart-icon"></span> using AI</p>
                    <div className="social-links">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.url} aria-label={link.label}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
