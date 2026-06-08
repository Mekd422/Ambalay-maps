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

export default function MapGlobe({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const backgroundRef = useRef<THREE.Group>(null)
  const globeColor = '#8cff2e'
  const globeAura = '#051a16'

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
      <color attach="background" args={['#000000']} />
      <group ref={backgroundRef}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={globeColor} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial
            color={globeColor}
            wireframe
            transparent
            opacity={0.3 * progress}
          />

          <mesh position={[1.2, 0.5, 0.8]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#8cff2e" />
            <Html distanceFactor={8}>
              <div className="flex flex-col items-center">
                  <div
                    className="h-2 w-2 animate-ping rounded-full"
                    style={{ backgroundColor: globeColor }}
                  />
                  <span className="mt-1 whitespace-nowrap text-[8px] font-bold uppercase tracking-widest text-[#8cff2e]">
                    Addis Ababa
                  </span>
                </div>
            </Html>
          </mesh>

          <Sphere args={[1.4, 64, 64]}>
            <MeshDistortMaterial
              color={globeAura}
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
