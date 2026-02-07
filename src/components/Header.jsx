import { useState } from 'react';

const Header = ({ onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleClick = (e, href) => {
        e.preventDefault();
        onNavigate(href);
        if (window.innerWidth <= 640) setMobileMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="container header-inner">
                <a className="logo" href="#home" onClick={(e) => handleClick(e, '#home')}>
                    JU
                </a>

                <nav id="nav" className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
                    <a href="#about" onClick={(e) => handleClick(e, '#about')}>About</a>
                    <a href="#experience" onClick={(e) => handleClick(e, '#experience')}>Experience</a>
                    <a href="#projects" onClick={(e) => handleClick(e, '#projects')}>Projects</a>
                    <a href="#contact" onClick={(e) => handleClick(e, '#contact')}>Contact</a>
                </nav>

                <button
                    id="nav-toggle"
                    className="nav-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;
