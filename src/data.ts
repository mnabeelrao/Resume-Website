export const profile = {
  name: "Muhammad Nabeel Rao",
  title: "Computer Science Undergraduate",
  phone: "03162463192",
  email: "nabeelrao2002@gmail.com",
  gmailLink: "https://mail.google.com/mail/?view=cm&fs=1&to=nabeelrao2002@gmail.com",
  whatsappNumber: "923162463192",
  whatsappLink:
    "https://api.whatsapp.com/send?phone=923162463192&text=Hello%20Nabeel%2C%20I%20saw%20your%20online%20resume",
  whatsappShortLink: "https://wa.me/923162463192",
  linkedin: "https://linkedin.com/in/mnabeelrao",
  linkedinLabel: "linkedin.com/in/mnabeelrao",
  roles: [
    "Computer Science Undergraduate",
    "Java & Python Developer",
    "AI / NLP Enthusiast",
    "Co-founder & Researcher",
  ],
  summary:
    "Computer Science undergraduate with hands-on experience building software applications, AI/NLP solutions, and web-based projects. Experienced in Java, Python, AI/ML, and application development, with additional exposure to modern web technologies and cloud tools. Co-founded a software house, gaining practical experience in client requirements, project delivery, and communication. Currently researching vision-based entropy for true random number generation. Curious, adaptable, and motivated to learn new technologies while building practical solutions to real-world problems.",
};

export const skills = [
  {
    group: "Languages",
    icon: "{ }",
    items: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "HTML", level: 85 },
      { name: "CSS", level: 80 },
    ],
  },
  {
    group: "AI / Data",
    icon: "AI",
    items: [
      { name: "AI / ML", level: 75 },
      { name: "NLP", level: 70 },
      { name: "Data Analytics", level: 70 },
    ],
  },
  {
    group: "Framework / UI & Cloud",
    icon: "☁",
    items: [
      { name: "JavaFX", level: 80 },
      { name: "AWS (Academic / Project)", level: 60 },
    ],
  },
  {
    group: "Core & Additional",
    icon: "★",
    items: [
      { name: "Object-Oriented Programming", level: 85 },
      { name: "Application Development", level: 80 },
      { name: "Technical Research", level: 75 },
      { name: "Content Strategy & Research", level: 80 },
      { name: "Digital Marketing", level: 75 },
      { name: "Client Relations", level: 80 },
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University — add your institution name",
    period: "Currently pursuing",
    details:
      "Focus on object-oriented programming, AI/ML, NLP, data analytics and application development.",
  },
];

export type Project = {
  title: string;
  category: "Research" | "AI" | "Desktop" | "Web";
  status?: string;
  points: string[];
  tech: string[];
};

export const projects: Project[] = [
  {
    title: "Vision-Based Entropy Source for True Random Number Generation",
    category: "Research",
    status: "Ongoing",
    points: [
      "Research project exploring a vision-based entropy source for true random number generation.",
      "Focus: entropy quality, randomness evaluation, and experimental validation.",
    ],
    tech: ["Research", "Computer Vision", "Randomness"],
  },
  {
    title: "Multi-Agent Debate",
    category: "AI",
    points: [
      "Built an AI-based multi-agent system where multiple agents participate in structured debate.",
      "Explored agent roles, interaction, reasoning, and response evaluation.",
    ],
    tech: ["Python", "AI", "NLP"],
  },
  {
    title: "Resume Analyzer",
    category: "AI",
    points: [
      "Developed an AI/NLP-oriented application for analyzing resumes and extracting useful information.",
      "Designed around practical resume evaluation and career-oriented analysis.",
    ],
    tech: ["Python", "NLP"],
  },
  {
    title: "Skill Mapper",
    category: "AI",
    points: [
      "Created a career-oriented application for mapping skills and identifying relevant skill areas.",
      "Used AI/data-driven approaches to support learning and career planning.",
    ],
    tech: ["Python", "Data Analytics"],
  },
  {
    title: "Study Planner AI",
    category: "AI",
    points: [
      "Developed an AI-assisted study planning application concept for organizing learning tasks.",
      "Focused on personalized study guidance and planning.",
    ],
    tech: ["Python", "AI"],
  },
  {
    title: "Bank Management System — Java / JavaFX",
    category: "Desktop",
    points: [
      "Built a desktop banking application using Java and JavaFX.",
      "Demonstrated object-oriented programming, GUI development, and core banking operations.",
    ],
    tech: ["Java", "JavaFX", "OOP"],
  },
  {
    title: "Avoid Traffic",
    category: "Desktop",
    points: [
      "Developed an application focused on improving route or traffic-avoidance decisions.",
      "Applied programming and problem-solving to a practical scenario.",
    ],
    tech: ["Java", "Problem Solving"],
  },
];

export const experience = [
  {
    role: "Founder & Marketing Executive",
    org: "Pixzio",
    period: "2019 – 2021",
    points: [
      "Co-founded and operated a software house delivering custom web and digital solutions for clients.",
      "Led end-to-end client communications, project requirement gathering, and marketing strategies before transitioning full-time into Computer Science degree studies.",
    ],
  },
  {
    role: "Content Creator & Social Media Manager",
    org: "Future Forever Foundation",
    period: "2021 – 2023",
    points: [
      "Created and managed digital content and supported social media communication for the organization.",
    ],
  },
  {
    role: "Digital Content Strategist",
    org: "JK Traders",
    period: "2020 – 2021",
    points: [
      "Supported content planning, research, and digital communication activities.",
    ],
  },
];

export const certifications = [
  {
    name: "AWS Cloud",
    issuer: "Academic / Project Exposure",
    status: "Completed exposure",
  },
  {
    name: "SAP ABAP",
    issuer: "Enterprise Technologies",
    status: "In progress",
  },
  {
    name: "AWS (Enterprise Technologies)",
    issuer: "Cloud Platform",
    status: "In progress",
  },
];

export const achievements = [
  {
    stat: "2019",
    text: "Co-founded Pixzio, a software house delivering custom web and digital solutions.",
  },
  {
    stat: "7+",
    text: "Software, AI/NLP and research projects built across Java, JavaFX and Python.",
  },
  {
    stat: "3",
    text: "Professional roles across software, content strategy and social media management.",
  },
  {
    stat: "R&D",
    text: "Currently conducting research on vision-based entropy for true random number generation.",
  },
];
