'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import BackgroundText from './BackgroundText'
import SignatureText from './SignatureText'
import HUDOverlays from './HUDOverlays'
import ParallaxLabels from './ParallaxLabels'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait Zoom & Rotation with Inertia
      gsap.to(portraitRef.current, {
        scale: 1.2,
        rotate: 5,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // HUD Elements repositioning
      gsap.to(overlayRef.current, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Layer 1: Oversized Background Typography */}
      <BackgroundText text="RAILKAR" />

      {/* Layer 1.5: Kinetic Parallax Labels */}
      <ParallaxLabels />

      {/* Layer 2: Centered Subject Image with Depth Separation */}
      <motion.div 
        ref={portraitRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-[80%] max-w-[600px] aspect-[4/5] md:aspect-square flex items-center justify-center will-change-transform"
      >
        {/* Cinematic Lighting Frame */}
        <div className="absolute inset-0 border border-white/10 rounded-sm shadow-[0_0_10px_rgba(255,0,0,0.1)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          {/* Placeholder for Manthan Railkar Image */}
          <div className="w-full h-full bg-[#080808] flex items-center justify-center">
             <div className="text-gray-900 font-display font-black text-4xl uppercase opacity-20 select-none">Portrait_MR</div>
          </div>
          {/* Internal Glowing Accents */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        </div>
        
        {/* Layer 3: Neon Red Signature Overlay */}
        <SignatureText />
      </motion.div>

      {/* Layer 4: HUD Overlays */}
      <div ref={overlayRef} className="absolute inset-0 z-30 pointer-events-none">
        <HUDOverlays />
      </div>

      {/* Bottom Labeling */}
      <div className="absolute bottom-10 left-10 z-30 flex items-center gap-6">
        <div className="w-12 h-[1px] bg-primary" />
        <div className="font-mono text-[10px] tracking-[0.3em] text-gray-400">
          SYSTEMS_CHECK_OK // DRIVER_ID: MR_07
        </div>
      </div>
    </section>
  )
}
