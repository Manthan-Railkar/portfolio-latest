'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HUDOverlays() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => (prev < 99 ? prev + 1 : 0))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {/* Giant Transparent 7 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 2 }}
        className="absolute -left-20 top-1/2 -translate-y-1/2 font-display font-black text-[60rem] leading-none text-white select-none"
      >
        7
      </motion.div>

      {/* Top Left Bracket */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-primary/50"
      >
        <span className="absolute top-2 left-4 text-[10px] font-mono text-primary tracking-tighter uppercase">
          LNK_EST_07 // READY
        </span>
      </motion.div>

      {/* Bottom Right Bracket */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-primary/50"
      >
        <div className="absolute bottom-2 right-4 text-right">
          <span className="block text-[10px] font-mono text-primary tracking-tighter uppercase">SYNCING_DATA_STREAM</span>
          <span className="block text-2xl font-display font-bold text-white">0{counter}.07</span>
        </div>
      </motion.div>

      {/* Side Dynamic UI Counter */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-end">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`h-[1px] bg-primary transition-all duration-300`} style={{ width: `${Math.random() * 40 + 20}px` }} />
            <span className="text-[8px] font-mono text-gray-500">CHASSIS_0{i}_VAL</span>
          </div>
        ))}
        <div className="mt-4 flex items-center gap-4">
          <div className="text-right">
            <span className="block text-[8px] font-mono text-gray-500 uppercase">Unit Rank</span>
            <span className="text-4xl font-display font-black text-primary italic">#7</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scan Bar */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 w-full h-[1px] bg-primary/20 z-40"
      />
    </div>
  )
}
