import { projects } from '../data/portfolioData';

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>Featured Work</h2>
                    <div className="floating-icon icon-rocket">🚀</div>
                </div>
                <div className="grid projects-grid">
                    {projects.map((project) => (
                        <article key={project.id} className="glass-card reveal-stagger">
                            <span className="card-icon material-icons">{project.icon}</span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="card-meta">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="badge">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.links.map((link, index) => (
                                    <a key={index} href={link.url} className="link" target="_blank" rel="noopener noreferrer">
                                        {link.label} →
                                    </a>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
