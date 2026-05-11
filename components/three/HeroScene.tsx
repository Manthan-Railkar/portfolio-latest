"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FloatingParticles from "./FloatingParticles";
import Effects from "./Effects";

function CentralObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.08;
      wireRef.current.rotation.y = -time * 0.12;
    }
  });

  return (
    <group>
      {/* Solid metallic object */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#e10600"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  const spotRef = useRef<THREE.SpotLight>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (spotRef.current) {
      spotRef.current.position.x = Math.sin(time * 0.3) * 5;
      spotRef.current.position.z = Math.cos(time * 0.3) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      {/* Main red dramatic light */}
      <spotLight
        ref={spotRef}
        color="#e10600"
        intensity={40}
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        decay={2}
        distance={30}
      />
      {/* Back rim light */}
      <pointLight
        color="#ff1801"
        intensity={8}
        position={[-4, 3, -5]}
        decay={2}
        distance={20}
      />
      {/* Cool fill light */}
      <pointLight
        color="#ffffff"
        intensity={2}
        position={[3, -2, 4]}
        decay={2}
        distance={15}
      />
      {/* Bottom red glow */}
      <pointLight
        color="#e10600"
        intensity={3}
        position={[0, -5, 0]}
        decay={2}
        distance={15}
      />
    </>
  );
}

function Scene() {
  return (
    <>
      <Lights />
      <CentralObject />
      <FloatingParticles count={1200} />
      <fog attach="fog" args={["#050505", 5, 25]} />
      <Effects />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
