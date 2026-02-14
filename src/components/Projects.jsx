import { useState, useEffect } from 'react';
import { projects } from '../data/portfolioData';

const Projects = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(hasTouchScreen);
    }, []);

    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>Featured Work</h2>
                    <div className="floating-icon icon-rocket">🚀</div>
                </div>
                <div className="grid projects-grid">
                    {projects.map((project) => (
                        <article key={project.id} className="glass-card flip-card reveal-stagger">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <div className="card-header">
                                        <span className="card-icon material-icons">{project.icon}</span>
                                        <h3>{project.title}</h3>
                                    </div>
                                    <div className="project-image-placeholder">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} />
                                        ) : (
                                            <span className="material-icons">image</span>
                                        )}
                                    </div>
                                    <div className="card-meta">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="badge">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="flip-hint">
                                        {isTouchDevice ? 'Click to see more →' : 'Hover to see more →'}
                                    </div>
                                </div>
                                <div className="flip-card-back">
                                    <h3>{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-links">
                                        {project.links.map((link, index) => (
                                            <a key={index} href={link.url} className="link" target="_blank" rel="noopener noreferrer">
                                                {link.label} →
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
