'use client'

import { motion } from 'framer-motion'

export default function ContactForm() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto w-full bg-[#0a0a0a] border border-white/5 p-10 rounded-sm"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-display font-black uppercase italic mb-2">Connect</h2>
        <div className="w-20 h-1 bg-primary mx-auto" />
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">Identifier</label>
          <input 
            type="text" 
            placeholder="NAME / ALIAS"
            className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">Transmission Channel</label>
          <input 
            type="email" 
            placeholder="EMAIL@PROTOCOL.COM"
            className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">Payload</label>
          <textarea 
            rows={4}
            placeholder="MESSAGE CONTENT..."
            className="w-full bg-white/5 border border-white/10 p-4 font-mono text-sm focus:border-primary outline-none transition-colors resize-none"
          />
        </div>
        <button className="w-full bg-primary py-4 font-display font-bold uppercase italic tracking-widest hover:bg-secondary transition-colors">
          Initiate Transmission
        </button>
      </form>
    </motion.div>
  )
}
