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
            title: "Library Management System",
            tech: ["Java", "Spring Boot", "Spring Security", "JPA", "PostgreSQL", "JWT"],
            description: [
                "Built RESTful APIs for book cataloging, lending workflows, and user management using a clean layered architecture.",
                "Integrated Spring Security with JWT to implement role-based access control for users and administrators.",
                "Optimized backend performance using JPA and efficient query design, improving response time and overall scalability."
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
