// src/data/techStack.js
// Categorized technology skills

export const techCategories = [
  {
    id: "languages",
    label: "Languages",
    icon: "Code2",
    skills: [
      { name: "C++", color: "#00599C", level: 90 },
      { name: "Java", color: "#ED8B00", level: 85 },
      { name: "JavaScript", color: "#F7DF1E", level: 92 },
      { name: "TypeScript", color: "#3178C6", level: 78 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "Server",
    skills: [
      { name: "Spring Boot", color: "#6DB33F", level: 85 },
      { name: "Node.js", color: "#339933", level: 88 },
      { name: "Express", color: "#888888", level: 88 },
      { name: "Spring Security", color: "#6DB33F", level: 80 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React", color: "#61DAFB", level: 90 },
      { name: "Vite", color: "#646CFF", level: 85 },
      { name: "Recharts", color: "#22b5bf", level: 75 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "Database",
    skills: [
      { name: "MySQL", color: "#4479A1", level: 82 },
      { name: "MongoDB", color: "#47A248", level: 80 },
      { name: "PostgreSQL", color: "#336791", level: 75 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "AWS S3", color: "#FF9900", level: 75 },
      { name: "AWS EC2", color: "#FF9900", level: 70 },
      { name: "AWS Lambda", color: "#FF9900", level: 68 },
      { name: "Docker", color: "#2496ED", level: 72 },
      { name: "GitHub Actions", color: "#2088FF", level: 78 },
    ],
  },
  {
    id: "queues",
    label: "Message Queues",
    icon: "Zap",
    skills: [
      { name: "Kafka", color: "#231F20", level: 65 },
      { name: "AWS SQS", color: "#FF9900", level: 68 },
    ],
  },
  {
    id: "iot",
    label: "IoT / Hardware",
    icon: "Cpu",
    skills: [
      { name: "ESP32", color: "#E7352C", level: 80 },
      { name: "Arduino", color: "#00979D", level: 78 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", color: "#F05032", level: 92 },
      { name: "Postman", color: "#FF6C37", level: 88 },
      { name: "Vercel", color: "#000000", level: 85 },
      { name: "Render", color: "#46E3B7", level: 82 },
    ],
  },
];
