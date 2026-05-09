// src/data/timeline.js
// Experience & Education timeline data

export const timelineItems = [
  {
    id: 1,
    type: "education",
    title: "Computer Science Engineering",
    organization: "Chandigarh University",
    period: "2023 – 2027",
    current: true,
    description:
      "B.E. in Computer Science Engineering. Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering.",
    tags: ["B.E.", "CSE", "CGPA: 8.2"],
    color: "#00fff2",
    icon: "GraduationCap",
  },
  {
    id: 2,
    type: "internship",
    title: "Team Lead — Civix Platform",
    organization: "Infosys Springboard",
    period: "Nov 2025 – Jan 2026",
    current: false,
    description:
      "Led a 3-member team to build Civix, a full-stack SaaS platform for civic engagement and community petitions. Managed sprint planning, code reviews, and final deployment.",
    tags: ["Node.js", "MongoDB", "Team Lead", "Agile"],
    color: "#b06aff",
    icon: "Briefcase",
  },
  {
    id: 3,
    type: "internship",
    title: "Frontend Developer",
    organization: "Ecomlancers",
    period: "May 2025 – July 2025",
    current: false,
    description:
      "Developed responsive e-commerce UI components, optimized Core Web Vitals, and integrated REST APIs for product listing and cart management.",
    tags: ["React", "TypeScript", "REST APIs", "Performance"],
    color: "#4f9eff",
    icon: "Monitor",
  },
  {
    id: 4,
    type: "achievement",
    title: "Winner — Tekathon 4.0",
    organization: "IoT Hackathon",
    period: "Sept 2025",
    current: false,
    description:
      "First place among 200+ teams for Ignite.fence — a real-time IoT fence breach detection system using ESP32 microcontrollers and MQTT alert delivery.",
    tags: ["ESP32", "IoT", "🏆 1st Place"],
    color: "#ff6b35",
    icon: "Trophy",
  },
];
