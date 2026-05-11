import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random positions
  const [positions, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in a large cylinder/tunnel shape
      const radius = 5 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 50; // Spread along Z (tunnel length)
      
      positions[i * 3] = Math.cos(theta) * radius;     // x
      positions[i * 3 + 1] = Math.sin(theta) * radius; // y
      positions[i * 3 + 2] = y;                        // z

      // Speed variance
      speeds[i] = 0.5 + Math.random() * 2;
    }
    
    return [positions, speeds];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Determine scroll velocity (basic approximation based on scrollY delta)
    // For a smoother effect, we can tie this to a global store, but simple constant movement is fine too.
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire particle system slowly
    pointsRef.current.rotation.z = time * 0.05;
    
    // Move particles towards camera
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Move along Z axis
      positions[i * 3 + 2] += speeds[i] * 0.1;
      
      // Reset if it passes the camera (z > 10)
      if (positions[i * 3 + 2] > 10) {
        positions[i * 3 + 2] = -40;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
