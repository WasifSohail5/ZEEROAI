"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Stars } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  )
}

function GlowingSphere({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.getElapsedTime() * 2) * 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.015
      points.current.rotation.x = state.clock.getElapsedTime() * 0.008
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#3b82f6"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingRing({ position, rotation, scale, color }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <mesh ref={ringRef} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[1, 0.03, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  const spheres = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      const t = i * 0.35
      const x1 = Math.cos(t) * 1.5
      const z1 = Math.sin(t) * 1.5
      const x2 = Math.cos(t + Math.PI) * 1.5
      const z2 = Math.sin(t + Math.PI) * 1.5
      const y = i * 0.35 - 3.5
      items.push({ pos1: [x1, y, z1] as [number, number, number], pos2: [x2, y, z2] as [number, number, number], key: i })
    }
    return items
  }, [])

  return (
    <group ref={groupRef} position={[6, 0, -8]}>
      {spheres.map((item) => (
        <group key={item.key}>
          <mesh position={item.pos1}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={item.pos2}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#1d4ed8" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#60a5fa" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.8} />
      
      <ParticleField />
      
      <AnimatedSphere position={[-5, 2, -6]} scale={2.5} color="#3b82f6" />
      <AnimatedSphere position={[6, -2, -10]} scale={3.5} color="#1d4ed8" />
      <AnimatedSphere position={[-2, 4, -12]} scale={2} color="#60a5fa" />
      
      <GlowingSphere position={[-8, -3, -8]} scale={1.2} color="#3b82f6" />
      <GlowingSphere position={[8, 4, -15]} scale={1.8} color="#2563eb" />
      
      <FloatingRing position={[-4, -2, -7]} rotation={[Math.PI / 4, 0, 0]} scale={1.8} color="#3b82f6" />
      <FloatingRing position={[5, 3, -9]} rotation={[0, Math.PI / 3, Math.PI / 6]} scale={2.2} color="#60a5fa" />
      <FloatingRing position={[0, 0, -15]} rotation={[Math.PI / 6, Math.PI / 4, 0]} scale={4} color="#1d4ed8" />
      
      <DNAHelix />
    </>
  )
}

function Fallback() {
  return null
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#071326]">
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
