"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingParticles({ count = 1500 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread particles in a large sphere
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Red and white particles
      const isRed = Math.random() > 0.7;
      colors[i * 3] = isRed ? 0.88 : 0.8;
      colors[i * 3 + 1] = isRed ? 0.02 : 0.8;
      colors[i * 3 + 2] = isRed ? 0 : 0.8;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.rotation.y = time * 0.02;
      mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;

      // Subtle floating motion
      const positions = mesh.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.01) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }

    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 3;
      light.current.position.z = Math.cos(time * 0.5) * 3;
    }
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <pointLight
        ref={light}
        color="#e10600"
        intensity={2}
        distance={20}
        decay={2}
      />
    </>
  );
}
