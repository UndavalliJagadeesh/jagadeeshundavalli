import { usePortfolioData } from '../hooks/usePortfolioData';

const Contact = () => {
    const { data, loading } = usePortfolioData();

    if (loading || !data) {
        return (
            <section id="contact" className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <h2>Get In Touch</h2>
                        <div className="floating-icon icon-contact">📧</div>
                    </div>
                </div>
            </section>
        );
    }

    const { contactInfo, sections } = data;

    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="section-header reveal">
                    <h2>Let's Build Something</h2>
                    <div className="floating-icon icon-mail">📪</div>
                </div>
                <div className="glass-card contact-wrapper reveal">
                    <div className="contact-info">
                        {contactInfo.map((info) => (
                            <div key={info.id} className="contact-item">
                                <span className="material-icons contact-icon">{info.icon}</span>
                                <div className="contact-details">
                                    <h3>{info.title}</h3>
                                    <a
                                        href={info.link}
                                        className="contact-link"
                                        {...(info.external && { target: "_blank", rel: "noopener noreferrer" })}
                                    >
                                        {info.value}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
