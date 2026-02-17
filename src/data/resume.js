import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export const resumeData = {
    personalInfo: {
        name: "Siddhant Rastogi",
        title: "Software Engineering Student",
        email: "23x10sid@gmail.com",
        phone: "+91 8273141618",
        links: {
            linkedin: "https://linkedin.com/in/rxsiddhant/",
            github: "https://github.com/theskysid",
            leetcode: "https://leetcode.com/u/theskysid/"
        }
    },
    summary: "Software Engineering student experienced in Java, Spring Boot, React.js, and AWS. Builds scalable backend systems, REST APIs, and real-time features with strong knowledge of data structures, algorithms, and database design.",
    education: [
        {
            school: "ABES Engineering College",
            location: "Ghaziabad, UP",
            degree: "B.Tech in Computer Science Engineering",
            score: "CGPA: 7.61",
            duration: "2023 – 2027 (Expected)"
        },
        {
            school: "Divya Public School",
            location: "Shamli, UP",
            degree: "Intermediate",
            score: "Percentage: 81.80%",
            duration: "2022"
        },
        {
            school: "Divya Public School",
            location: "Shamli, UP",
            degree: "High School",
            score: "Percentage: 90.8%",
            duration: "2020"
        }
    ],
    projects: [
        {
            title: "Echo Messaging",
            tech: ["Java", "Spring Boot", "WebSocket", "React.js", "PostgreSQL"],
            description: [
                "Built real-time chat service using Spring Boot WebSockets and Redis Pub/Sub to enable horizontal scaling across multiple instances.",
                "Developed a JWT-secured React frontend with live presence updates, group chats, typing indicators, and media handling via AWS S3.",
                "Designed modular backend components for chat sessions, message history storage, and extensible features like online status and delivery receipts."
            ],
            link: "https://github.com/theskysid" // Assuming provided github link is base, specific repo not linked in resume text directly but implies GitHub presence
        },
        {
            title: "AI Web Cleaner: Popup & Dark Pattern Detection System",
            tech: ["Python", "Machine Learning", "Computer Vision", "DOM Analysis"],
            description: [
                "Developed an AI-driven system to detect intrusive popups, ads, and manipulative UI dark patterns by analyzing webpage DOM structure and visual layout.",
                "Engineered behavioral features such as viewport coverage, scroll locking, opacity, CTA dominance, and close-button visibility to train supervised ML classifiers.",
                "Implemented screenshot-based computer vision analysis to identify visually deceptive overlays and mismatches between rendered UI and underlying HTML intent.",
                "Built an explainable classification pipeline that outputs confidence scores and feature importance to justify UI manipulation detection decisions."
            ],
            link: "https://github.com/theskysid"
        }
    ],
    skills: {
        languages: ["Java", "C/C++", "Python", "HTML", "CSS", "JavaScript"],
        backend: ["Spring Boot", "Spring Security", "JPA", "REST APIs"],
        frontend: ["React.js", "HTML", "CSS"],
        databases: ["PostgreSQL", "MySQL"],
        cloudDevOps: ["AWS EC2", "S3", "IAM", "Lambda"],
        tools: ["Git", "GitHub", "Postman", "Linux"]
    },
    certificates: [
        "AWS Academy Graduate – Introduction to Cloud Semester 1",
        "Getting Started with AWS Services Fundamentals for Beginners"
    ],
    achievements: [
        "Solved 200+ problems on LeetCode with a 75 percent success rate.",
        "Earned the 100 Days Badge on LeetCode.",
        "Selected to represent the college in the Smart India Hackathon (SIH) Internal Hackathon."
    ]
};
