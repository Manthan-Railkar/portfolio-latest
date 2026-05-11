'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectProps {
  project: {
    title: string
    description: string
    technologies: string[]
    category: string
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-4">
          <Github size={20} className="cursor-pointer hover:text-primary" />
          <ExternalLink size={20} className="cursor-pointer hover:text-primary" />
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2 block">
          {project.category}
        </span>
        <h3 className="text-3xl font-display font-bold uppercase italic mb-4 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-6 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded-full uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
    </motion.div>
  )
}
