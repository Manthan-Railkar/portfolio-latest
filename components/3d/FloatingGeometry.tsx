import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function FloatingGeometry({ count = 15 }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random data for geometries
  const geometriesData = useMemo(() => {
    return Array.from({ length: count }, () => {
      // 50% rings, 50% shards (tetrahedrons/icosahedrons)
      const type = Math.random() > 0.5 ? "ring" : "shard";
      
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30, // x
        (Math.random() - 0.5) * 20, // y
        -5 - Math.random() * 30      // z (background to midground)
      );
      
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const scale = 0.5 + Math.random() * 2;
      
      return { type, position, rotation, scale };
    });
  }, [count]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1,
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow global rotation for the entire field of objects
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.2;
    groupRef.current.rotation.x = Math.cos(time * 0.05) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {geometriesData.map((data, index) => (
        <Float 
          key={index}
          speed={1 + Math.random() * 2} // Animation speed
          rotationIntensity={1 + Math.random()} // XYZ rotation intensity
          floatIntensity={1 + Math.random() * 2} // Up/down float intensity
          position={data.position}
        >
          <mesh rotation={data.rotation} scale={data.scale} material={material}>
            {data.type === "ring" ? (
              <torusGeometry args={[1, 0.05, 16, 100]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
          </mesh>
        </Float>
      ))}
    </group>
  );
}
