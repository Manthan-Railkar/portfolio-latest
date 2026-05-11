"use client";

import { motion } from "framer-motion";

export default function HudOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen hidden md:block">
      {/* Top Left Bracket */}
      <motion.div 
        className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-white/20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute top-2 left-2 font-display text-[8px] tracking-[0.3em] text-[var(--accent-red)]">
          // SYS.ON
        </div>
      </motion.div>

      {/* Top Right Bracket */}
      <motion.div 
        className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse" />
          <span className="font-display text-[8px] tracking-[0.3em] text-white/50">REC</span>
        </div>
      </motion.div>

      {/* Bottom Left Bracket */}
      <motion.div 
        className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute bottom-2 left-2 font-display text-[8px] tracking-[0.3em] text-white/30">
          V_0.1.0
        </div>
      </motion.div>

      {/* Bottom Right Bracket */}
      <motion.div 
        className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-white/20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute bottom-2 right-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1 h-3 ${i < 3 ? 'bg-[var(--accent-red)]' : 'bg-white/20'}`} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
