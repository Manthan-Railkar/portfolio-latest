import type { Metadata } from "next";
import { Inter, Orbitron, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: "Cinematic Portfolio | Manthan Railkar",
  description: "A premium luxury motorsport aesthetic portfolio inspired by F1 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${dancingScript.variable} antialiased bg-background text-white selection:bg-primary selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
