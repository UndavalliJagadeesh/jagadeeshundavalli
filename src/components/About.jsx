import { useExperienceCalculation } from '../hooks/useExperienceCalculation';

const About = () => {
    const experienceYears = useExperienceCalculation(new Date(2024, 9, 1)); // Oct 2024

    return (
        <section id="about" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>About</h2>
                    <div className="floating-icon icon-star">★</div>
                </div>
                <div className="glass-card reveal about-card">
                    <div className="about-content">
                        <p>
                            I'm a Software Engineer specializing in Java backend development with a passion for building scalable,
                            resilient systems that handle mission-critical workloads. With {experienceYears} of experience in implementing
                            distributed microservices architectures, I focus on clean code, API design, and system reliability.
                        </p>
                        <p>
                            My expertise: microservices design patterns, API development with Spring Boot. I thrive on solving
                            complex backend challenges and mentoring teams on best practices.
                        </p>
                    </div>
                    <div className="about-photo">
                        <img src="/assets/profileImage.jpeg" alt="Jagadeesh Undavalli" className="photo-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
