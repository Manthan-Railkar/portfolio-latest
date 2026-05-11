'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LABELS = [
  { text: "AI Engineer", top: "15%", left: "10%", depth: 1.2 },
  { text: "Full Stack Developer", top: "25%", right: "10%", depth: 0.8 },
  { text: "Machine Learning", bottom: "30%", left: "15%", depth: 1.5 },
  { text: "Creative Technologist", top: "10%", right: "20%", depth: 0.5 },
  { text: "UI/UX Designer", bottom: "15%", right: "15%", depth: 1.1 },
  { text: "N.A.V.A", top: "40%", left: "5%", depth: 2 },
  { text: "XOLO", bottom: "40%", right: "5%", depth: 1.8 },
  { text: "Visionary Builder", top: "60%", left: "10%", depth: 0.9 },
  { text: "Innovator", bottom: "10%", left: "30%", depth: 1.3 },
]

export default function ParallaxLabels() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const labels = containerRef.current?.querySelectorAll('.parallax-label')
    if (!labels) return

    labels.forEach((label) => {
      const depth = parseFloat(label.getAttribute('data-depth') || '1')
      
      // Initial Reveal
      gsap.fromTo(label, 
        { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
        { 
          opacity: 0.4, 
          scale: 1 / depth, 
          filter: `blur(${Math.max(0, (depth - 1) * 5)}px)`,
          duration: 2, 
          delay: Math.random() * 1,
          ease: 'power4.out' 
        }
      )

      // Floating Animation
      gsap.to(label, {
        x: 'random(-20, 20)',
        y: 'random(-20, 20)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Mouse Parallax
      const onMouseMove = (e: MouseEvent) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.02 * depth
        const y = (e.clientY - window.innerHeight / 2) * 0.02 * depth
        gsap.to(label, { x, y, duration: 1, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', onMouseMove)
      return () => window.removeEventListener('mousemove', onMouseMove)
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {LABELS.map((label, i) => (
        <div 
          key={i}
          data-depth={label.depth}
          className="parallax-label absolute font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 whitespace-nowrap will-change-transform"
          style={{
            top: label.top,
            left: label.left,
            right: label.right,
            bottom: label.bottom,
            mixBlendMode: 'screen'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(255,0,0,0.8)]" />
            {label.text}
          </div>
        </div>
      ))}
    </div>
  )
}
