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
      <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={50} />
      
      {/* Lights positioned strictly at the top */}
      {spots.map((x, i) => (
        <MovingSpot 
          key={i} 
          position={[((x - 50) / 4), 12, -2]} 
          color={lightColor} 
          lightsOn={lightsOn} 
          depthBuffer={depthBuffer} 
        />
      ))}

      {/* Floor - darkened and lowered to focus on light beams */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
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
          color="#020202"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 10, -10]}>
        <planeGeometry args={[100, 30]} />
        <meshStandardMaterial color="#000000" roughness={1} />
      </mesh>
    </>
  );
}

function MovingSpot({ position, color, lightsOn, depthBuffer, ...props }: any) {
  const light = useRef<THREE.SpotLight>(null!);
  const [target] = useState(() => new THREE.Object3D());
  
  useEffect(() => {
    // Pointing straight down or slightly forward
    target.position.set(position[0], -5, position[2]);
  }, [position, target]);

  return (
    <group {...props}>
      <primitive object={target} />
      <SpotLight
        ref={light}
        castShadow
        penumbra={0.5}
        distance={45}
        angle={0.35}
        attenuation={8}
        anglePower={4}
        intensity={lightsOn ? 150 : 0}
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
    <div className={cn("relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl bg-[#000000] shadow-2xl border border-white/5 flex items-center justify-center", className)}>
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#000000]" />}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 50 }}>
              <Scene lightsOn={lightsOn} lightColor="#ffffff" spots={[20, 40, 60, 80]} />
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
