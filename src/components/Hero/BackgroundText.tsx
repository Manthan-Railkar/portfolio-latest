'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BackgroundTextProps {
  text: string
}

export default function BackgroundText({ text }: BackgroundTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Initial Reveal
    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
    tl.fromTo(textRef.current, 
      { 
        clipPath: 'inset(0 100% 0 0)', 
        x: -100,
        filter: 'blur(20px)',
        opacity: 0,
        scale: 1.2
      },
      { 
        clipPath: 'inset(0 0% 0 0)', 
        x: 0,
        filter: 'blur(0px)',
        opacity: 0.2,
        scale: 1,
        duration: 2.5
      }
    )

    // Layered Parallax Motion
    gsap.to(textRef.current, {
      y: -200,
      x: 100,
      rotate: -2,
      scale: 1.1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      }
    })

    // Glowing Pulse Loop
    gsap.to(textRef.current, {
      opacity: 0.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none overflow-hidden">
      <h1 
        ref={textRef}
        className="font-display font-black text-[20vw] text-transparent leading-none italic will-change-transform"
        style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
        }}
      >
        {text}
      </h1>
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
    </div>
  )
}
