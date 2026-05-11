"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

import Particles from "./Particles";
import EnergyStreaks from "./EnergyStreaks";
import FloatingGeometry from "./FloatingGeometry";

function CameraController() {
  useFrame((state) => {
    // Add subtle cinematic floating effect to camera
    const time = state.clock.getElapsedTime();
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(time * 0.5) * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(time * 0.3) * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering Canvas only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <CameraController />
          
          {/* Lighting Environment */}
          <ambientLight intensity={0.2} />
          
          {/* Cinematic Red Spotlights */}
          <spotLight
            position={[10, 10, 10]}
            angle={0.5}
            penumbra={1}
            intensity={2}
            color="#e10600"
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.5}
            penumbra={1}
            intensity={2}
            color="#e10600"
          />

          <Environment preset="city" />

          {/* 3D Elements */}
          <Particles count={3000} />
          <EnergyStreaks count={6} />
          <FloatingGeometry count={20} />

          {/* Post-processing Pipeline */}
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
            <Noise opacity={0.03} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
