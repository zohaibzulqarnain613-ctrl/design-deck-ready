"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { 
  SpotLight, 
  useDepthBuffer, 
  MeshReflectorMaterial, 
  PerspectiveCamera,
  Float,
  Text,
  Environment
} from "@react-three/drei";
import { cn } from "@/lib/utils";
import * as THREE from "three";

const METAL_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")';

function Scene({ lightsOn, lightColor, spots }: { lightsOn: boolean, lightColor: string, spots: number[] }) {
  const depthBuffer = useDepthBuffer();
  
  return (
    <>
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      
      {/* Lights */}
      {spots.map((x, i) => (
        <MovingSpot 
          key={i} 
          position={[((x - 50) / 10), 8, 0]} 
          color={lightColor} 
          lightsOn={lightsOn} 
          depthBuffer={depthBuffer} 
        />
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -5]}>
        <planeGeometry args={[50, 10]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </>
  );
}

function MovingSpot({ position, color, lightsOn, depthBuffer, ...props }: any) {
  const light = React.useRef<THREE.SpotLight>(null!);
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
        distance={20}
        angle={0.35}
        attenuation={5}
        anglePower={4}
        intensity={lightsOn ? 10 : 0}
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

  useEffect(() => {
    let mounted = true;
    const runFlicker = async () => {
      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
      await sleep(600);
      if (!mounted) return;
      setLightsOn(true);
      await sleep(100);
      setLightsOn(false);
      await sleep(300);
      setLightsOn(true);
      await sleep(50);
      setLightsOn(false);
      await sleep(200);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(60);
      setLightsOn(true);
      await sleep(40);
      setLightsOn(false);
      await sleep(400);
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);
    };
    runFlicker();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={cn("relative w-full h-[600px] md:h-[800px] overflow-hidden rounded-3xl bg-[#030303]", className)}>
      <Canvas shadows dpr={[1, 2]}>
        <Scene lightsOn={lightsOn} lightColor="#e6f0ff" spots={[35, 50, 65]} />
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)`
        }}
      />
    </div>
  );
};
