import { useExperienceCalculation } from '../hooks/useExperienceCalculation';
import { usePortfolioData } from '../hooks/usePortfolioData';

const About = () => {
    const { data, loading } = usePortfolioData();

    // Calculate experience - use fallback date if data not loaded
    const startDate = data?.about?.startDate
        ? new Date(data.about.startDate)
        : new Date(2024, 9, 7);
    const experienceYears = useExperienceCalculation(startDate);

    if (loading || !data) {
        return (
            <section id="about" className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <h2>About</h2>
                    </div>
                </div>
            </section>
        );
    }

    const { about } = data;

    return (
        <section id="about" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>{about.title}</h2>
                    <div className="floating-icon icon-star">{about.icon}</div>
                </div>
                <div className="glass-card reveal about-card">
                    <div className="about-content">
                        {about.content.map((paragraph, index) => (
                            <p key={index}>
                                {paragraph.replace("{experienceYears}", experienceYears)}
                            </p>
                        ))}
                    </div>
                    <div className="about-photo">
                        <img src={about.profileImage} alt={about.profileImageAltText} className="photo-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
