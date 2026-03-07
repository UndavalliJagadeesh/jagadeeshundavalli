import { useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import ThemeToggle from './ThemeToggle';

const Header = ({ onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data, loading } = usePortfolioData();

    const handleClick = (e, href) => {
        e.preventDefault();
        onNavigate(href);
        if (window.innerWidth <= 640) setMobileMenuOpen(false);
    };

    if (loading || !data) {
        return (
            <header className="site-header">
                <div className="container header-inner">
                    <a className="logo" href="#home">Loading...</a>
                </div>
            </header>
        );
    }

    const { header } = data;

    return (
        <header className="site-header">
            <div className="container header-inner">
                <a className="logo" href="#home" onClick={(e) => handleClick(e, '#home')}>
                    {header.logo}
                </a>

                <nav id="nav" className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
                    {header.navigation.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <button
                        id="nav-toggle"
                        className="nav-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
