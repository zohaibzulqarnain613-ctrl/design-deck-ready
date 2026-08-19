"use client";

import React, { useMemo, useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  SpotLight, 
  useDepthBuffer, 
  MeshReflectorMaterial, 
  PerspectiveCamera,
  Environment,
  ContactShadows
} from "@react-three/drei";
import { cn } from "@/lib/utils";
import * as THREE from "three";

function Scene({ lightsOn, lightColor, spots }: { lightsOn: boolean, lightColor: string, spots: number[] }) {
  const depthBuffer = useDepthBuffer();
  
  return (
    <>
      <color attach="background" args={["#030303"]} />
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />
      
      {/* Lights */}
      {spots.map((x, i) => (
        <MovingSpot 
          key={i} 
          position={[((x - 50) / 8), 10, 0]} 
          color={lightColor} 
          lightsOn={lightsOn} 
          depthBuffer={depthBuffer} 
        />
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={60}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0.8}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 10, -10]}>
        <planeGeometry args={[100, 30]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
    </>
  );
}

function MovingSpot({ position, color, lightsOn, depthBuffer, ...props }: any) {
  const light = useRef<THREE.SpotLight>(null!);
  const [target] = useState(() => new THREE.Object3D());
  
  useEffect(() => {
    target.position.set(position[0], 0, 0);
  }, [position, target]);

  return (
    <group {...props}>
      <primitive object={target} />
      <SpotLight
        ref={light}
        castShadow
        penumbra={1}
        distance={30}
        angle={0.4}
        attenuation={5}
        anglePower={5}
        intensity={lightsOn ? 100 : 0}
        color={color}
        position={position}
        target={target}
        depthBuffer={depthBuffer}
      />
    </group>
  );
}

export const VolumetricStudio = ({ 
  className,
  children
}: { 
  className?: string;
  children?: React.ReactNode;
}) => {
  const [lightsOn, setLightsOn] = useState(false);
  const [isFlickering, setIsFlickering] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let mounted = true;
    const runFlicker = async () => {
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
      await sleep(800);
      if (!mounted) return;
      
      const flicker = async (duration: number) => {
        setLightsOn(true);
        await sleep(duration);
        setLightsOn(false);
        await sleep(duration * 2);
      };

      await flicker(50);
      await flicker(30);
      await flicker(80);
      await flicker(40);
      
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);
    };
    runFlicker();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={cn("relative w-full h-[600px] md:h-[800px] overflow-hidden rounded-3xl bg-[#030303] shadow-2xl border border-white/5 flex items-center justify-center", className)}>
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#030303]" />}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3, 10], fov: 50 }}>
              <Scene lightsOn={lightsOn} lightColor="#e6f0ff" spots={[30, 50, 70]} />
            </Canvas>
          </Suspense>
        </div>
      )}
      
      {/* Overlay Content */}
      <div className="relative z-50 flex items-center justify-center p-6 text-center w-full h-full pointer-events-none">
        <div className="pointer-events-auto w-full">
          {children}
        </div>
      </div>

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.7) 100%)`
        }}
      />
      
      {/* Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
