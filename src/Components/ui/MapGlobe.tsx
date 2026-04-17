import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

export default function MapGlobe({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const backgroundRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = (1 - progress) * 2;
    }

    if (backgroundRef.current) {
      backgroundRef.current.rotation.y += 0.0008;
      backgroundRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <>
      <group ref={backgroundRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      </group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8cff2e" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.5, 64, 64]} /> 
          <meshStandardMaterial 
            color="#8cff2e" 
            wireframe 
            transparent 
            opacity={0.3 * progress} 
          />
          
          <mesh position={[1.2, 0.5, 0.8]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#8cff2e" />
            <Html distanceFactor={8}>
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-[#8cff2e] rounded-full animate-ping" />
                <span className="text-[#8cff2e] text-[8px] font-bold whitespace-nowrap mt-1 uppercase tracking-widest">
                  Addis Ababa
                </span>
              </div>
            </Html>
          </mesh>

          <Sphere args={[1.4, 64, 64]}>
            <MeshDistortMaterial
              color="#051a16"
              speed={2}
              distort={0.2}
              radius={1}
            />
          </Sphere>
        </mesh>
      </Float>
    </>
  );
}