"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Scroll progress bar
    gsap.to(progressRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Hide on scroll down, show on scroll up
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section
    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent">
        <div
          ref={progressRef}
          className="h-full w-0"
          style={{
            background:
              "linear-gradient(to right, var(--accent-red), var(--accent-red-bright))",
            boxShadow: "0 0 10px rgba(225,6,0,0.5)",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[9998] px-6 md:px-12 py-4"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          background: "rgba(5, 5, 5, 0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-sm tracking-[0.3em] text-white hover:text-[var(--accent-red)] transition-colors duration-300"
          >
            <span className="text-[var(--accent-red)]">M</span>R
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-display text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--accent-red)]"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {link.label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6"
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-full h-[1px] bg-white block"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-full h-[1px] bg-white block"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-full h-[1px] bg-white block"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -4 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9997] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "rgba(5, 5, 5, 0.95)" }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl tracking-[0.3em] text-white/60 hover:text-[var(--accent-red)] transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label.toUpperCase()}
                </motion.a>
              ))}

              {/* Social info */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="font-display text-[10px] tracking-[0.2em] text-white/20">
                  {SITE_CONFIG.email}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
