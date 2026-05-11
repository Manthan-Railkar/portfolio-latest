'use client'

import CinematicBackground from '@/components/CinematicBackground'
import SmoothScroll from '@/components/SmoothScroll'
import ProjectCard from '@/components/ProjectCard'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/Hero/Hero'
import { motion } from 'framer-motion'

const MOCK_PROJECTS = [
  {
    title: "Formula 1 2026 Intro",
    description: "A broadcast-quality intro sequence using R3F and GSAP. Features volumetric lighting and cinematic post-processing.",
    technologies: ["React", "Three.js", "GSAP"],
    category: "3D"
  },
  {
    title: "Motorsport Dashboard",
    description: "Real-time telemetry visualization for elite racing teams. High-performance data streaming and visualization.",
    technologies: ["React", "D3.js", "WebSockets"],
    category: "Web"
  },
  {
    title: "Carbon Chassis Config",
    description: "Interactive 3D component configurator for high-performance automotive parts.",
    technologies: ["R3F", "Typescript", "Tailwind"],
    category: "3D"
  }
];

function Projects() {
  return (
    <section className="min-h-screen py-32 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic">Selected <span className="text-primary">Projects</span></h2>
          <p className="text-gray-500 font-mono mt-4">PHASE_01 // HIGH_PERFORMANCE_UNITS</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <div className="noise-bg" />
      <div className="scanline" />
      
      <CinematicBackground />
      
      <SmoothScroll>
        <Hero />
        
        <section className="min-h-[50vh] flex items-center justify-center px-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-4xl font-display uppercase italic text-center max-w-4xl leading-tight"
          >
            Engineering <span className="text-primary">digital speed</span> through broadcast-quality visuals and elite architecture.
          </motion.p>
        </section>

        <Projects />

        <section className="py-32 px-10">
          <ContactForm />
        </section>

        <footer className="py-20 px-10 border-t border-white/10 text-center">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            © 2026 Cinematic Portfolio // All Systems Operational
          </p>
        </footer>
      </SmoothScroll>
    </main>
  )
}
