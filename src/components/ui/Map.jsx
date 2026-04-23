"use client";

import React from "react";
import { motion } from "framer-motion";

const countryMap = "/assets/mobile_hero_bg_2.webp";

/**
 * PURE CINEMATIC MAP
 * - All interactive elements (dots, paths, labels) removed.
 * - Clean, animated background map only.
 */
const WorldMap = () => {
    return (
        <div className="relative w-full h-full  flex items-center justify-center overflow-hidden">

            {/* 
          ANIMATED MAP CONTAINER 
          A slow cinematic pan from left to right.
      */}
            <motion.div
                className="relative w-[150%] h-full flex-shrink-0"
                animate={{
                    x: ["-15%", "5%", "-15%"]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* The World Map Image Asset */}
                <img
                    src={countryMap}
                    alt="Cinematic World Map"
                    className="absolute inset-0 w-full h-full object-fill object-bottom opacity-25 pointer-events-none select-none brightness-110 saturate-150"
                />
            </motion.div>

            {/* Decorative Vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,8,20,0.8)_100%)] pointer-events-none"></div>

            {/* Subtle Scanline Effect for Tech Feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

            {/* Modern Status HUD */}
            <div className="absolute top-10 left-10 p-4 border-l-2 border-[#00F2FF]/20 hidden md:block z-20">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse"></div>
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.5em] font-mono">Archive Display Mode</p>
                </div>
            </div>
        </div>
    );
};

export default WorldMap;
