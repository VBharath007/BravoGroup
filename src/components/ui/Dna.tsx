import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { SplineScene } from "./spline"
import { Spotlight } from "./spotlight-aceternity"
import { Activity, Globe, CheckCircle2, PhoneCall, Award } from "lucide-react"

export default function HorizonHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smooth Spring Physics for "Expert" feel
    const springConfig = { damping: 40, stiffness: 120, mass: 1, restDelta: 0.001 }

    // --- ROBOT TRANSFORMS ---
    // Sequence: Right -> Left -> Right -> Center
    const robotXRaw = useTransform(scrollYProgress,
        [0, 0.2, 0.3, 0.45, 0.5, 0.7, 0.75, 1],
        ["30%", "30%", "-30%", "-30%", "30%", "30%", "0%", "0%"]
    )
    const robotX = useSpring(robotXRaw, springConfig)

    const robotScaleRaw = useTransform(scrollYProgress, [0, 0.5, 0.75, 1], [1, 1.1, 1.25, 1.05])
    const robotScale = useSpring(robotScaleRaw, springConfig)

    const robotRotationRaw = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 15, -15, 15, 0])
    const robotRotation = useSpring(robotRotationRaw, springConfig)

    // --- CONTENT OPACITY (P1: 0-20, P2: 25-45, P3: 50-70, P4: 75-100) ---
    const opacityP1 = useSpring(useTransform(scrollYProgress, [0, 0.18, 0.20], [1, 1, 0]), springConfig)
    const opacityP2 = useSpring(useTransform(scrollYProgress, [0.22, 0.25, 0.43, 0.45], [0, 1, 1, 0]), springConfig)
    const opacityP3 = useSpring(useTransform(scrollYProgress, [0.47, 0.50, 0.68, 0.70], [0, 1, 1, 0]), springConfig)
    const opacityP4 = useSpring(useTransform(scrollYProgress, [0.72, 0.75, 1], [0, 1, 1]), springConfig)

    // --- CONTENT MOVEMENT ---
    const xP1 = useSpring(useTransform(scrollYProgress, [0, 0.2], ["0%", "-20%"]), springConfig)
    const xP2 = useSpring(useTransform(scrollYProgress, [0.25, 0.45], ["20%", "0%"]), springConfig)
    const xP3 = useSpring(useTransform(scrollYProgress, [0.5, 0.7], ["0%", "-20%"]), springConfig)

    const countries = ["Uzbekistan", "Kyrgyzstan", "Kazakhstan", "Russia", "Georgia", "Philippines", "Tajikistan", "Vietnam"]

    return (
        <div ref={containerRef} className="h-[1200vh] bg-black relative mt-10">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Background Effects */}
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(47, 77, 255, 0.2)" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black pointer-events-none" />

                {/* --- PHASE 1: MISSION (Robot Right / Content Left) --- */}
                <motion.div
                    style={{ opacity: opacityP1, x: xP1 }}
                    className="absolute left-10 md:left-24 z-20 max-w-2xl text-left pointer-events-none"
                >
                    <div className="flex items-center gap-2 mb-6 text-blue-400">
                        <Activity className="w-6 h-6" />
                        <span className="text-sm font-black tracking-[0.3em] uppercase">Our Mission</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Empowering Every <br /><span className="text-blue-500">Medical Dream</span>
                    </h1>
                    <p className="text-neutral-300 text-lg leading-relaxed max-w-lg">
                        Guiding aspiring medical students toward studying MBBS abroad through transparent, ethical, and reliable counseling.
                    </p>
                </motion.div>

                {/* --- PHASE 2: VISION (Robot Left / Content Right) --- */}
                <motion.div
                    style={{ opacity: opacityP2, x: xP2 }}
                    className="absolute right-10 md:right-24 z-20 max-w-2xl text-right flex flex-col items-end pointer-events-none"
                >
                    <div className="flex items-center gap-2 mb-6 text-purple-400">
                        <span className="text-sm font-black tracking-[0.3em] uppercase">Our Vision</span>
                        <Globe className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Borderless Future <br /><span className="text-purple-500">for Medicine</span>
                    </h2>
                    <p className="text-neutral-300 text-lg leading-relaxed max-w-lg">
                        To become India's leading and most trusted educational consultancy for MBBS abroad admissions.
                    </p>
                </motion.div>

                {/* --- PHASE 3: ADMISSION (Robot Right / Content Left Cards) --- */}
                <motion.div
                    style={{ opacity: opacityP3, x: xP3 }}
                    className="absolute left-10 md:left-24 z-30 flex flex-col items-start justify-center p-6 mt-10"
                >
                    {/* Crystal Card Wrapper */}
                    <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-3xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 relative overflow-hidden group transition-all duration-700 hover:border-blue-500/30">
                        {/* Inner Shine Effect */}
                        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                            🎓 MBBS ADMISSION OPEN <span className="text-blue-500 italic">2026–2027</span>
                        </h4>
                        <p className="text-lg md:text-xl font-medium text-neutral-400 mb-10">
                            Study MBBS Abroad in <span className="text-blue-500">Top Countries</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-md">
                            {countries.map((country, i) => (
                                <motion.div
                                    key={country}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all group/item"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover/item:bg-blue-500/40 transition-colors">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-neutral-200 text-sm font-bold">{country}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-2 opacity-60">
                            <p className="text-neutral-300 italic text-sm">“Your dream starts with the right guidance.”</p>
                            <div className="flex gap-4 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-blue-500" /> Limited Seats</span>
                                <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-blue-500" /> Apply Now</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* --- PHASE 4: FINALE (Robot Center / Content Center) --- */}
                <motion.div
                    style={{ opacity: opacityP4 }}
                    className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center"
                >
                    <div className="max-w-4xl flex flex-col items-center space-y-6">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                            <Award className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em]">Trusted Since 2024 · Vellore · Tamil Nadu</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Study Abroad with the Most <br />
                            <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-4">Trusted Bravo Groups</span>
                        </h2>

                        <p className="text-neutral-400 max-w-2xl text-base md:text-lg leading-relaxed">
                            Expert guidance, affordable MBBS admissions, and end-to-end support trusted by <span className="text-white font-bold">100s of students</span>.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 pt-6">
                            <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base transition-all shadow-xl shadow-blue-500/30 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Get Free Counseling
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold text-base transition-all backdrop-blur-md">
                                View Universities
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* --- THE DOCTOR ROBOT MASCOT --- */}
                <motion.div
                    style={{
                        x: robotX,
                        scale: robotScale,
                        rotateY: robotRotation
                    }}
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-full h-full max-w-[1600px] flex items-center justify-center pointer-events-auto">
                        <SplineScene
                            //   scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" robert
                            scene="/assets/Dna.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
                </motion.div>

                {/* Improved Vertical Progress Tracker (Dynamic Mapping) */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-50">
                    {[0, 1, 2, 3].map((i) => (
                        <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} />
                    ))}

                    {/* Overall Progress Line */}
                    <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden rounded-full mt-2">
                        <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 bg-blue-500 origin-top shadow-[0_0_10px_#3b82f6]" />
                    </div>
                </div>

            </div>
        </div>
    )
}

// Separate component for progress dots to follow Rules of Hooks
function ProgressDot({ index, scrollYProgress }: { index: number; scrollYProgress: any }) {
    const start = index * 0.25
    const end = (index + 1) * 0.25

    const range = [
        Math.max(0, start - 0.01),
        start,
        end,
        Math.min(1, end + 0.01)
    ]

    const dotOpacity = useTransform(scrollYProgress, range, [1, 1, 1, 1])
    const dotScale = useTransform(scrollYProgress, range, [0.9, 1.25, 1.25, 0.9])
    const dotColor = useTransform(scrollYProgress, range, ["rgba(59, 130, 246, 0)", "rgba(30, 58, 138, 1)", "rgba(30, 58, 138, 1)", "rgba(59, 130, 246, 0)"])
    const dotBorder = useTransform(scrollYProgress, range, ["rgba(96, 165, 250, 0.4)", "rgba(30, 58, 138, 1)", "rgba(30, 58, 138, 1)", "rgba(96, 165, 250, 0.4)"])

    return (
        <motion.div
            style={{
                opacity: dotOpacity,
                scale: dotScale,
                backgroundColor: dotColor,
                borderColor: dotBorder
            }}
            className="w-2 h-10 rounded-full border-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0)]"
        />
    )
}