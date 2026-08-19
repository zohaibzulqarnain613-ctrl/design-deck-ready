"use client";
import React, { useMemo, useState } from "react";
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
  lightColor = "230,240,255",
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
    <div className={cn("relative w-full h-full bg-[#030303] overflow-hidden", className)}>
      {/* Back Wall */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a0a] border-b border-white/5"
        initial={false}
        animate={{ 
          clipPath: poly([tl, tr, br, bl]),
          opacity: lightsOn ? 1 : 0.2
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Floor */}
      <motion.div
        className="absolute inset-0 bg-[#050505]"
        style={{ backgroundImage: METAL_NOISE, backgroundSize: '150px' }}
        initial={false}
        animate={{ 
          clipPath: poly([bl, br, [100, 100], [0, 100]]),
          opacity: lightsOn ? 1 : 0.3
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Left Wall */}
      <motion.div
        className="absolute inset-0 bg-[#080808]"
        initial={false}
        animate={{ 
          clipPath: poly([[0, 0], tl, bl, [0, 100]]),
          opacity: lightsOn ? 1 : 0.2
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Right Wall */}
      <motion.div
        className="absolute inset-0 bg-[#080808]"
        initial={false}
        animate={{ 
          clipPath: poly([tr, [100, 0], [100, 100], br]),
          opacity: lightsOn ? 1 : 0.2
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Ceiling */}
      <motion.div
        className="absolute inset-0 bg-[#0c0c0c]"
        initial={false}
        animate={{ 
          clipPath: poly([[0, 0], [100, 0], tr, tl]),
          opacity: lightsOn ? 1 : 0.2
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Volumetric Lights Container */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full overflow-visible">
          <defs>
            {spots.map((x, i) => (
              <linearGradient key={i} id={`beam-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={`rgb(${lightColor})`} stopOpacity={0.2 * intensity} />
                <stop offset="50%" stopColor={`rgb(${lightColor})`} stopOpacity={0.05 * intensity} />
                <stop offset="100%" stopColor={`rgb(${lightColor})`} stopOpacity="0" />
              </linearGradient>
            ))}
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {spots.map((x, i) => (
            <motion.path
              key={i}
              initial={false}
              animate={{
                d: `M ${x} 0 L ${x - 15} 100 L ${x + 15} 100 Z`,
                opacity: lightsOn ? (isFlickering ? [0.4, 0.7, 0.5] : 0.6) : 0,
                scaleX: isFlickering ? [1, 1.05, 0.98] : 1
              }}
              transition={{ 
                duration: isFlickering ? 0.1 : 0.8,
                repeat: isFlickering ? Infinity : 0
              }}
              fill={`url(#beam-${i})`}
              filter="url(#glow)"
              style={{ transformOrigin: `${x}% 0%` }}
            />
          ))}
        </svg>
      </div>

      {/* Ambient Floor Glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: lightsOn ? 1 : 0 }}
        style={{
          background: spots.map(x => `radial-gradient(ellipse 25% 40% at ${x}% 68%, rgba(${lightColor},0.15) 0%, transparent 70%)`).join(", ")
        }} 
      />

      {/* Subtle Floor Highlights */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        animate={{ opacity: lightsOn ? 0.4 : 0 }}
        style={{
          background: spots.map(x => `radial-gradient(ellipse 35% 30% at ${x}% 80%, rgba(${lightColor},0.06) 0%, transparent 60%)`).join(", ")
        }} 
      />

      {/* Light Sources (Spotlights on ceiling) */}
      <div className="absolute top-0 left-0 w-full h-4 flex justify-around px-[20%] z-20">
        {spots.map((pos, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <motion.div 
              className="w-12 h-1.5 bg-white/10 rounded-full blur-[1px]"
              animate={{ 
                backgroundColor: lightsOn ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                boxShadow: lightsOn ? `0 0 20px rgba(${lightColor}, 0.4)` : "none"
              }}
            />
            <motion.div 
              className="w-4 h-4 rounded-full -mt-1 bg-white blur-md"
              animate={{ opacity: lightsOn ? [0.4, 0.6, 0.4] : 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        ))}
      </div>

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, transparent 20%, rgba(0,0,0,${vignette}) 90%)`
        }}
      />

      {/* Grain Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_NOISE }}
      />
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

  React.useEffect(() => {
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
    <div className={cn("relative w-full h-[600px] md:h-[800px] overflow-hidden rounded-3xl", className)}>
      <Room lightsOn={lightsOn} isFlickering={isFlickering} />
      
      <div className="absolute inset-0 z-30 flex items-center justify-center p-6 text-center">
        {children}
      </div>
    </div>
  );
};
