"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface FloatingLabel {
  text: string;
  x: number; // percentage from left
  y: number; // percentage from top
  depth: number; // 0=far, 1=near — controls blur, scale, parallax strength
  speed: number; // float speed multiplier
  style: "outlined" | "filled" | "accent" | "muted";
  size: "sm" | "md" | "lg";
}

const LABELS: FloatingLabel[] = [
  { text: "AI ENGINEER", x: 8, y: 18, depth: 0.3, speed: 0.7, style: "outlined", size: "md" },
  { text: "CREATIVE DEVELOPER", x: 75, y: 22, depth: 0.6, speed: 0.5, style: "accent", size: "sm" },
  { text: "MACHINE LEARNING", x: 5, y: 55, depth: 0.2, speed: 0.9, style: "muted", size: "sm" },
  { text: "UI/UX DESIGNER", x: 82, y: 50, depth: 0.4, speed: 0.6, style: "outlined", size: "md" },
  { text: "N.A.V.A", x: 12, y: 78, depth: 0.8, speed: 0.4, style: "filled", size: "lg" },
  { text: "XOLO", x: 88, y: 75, depth: 0.7, speed: 0.5, style: "filled", size: "lg" },
  { text: "VISIONARY BUILDER", x: 18, y: 38, depth: 0.15, speed: 1.0, style: "muted", size: "sm" },
  { text: "INNOVATOR", x: 78, y: 38, depth: 0.5, speed: 0.65, style: "outlined", size: "md" },
  { text: "FULL STACK", x: 60, y: 85, depth: 0.35, speed: 0.8, style: "muted", size: "sm" },
  { text: "NEXT GEN", x: 35, y: 12, depth: 0.25, speed: 0.75, style: "muted", size: "sm" },
];

function getStyleClasses(label: FloatingLabel) {
  const base = "font-display tracking-[0.3em] whitespace-nowrap select-none pointer-events-none";

  const sizes: Record<string, string> = {
    sm: "text-[9px] md:text-[10px]",
    md: "text-[10px] md:text-[12px]",
    lg: "text-[12px] md:text-[14px] font-bold",
  };

  const styles: Record<string, string> = {
    outlined: "text-transparent",
    filled: "text-white/15",
    accent: "text-[var(--accent-red)]/20",
    muted: "text-white/8",
  };

  return `${base} ${sizes[label.size]} ${styles[label.style]}`;
}

function getInlineStyle(label: FloatingLabel): React.CSSProperties {
  const blur = Math.max(0, (1 - label.depth) * 1.5);
  const scale = 0.7 + label.depth * 0.5;
  const opacity = 0.15 + label.depth * 0.35;

  const style: React.CSSProperties = {
    filter: blur > 0.3 ? `blur(${blur}px)` : "none",
    transform: `scale(${scale})`,
    opacity,
  };

  if (label.style === "outlined") {
    style.WebkitTextStroke = "0.5px rgba(255,255,255,0.15)";
    style.WebkitTextFillColor = "transparent";
  }

  return style;
}

export default function FloatingLabels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  // Mouse tracking for parallax
  const handleMouse = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  // Entrance animation + continuous float
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance
      labelsRef.current.forEach((el, i) => {
        if (!el) return;
        const label = LABELS[i];
        const delay = 4.5 + i * 0.15; // after hero intro

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: (Math.random() - 0.5) * 60,
            y: 20 + Math.random() * 20,
          },
          {
            opacity: getInlineStyle(label).opacity as number,
            x: 0,
            y: 0,
            duration: 1.2 + Math.random() * 0.6,
            delay,
            ease: "power3.out",
          }
        );

        // Continuous floating Y
        gsap.to(el, {
          y: `+=${8 + label.speed * 12}`,
          duration: 3 + label.speed * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 1 + Math.random() * 2,
        });

        // Subtle X drift
        gsap.to(el, {
          x: `+=${4 + Math.random() * 6}`,
          duration: 5 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 2 + Math.random() * 3,
        });

        // Opacity breathing
        gsap.to(el, {
          opacity: (getInlineStyle(label).opacity as number) * 0.5,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + Math.random() * 4,
        });
      });
    }, containerRef);

    // Mouse parallax RAF
    const updateParallax = () => {
      const mx = mouseRef.current.x - 0.5; // -0.5 to 0.5
      const my = mouseRef.current.y - 0.5;

      labelsRef.current.forEach((el, i) => {
        if (!el) return;
        const label = LABELS[i];
        const strength = label.depth * 25; // deeper = more parallax
        const tx = mx * strength;
        const ty = my * strength;

        el.style.translate = `${tx}px ${ty}px`;
      });

      rafRef.current = requestAnimationFrame(updateParallax);
    };
    rafRef.current = requestAnimationFrame(updateParallax);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      {LABELS.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => { labelsRef.current[i] = el; }}
          className={getStyleClasses(label)}
          style={{
            position: "absolute",
            left: `${label.x}%`,
            top: `${label.y}%`,
            opacity: 0,
            ...getInlineStyle(label),
            transition: "translate 0.3s ease-out",
          }}
        >
          {label.text}
        </div>
      ))}
    </div>
  );
}
