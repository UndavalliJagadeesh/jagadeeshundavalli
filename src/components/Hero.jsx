import { hero } from '../data/portfolioData';

const Hero = ({ onNavigate }) => {
    const handleClick = (e, href) => {
        e.preventDefault();
        onNavigate(href);
    };

    return (
        <section id="home" className="hero">
            <div className="container hero-inner">
                <div className="hero-content reveal">
                    <div className="floating-icon icon-code">{'{ }'}</div>
                    <h1>
                        {hero.greeting}<br />
                        <span className="gradient-text">{hero.title}</span>
                    </h1>
                    <p className="lead">
                        {hero.description}
                    </p>
                    <div className="ctas">
                        <a href={hero.primaryButton.link} onClick={(e) => handleClick(e, hero.primaryButton.link)} className="btn btn-primary">
                            {hero.primaryButton.text}
                        </a>
                        <a href={hero.secondaryButton.link} onClick={(e) => handleClick(e, hero.secondaryButton.link)} className="btn btn-secondary">
                            {hero.secondaryButton.text}
                        </a>
                    </div>
                    <div className="tech-stack">
                        {hero.techStack.map((tech, index) => (
                            <span key={index} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="hero-visual reveal">
                    <div className="tech-illustration">
                        <svg className="laptop-svg" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="15" width="120" height="75" rx="8" fill="rgba(0, 212, 255, 0.15)" stroke="#00d4ff" strokeWidth="3" />
                            <rect x="46" y="21" width="108" height="63" rx="4" fill="rgba(10, 14, 39, 0.8)" stroke="#00f7ff" strokeWidth="1.5" />
                            <rect x="50" y="25" width="100" height="55" rx="3" fill="rgba(0, 212, 255, 0.1)" />
                            <line x1="55" y1="32" x2="90" y2="32" stroke="#00d4ff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                            <line x1="55" y1="42" x2="115" y2="42" stroke="#00f7ff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                            <line x1="55" y1="52" x2="80" y2="52" stroke="#00d4ff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                            <line x1="55" y1="62" x2="100" y2="62" stroke="#00f7ff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                            <line x1="55" y1="72" x2="95" y2="72" stroke="#00d4ff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
                            <ellipse cx="100" cy="96" rx="70" ry="8" fill="rgba(0, 212, 255, 0.2)" stroke="#00d4ff" strokeWidth="2.5" />
                            <rect x="35" y="90" width="130" height="6" rx="2" fill="rgba(0, 212, 255, 0.25)" stroke="#00f7ff" strokeWidth="1.5" />
                            <line x1="45" y1="93" x2="155" y2="93" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                            <ellipse cx="100" cy="104" rx="75" ry="4" fill="rgba(0, 247, 255, 0.3)" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
