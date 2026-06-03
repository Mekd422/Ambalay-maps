import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
  Html,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../context/useTheme'

export default function MapGlobe({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const backgroundRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = (1 - progress) * 2
    }

    if (backgroundRef.current) {
      backgroundRef.current.rotation.y += 0.0008
      backgroundRef.current.rotation.x += 0.0002
    }
  })

  return (
    <>
      <group ref={backgroundRef}>
        <Stars
          radius={100}
          depth={50}
          count={isDark ? 5000 : 800}
          factor={isDark ? 4 : 1}
          saturation={isDark ? 0 : 0.2}
          fade
          speed={0.5}
        />
      </group>
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={isDark ? '#8cff2e' : '#2563eb'} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color={isDark ? '#8cff2e' : '#2563eb'}
            wireframe
            transparent
            opacity={0.3 * progress}
          />

          <mesh position={[1.2, 0.5, 0.8]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#8cff2e" />
            <Html distanceFactor={8}>
              <div className="flex flex-col items-center">
                  <div className={`h-2 w-2 animate-ping rounded-full ${isDark ? 'bg-[#8cff2e]' : 'bg-[#2563eb]'}`} />
                  <span className={`mt-1 whitespace-nowrap text-[8px] font-bold uppercase tracking-widest ${isDark ? 'text-[#8cff2e]' : 'text-black'}`}>
                    Addis Ababa
                  </span>
                </div>
            </Html>
          </mesh>

          <Sphere args={[1.4, 64, 64]}>
            <MeshDistortMaterial
              color={isDark ? '#051a16' : '#e6f2ff'}
              speed={2}
              distort={0.2}
              radius={1}
            />
          </Sphere>
        </mesh>
      </Float>
    </>
  )
}
