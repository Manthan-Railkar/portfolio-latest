export const SITE_CONFIG = {
  name: "Manthan Railkar",
  firstName: "Manthan",
  lastName: "RAILKAR",
  title: "Creative Developer",
  subtitle: "FULL STACK DEVELOPER & CREATIVE TECHNOLOGIST",
  email: "manthanrailkar@gmail.com",
  github: "https://github.com/ManthanRailkar",
  linkedin: "https://linkedin.com/in/manthan-railkar",
  twitter: "https://twitter.com/manthanrailkar",
};

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { label: "YEARS EXPERIENCE", value: 4, suffix: "+" },
  { label: "PROJECTS DELIVERED", value: 20, suffix: "+" },
  { label: "TECHNOLOGIES", value: 15, suffix: "+" },
  { label: "LINES OF CODE", value: 100, suffix: "K+" },
];

export const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Three.js / R3F", level: 85 },
      { name: "GSAP / Framer Motion", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 82 },
      { name: "REST / GraphQL", level: 87 },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 78 },
      { name: "AWS / Vercel", level: 80 },
      { name: "CI/CD Pipelines", level: 75 },
      { name: "Figma", level: 85 },
    ],
  },
  {
    category: "Creative",
    items: [
      { name: "Motion Design", level: 88 },
      { name: "3D Visualization", level: 82 },
      { name: "UI/UX Design", level: 85 },
      { name: "Interactive Experiences", level: 90 },
      { name: "Creative Coding", level: 87 },
    ],
  },
];

export const PROJECTS = [
  {
    id: "01",
    title: "XOLO — AI Music Engine",
    description:
      "An immersive AI-powered music generation app that transforms photos into musical compositions using computer vision and Meta's MusicGen model. Features real-time audio playback, a 12-pad performance grid, and scale-aware melodic sequencing.",
    tags: ["React Native", "Expo", "AI/ML", "MusicGen", "TypeScript"],
    image: "/images/project-1.jpg",
    link: "#",
    color: "#e10600",
  },
  {
    id: "02",
    title: "MTRX-TriAxis Platform",
    description:
      "A comprehensive classroom management system with dual-role authentication, real-time analytics, glassmorphic design, and Google OAuth integration. Features attendance tracking, performance dashboards, and AI-powered insights.",
    tags: ["Streamlit", "Python", "Google OAuth", "Analytics", "Supabase"],
    image: "/images/project-2.jpg",
    link: "#",
    color: "#ff1801",
  },
  {
    id: "03",
    title: "Cinematic Portfolio V2",
    description:
      "This very website — a broadcast-quality cinematic portfolio inspired by F1 2026 intro sequences. Built with Next.js, Three.js, GSAP ScrollTrigger, and React Three Fiber with volumetric lighting and particle systems.",
    tags: ["Next.js", "Three.js", "GSAP", "R3F", "Tailwind CSS"],
    image: "/images/project-3.jpg",
    link: "#",
    color: "#d4af37",
  },
  {
    id: "04",
    title: "Neural Style Transfer",
    description:
      "A deep learning application that applies artistic styles to photographs using convolutional neural networks. Features real-time preview, multiple style presets, and GPU-accelerated processing for instant results.",
    tags: ["Python", "PyTorch", "CNN", "Computer Vision", "FastAPI"],
    image: "/images/project-4.jpg",
    link: "#",
    color: "#e10600",
  },
];

export const EXPERIENCE = [
  {
    period: "2024 — Present",
    role: "Creative Developer",
    company: "Freelance",
    description:
      "Building immersive web experiences and creative applications. Specializing in 3D web, animation systems, and interactive storytelling for premium brands and startups.",
    technologies: ["Next.js", "Three.js", "GSAP", "React Native"],
  },
  {
    period: "2023 — 2024",
    role: "Full Stack Developer",
    company: "Tech Startup",
    description:
      "Led frontend architecture and built scalable applications with modern React patterns. Implemented real-time features, optimized performance, and mentored junior developers.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Developed responsive web applications and interactive marketing websites. Created animation-heavy landing pages and data visualization dashboards for enterprise clients.",
    technologies: ["React", "TypeScript", "D3.js", "Tailwind"],
  },
  {
    period: "2021 — 2022",
    role: "Junior Developer",
    company: "Software Company",
    description:
      "Started professional career building web applications. Gained experience in agile development, code reviews, and full-stack JavaScript development.",
    technologies: ["JavaScript", "React", "Express", "MongoDB"],
  },
];

export const VISION = [
  "I BUILD EXPERIENCES THAT DEFY EXPECTATIONS",
  "BLURRING THE LINE BETWEEN ART AND ENGINEERING",
  "EVERY PIXEL ENGINEERED FOR IMPACT",
  "DESIGNING THE WEB OF TOMORROW, TODAY"
];

export const ACHIEVEMENTS = [
  {
    id: "01",
    title: "Awwwards Site of the Day",
    year: "2024",
    category: "Web Design",
    description: "Awarded for exceptional creativity, design, and technical innovation."
  },
  {
    id: "02",
    title: "FWA of the Month",
    year: "2023",
    category: "Interactive",
    description: "Recognized for pushing the boundaries of digital and interactive media."
  },
  {
    id: "03",
    title: "Webby Nominee",
    year: "2023",
    category: "Best Navigation",
    description: "Nominated for creating an intuitive and highly engaging user journey."
  },
  {
    id: "04",
    title: "CSS Design Awards",
    year: "2022",
    category: "UI/UX",
    description: "Winner of Best UI Design, Best UX Design, and Best Innovation."
  }
];
