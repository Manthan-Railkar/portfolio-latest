"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/sections/Preloader";
import CinematicTransition from "@/components/ui/CinematicTransition";
import HudOverlay from "@/components/ui/HudOverlay";
import GridBackground from "@/components/ui/GridBackground";

// Aggressive Lazy Loading for Offscreen Sections
const Vision = dynamic(() => import("@/components/sections/Vision"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Global UI Components */}
      <CustomCursor />
      <HudOverlay />

      {/* Main content */}
      <main
        className={`transition-opacity duration-500 bg-black relative ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Render a faint grid overlay for the whole page */}
        <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-30">
          <GridBackground />
        </div>

        <div className="relative z-10">
          <Navbar />
        
        <Hero />
        
        <CinematicTransition text="PROFILE" subtext="// INITIALIZING" />
        <About />
        
        <CinematicTransition text="SYSTEMS" subtext="// BOOT SEQUENCE" />
        <Skills />
        
        <CinematicTransition text="ARCHIVES" subtext="// ACCESSING DATA" />
        <Projects />

        <CinematicTransition text="OVERRIDE" subtext="// DIRECTIVE" />
        <Vision />
        
        <CinematicTransition text="TELEMETRY" subtext="// TRACKING" />
        <Experience />

        <CinematicTransition text="RECORDS" subtext="// GLORY" />
        <Achievements />
        
        <CinematicTransition text="CONTACT" subtext="// COMMUNICATOR" />
        <Contact />
        
        <Footer />
        </div>
      </main>
    </>
  );
}
