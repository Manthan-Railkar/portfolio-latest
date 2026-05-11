'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Environment,
  Lightformer
} from '@react-three/drei'
import { 
  Bloom, 
  EffectComposer, 
  Noise, 
  Scanline, 
  Vignette, 
  ChromaticAberration 
} from '@react-three/postprocessing'
import * as THREE from 'three'
import { Vector2 } from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function MovingLights() {
  const group = useRef<THREE.Group>(null!)
  const lightRef = useRef<THREE.SpotLight>(null!)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.1
    group.current.rotation.x = t * 0.05
  })

  useEffect(() => {
    if (!lightRef.current) return
    gsap.to(lightRef.current, {
      intensity: 20,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    })
  }, [])

  return (
    <group ref={group}>
      <spotLight ref={lightRef} position={[10, 10, 10]} intensity={10} color="#ff0000" distance={20} angle={0.5} penumbra={1} />
      <spotLight position={[-10, -10, -10]} intensity={5} color="#440000" distance={20} angle={0.5} penumbra={1} />
    </group>
  )
}

function Particles({ count = 1500 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20
      p[i * 3 + 1] = (Math.random() - 0.5) * 20
      p[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return p
  }, [count])

  const ref = useRef<THREE.Points>(null!)
  
  useFrame((state) => {
    const velocity = typeof window !== 'undefined' ? ScrollTrigger.getVelocity() / 1000 : 0
    ref.current.rotation.y += (0.002 + Math.abs(velocity) * 0.05)
    ref.current.rotation.x += velocity * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ff0000" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function CameraController() {
  useFrame((state) => {
    const scroll = typeof window !== 'undefined' ? (ScrollTrigger.getAll()[0]?.progress || 0) : 0
    state.camera.position.z = 5 + scroll * 2
    state.camera.position.y = -scroll * 1
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

export default function CinematicBackground() {
  const offset = useMemo(() => new Vector2(0.001, 0.001), [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={['#010101']} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <CameraController />
        
        <ambientLight intensity={0.1} />
        <MovingLights />
        <Particles />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshDistortMaterial
              color="#0a0a0a"
              roughness={0}
              metalness={1}
              distort={0.4}
              speed={2}
            />
          </mesh>
        </Float>

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -1]} scale={[10, 1, 1]} />
            <Lightformer intensity={10} color="red" rotation-x={Math.PI / 2} position={[0, 5, 2]} scale={[10, 1, 1]} />
          </group>
        </Environment>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
          <ChromaticAberration offset={offset} radialModulation={false} modulationOffset={0} />
          <Noise opacity={0.06} />
          <Scanline opacity={0.08} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
