import type { Metadata } from "next";
import { Orbitron, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Scene from "@/components/3d/Scene";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Manthan Railkar | Creative Developer Portfolio",
  description:
    "A premium cinematic portfolio experience. Full Stack Developer & Creative Technologist building immersive digital experiences with Next.js, Three.js, and cutting-edge web technologies.",
  keywords: [
    "portfolio",
    "developer",
    "creative",
    "full stack",
    "Next.js",
    "Three.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Manthan Railkar" }],
  openGraph: {
    title: "Manthan Railkar | Creative Developer Portfolio",
    description:
      "A premium cinematic portfolio experience inspired by F1 broadcast graphics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${dancingScript.variable}`}
    >
      <body className="font-body relative">
        <Scene />
        <SmoothScroll>
          {/* Scanline overlay */}
          <div className="scanline-overlay pointer-events-none" />
          {/* Film grain */}
          <div className="film-grain pointer-events-none" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
