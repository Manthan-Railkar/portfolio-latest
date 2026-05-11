import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-compute curved paths for the streaks
function createCurve(offset: number) {
  const points = [];
  for (let i = 0; i <= 20; i++) {
    const x = Math.sin(i * 0.5 + offset) * 15;
    const y = Math.cos(i * 0.3 + offset) * 10;
    const z = -40 + i * 3; // From deep background to foreground
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

export default function EnergyStreaks({ count = 5 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const curves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => createCurve(i * Math.PI * 2 / count));
  }, [count]);

  const materials = useMemo(() => {
    return curves.map(() => 
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e10600"), // Accent red
        emissive: new THREE.Color("#e10600"),
        emissiveIntensity: 5,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
  }, [curves]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate and undulate the entire group of streaks
    groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.5;
    groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.2;
    
    // Pulsate the emissive intensity
    materials.forEach((mat, i) => {
      mat.emissiveIntensity = 2 + Math.sin(time * 2 + i) * 3;
    });
  });

  return (
    <group ref={groupRef}>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 64, 0.1, 8, false]} />
          <primitive object={materials[index]} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
