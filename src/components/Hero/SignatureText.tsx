'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SignatureText() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Handwriting Stroke Simulation
    tl.fromTo(textRef.current, 
      { 
        opacity: 0, 
        clipPath: 'inset(0 100% 0 0)',
        filter: 'brightness(0.5) blur(5px)',
        x: -20
      },
      { 
        opacity: 1, 
        clipPath: 'inset(0 0% 0 0)',
        filter: 'brightness(1.2) blur(0px)',
        x: 0,
        duration: 1.5,
        ease: 'power3.inOut'
      }
    )

    // Neon Flickering Effect
    tl.to(textRef.current, {
      opacity: 0.8,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'steps(1)',
      delay: -0.5
    })
    tl.to(textRef.current, { opacity: 1, duration: 0.2 })

    // Elegant Underline Reveal
    tl.fromTo(lineRef.current,
      { width: 0, opacity: 0 },
      { width: '100%', opacity: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.5'
    )

    // Continuous Subtle Glow Pulse
    gsap.to(textRef.current, {
      textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div className="absolute -bottom-10 -right-10 md:-right-20 z-30 pointer-events-none">
      <div className="relative">
        <h2 
          ref={textRef}
          className="text-6xl md:text-8xl text-primary italic font-signature will-change-transform"
          style={{ 
            textShadow: '0 0 10px rgba(255, 0, 0, 0.5)'
          }}
        >
          Manthan
        </h2>
        <div 
          ref={lineRef}
          className="h-[2px] bg-primary mt-1 shadow-[0_0_10px_rgba(255,0,0,0.5)] origin-left"
        />
      </div>
    </div>
  )
}
