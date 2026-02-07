// ============================================
//    PORTFOLIO DATA
// ============================================

// Hero Section
export const hero = {
    greeting: "H! I'm Jagadeesh",
    title: "Software Engineer",
    description: "I design and build robust backend systems that power modern applications. Specializing in microservices architecture, distributed systems, and enterprise-grade solutions with Java and Spring Boot.",
    primaryButton: {
        text: "Explore Work",
        link: "#experience"
    },
    secondaryButton: {
        text: "Start a Conversation",
        link: "#contact"
    },
    techStack: ["Java", "Spring Boot", "Microservices", "Git"]
};

// Projects Data
export const projects = [
    {
        id: 1,
        icon: 'school',
        title: 'Student Dropout Prediction',
        description:
            'Developed an intelligent machine learning system to help educational institutions predict and prevent student dropouts. Leveraged RandomForestClassifier to achieve superior accuracy in identifying at-risk students, enabling early intervention strategies. Deployed as a cloud-based application using Streamlit for real-time predictions.',
        technologies: ['Machine Learning', 'Python', 'Streamlit', 'RandomForest'],
        links: [
            {
                label: 'View source code',
                url: 'https://github.com/UndavalliJagadeesh/Student_Dropout_Prediction',
            },
            {
                label: 'Live deployment',
                url: 'https://huggingface.co/spaces/jagadeeshundavalli/Student_Dropout_Prediciton',
            },
        ],
    },
    {
        id: 2,
        icon: 'directions_car',
        title: 'Anonymous Vehicle Identification System',
        description:
            'Built an automated parking management system combining OCR technology and pattern recognition to identify vehicles in real-time. Extracts registration numbers from images, cross-references with database, and implements intelligent fallback mechanisms for unrecognized vehicles with administrator notifications.',
        technologies: ['OCR', 'Pattern Recognition', 'Image Processing', 'Python'],
        links: [
            {
                label: 'View source code',
                url: 'https://github.com/UndavalliJagadeesh/Vehicle-Plate-Detection',
            },
        ],
    },
    {
        id: 3,
        icon: 'webhook',
        title: 'DhaanAPI',
        description:
            'Created a versatile RESTful API framework using Flask that provides seamless database interaction capabilities. Offers efficient data retrieval, manipulation, and storage through well-designed endpoints. Deployed on cloud infrastructure to ensure high availability and scalability for diverse use cases.',
        technologies: ['Flask', 'Python', 'RESTful API', 'Postgres'],
        links: [
            {
                label: 'View source code',
                url: 'https://github.com/UndavalliJagadeesh/DhaanAPI',
            },
            {
                label: 'Live deployment',
                url: 'https://dhaanapi.onrender.com/',
            },
        ],
    },
];

export const experience = [
    {
        id: 1,
        title: 'Software Engineer',
        company: 'Persistent Systems Ltd',
        location: 'Hyderabad, Telangana, India',
        dateRange: 'Oct 2024 - Present',
        duration: '1 year 5 months',
        responsibilities: [
            'Working with US based client in BFSI domain.',
            'Enabled new functionalities in existing applications enhancing cross application communication.',
            '',
            'Maintained and upgraded Java, JAR versions to ensure compatibility and enhance application performance.',
        ],
        technologies: [
            'Java',
            'Spring Boot',
            'Junit',
            'Microservices',
            'Git',
            'Gradle',
            'SQL',
            'MongoDB',
            'Splunk',
        ],
    },
    {
        id: 2,
        title: 'Student Intern',
        company: 'Persistent Systems Ltd',
        location: 'Remote',
        dateRange: 'Jan 2024 - Sep 2024',
        duration: '9 months',
        responsibilities: [
            'Gained hands-on experience with key technologies, including JUnit, Maven, Spring, and Spring Boot',
            'Familiarized with Scrum and Kanban practices, enhancing understanding of agile methodologies',
            'Participated in internal hackathon, gaining insights into transforming ideas into functional working models',
        ],
        technologies: ['JUnit', 'Maven', 'Spring', 'Spring Boot'],
    },
];

export const contactInfo = [
    {
        id: 1,
        icon: 'email',
        title: 'Email',
        value: 'jagadeesh.undavalli77@gmail.com',
        link: 'mailto:jagadeesh.undavalli77@gmail.com',
    },
    {
        id: 2,
        icon: 'work',
        title: 'LinkedIn',
        value: 'linkedin.com/in/jagadeeshundavalli',
        link: 'https://www.linkedin.com/in/jagadeeshundavalli',
        external: true,
    },
];

export const socialLinks = [
    {
        label: 'GitHub',
        url: 'https://github.com/UndavalliJagadeesh',
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jagadeeshundavalli',
    },
];
