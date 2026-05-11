"use client";

import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/[0.03]">
      {/* Top red gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent-red)/20, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <div className="font-display text-[10px] tracking-[0.2em] text-white/20">
            © {currentYear} {SITE_CONFIG.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>

          {/* Center: Designed by */}
          <div className="font-display text-[9px] tracking-[0.15em] text-white/15">
            DESIGNED & BUILT BY{" "}
            <span className="text-[var(--accent-red)]/40">
              {SITE_CONFIG.name.toUpperCase()}
            </span>
          </div>

          {/* Right: Social links */}
          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] tracking-[0.2em] text-white/20 hover:text-[var(--accent-red)] transition-colors duration-300"
            >
              GITHUB
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] tracking-[0.2em] text-white/20 hover:text-[var(--accent-red)] transition-colors duration-300"
            >
              LINKEDIN
            </a>
            <a
              href={SITE_CONFIG.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] tracking-[0.2em] text-white/20 hover:text-[var(--accent-red)] transition-colors duration-300"
            >
              TWITTER
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
