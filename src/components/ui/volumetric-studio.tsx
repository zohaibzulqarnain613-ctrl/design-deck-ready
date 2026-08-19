"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const METAL_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")';
const GRAIN_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E")';

type RoomProps = {
  backWall?: { tl: [number, number]; tr: [number, number]; br: [number, number]; bl: [number, number] };
  lightsOn?: boolean;
  intensity?: number;
  lightColor?: string;
  spots?: number[];
  vignette?: number;
  isFlickering?: boolean;
  className?: string;
};

function Room({
  backWall = {
    tl: [22, 10],
    tr: [78, 10],
    br: [78, 70],
    bl: [22, 70],
  },
  lightsOn = true,
  intensity = 1,
  lightColor = "255,255,255", // Neutral white for high impact
  spots = [35, 50, 65],
  vignette = 0.55,
  isFlickering = false,
  className = "",
}: RoomProps) {
  const { tl, tr, br, bl } = backWall;
  
  const poly = useMemo(
    () => (pts: readonly (readonly [number, number])[]) =>
      `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
    []
  );

  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div className={cn("absolute inset-0 bg-black overflow-hidden", className)}>
      {/* 1. Floor Base */}
      <div 
        className="absolute inset-0 bg-neutral-900"
        style={{ clipPath: poly([[0, 70], [100, 70], [100, 100], [0, 100]]) }}
      />

      {/* 2. Side Walls */}
      <div 
        className="absolute inset-0 bg-neutral-950 shadow-inner"
        style={{ 
          clipPath: poly([[0, 0], [tl[0], tl[1]], [bl[0], bl[1]], [0, 100]]),
          backgroundImage: METAL_NOISE,
          opacity: 0.4
        }}
      />
      <div 
        className="absolute inset-0 bg-neutral-950 shadow-inner"
        style={{ 
          clipPath: poly([[100, 0], [100, 100], [br[0], br[1]], [tr[0], tr[1]]]),
          backgroundImage: METAL_NOISE,
          opacity: 0.4
        }}
      />

      {/* 3. Ceiling */}
      <div 
        className="absolute inset-0 bg-neutral-950"
        style={{ 
          clipPath: poly([[0, 0], [100, 0], [tr[0], tr[1]], [tl[0], tl[1]]]),
          backgroundImage: METAL_NOISE,
          opacity: 0.5
        }}
      />

      {/* 4. Back Wall - The Stage */}
      <div 
        className="absolute inset-0 bg-neutral-900 shadow-2xl"
        style={{ clipPath: poly([[tl[0], tl[1]], [tr[0], tr[1]], [br[0], br[1]], [bl[0], bl[1]]]) }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: METAL_NOISE }} />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      </div>

      {/* 5. Volumetric Beams Container */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden">
        {spots.map((x, i) => (
          <motion.div
            key={`beam-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: lightsOn ? (isFlickering ? [0, 1, 0.5, 1, 0.8, 1] : 1) : 0 
            }}
            transition={{ 
              duration: isFlickering ? 0.3 : 0.8,
              ease: "easeOut"
            }}
            className="absolute top-0 w-[40%] h-[150%] origin-top opacity-30"
            style={{
              left: `${x}%`,
              transform: `translateX(-50%) rotate(${(x - 50) * 0.4}deg)`,
              background: `linear-gradient(to bottom, rgba(${lightColor}, ${0.4 * intensity}) 0%, rgba(${lightColor}, ${0.1 * intensity}) 40%, transparent 80%)`,
              clipPath: `polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)`
            }}
          />
        ))}
      </div>

      {/* 6. Floor Glow (Spotlight hits) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: spots.map(x => `radial-gradient(ellipse 20% 10% at ${x}% 85%, rgba(${lightColor},${0.15 * intensity}) 0%, transparent 80%)`).join(", ")
        }} 
      />

      {/* 7. Vignette for depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,${vignette}) 100%)`
        }}
      />

      {/* 8. Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: GRAIN_NOISE }} />
    </div>
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
      
      // Dramatic Flicker Sequence
      setLightsOn(true); await sleep(80); setLightsOn(false); await sleep(200);
      setLightsOn(true); await sleep(40); setLightsOn(false); await sleep(100);
      setLightsOn(true); await sleep(30); setLightsOn(false); await sleep(50);
      setLightsOn(true); await sleep(150); setLightsOn(false); await sleep(300);
      
      if (!mounted) return;
      setIsFlickering(false);
      setLightsOn(true);
    };
    runFlicker();
    return () => { mounted = false; };
  }, []);

  return (
    <div className={cn("relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl bg-black shadow-2xl border border-white/5", className)}>
      <Room 
        lightsOn={lightsOn} 
        isFlickering={isFlickering}
        className="z-0"
      />
      
      {/* Content Container */}
      <div className="relative z-50 flex items-center justify-center p-6 text-center w-full h-full">
        {children}
      </div>
    </div>
  );
};
