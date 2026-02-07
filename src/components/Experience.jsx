import { experience } from '../data/portfolioData';

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>Professional Journey</h2>
                    <div className="floating-icon icon-star">💼</div>
                </div>
                <div className="experience-scroll">
                    {experience.map((exp) => (
                        <div key={exp.id} className="glass-card reveal-stagger experience-card">
                            <div className="experience-header">
                                <h3>{exp.title}</h3>
                                <span className="experience-date">{exp.dateRange}</span>
                            </div>
                            <p className="experience-company">{exp.company}</p>
                            <p className="experience-location">{exp.location}</p>
                            <p className="experience-duration">{exp.duration}</p>
                            <ul className="experience-list">
                                {exp.responsibilities.map((resp, index) => (
                                    resp && <li key={index}>{resp}</li>
                                ))}
                            </ul>
                            <div className="card-meta">
                                {exp.technologies.map((tech, index) => (
                                    <span key={index} className="badge">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
