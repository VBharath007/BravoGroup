'use client'

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const logo = "/assets/bgremovedlogo-small.webp";

// ─── Constants ────────────────────────────────────────────────────────────────
const FRAME_COUNT = 44;
const AUTO_SPEED = 0.8;   // px per RAF frame at 60fps
const INERTIA = 0.085; // lerp factor — punchier feel
const RESUME_DELAY = 5000;  // ms before autoplay resumes after user scroll

const countries = [
  "Uzbekistan", "Kyrgyzstan", "Kazakhstan", "Russia",
  "Georgia", "Philippines", "Tajikistan", "Vietnam",
];

// Progress 0–1 → frame index
const p2f = (p: number) => p * (FRAME_COUNT - 1);

// Phase visibility: returns opacity 0–1 given current progress
function phaseOpacity(progress: number, inS: number, inE: number, outS: number, outE: number) {
  if (progress < inS) return 0;
  if (progress < inE) return (progress - inS) / (inE - inS);
  if (progress < outS) return 1;
  if (progress < outE) return 1 - (progress - outS) / (outE - outS);
  return 0;
}

// Phase x offset — gives parallax slide feel
function phaseX(progress: number, inS: number, inE: number, outS: number, outE: number, dir: number) {
  if (progress < inS) return dir * 60;
  if (progress < inE) return dir * 60 * (1 - (progress - inS) / (inE - inS));
  if (progress < outS) return 0;
  if (progress < outE) return dir * -40 * ((progress - outS) / (outE - outS));
  return dir * -40;
}

// Phase definitions in progress space 0–1
const PHASES = [
  { label: "Mission", color: "#3b82f6", inS: 0.00, inE: 0.00, outS: 0.18, outE: 0.28, dir: -1 },
  { label: "Vision", color: "#8b5cf6", inS: 0.30, inE: 0.44, outS: 0.48, outE: 0.58, dir: 1 },
  { label: "Admission", color: "#3b82f6", inS: 0.60, inE: 0.72, outS: 0.76, outE: 0.84, dir: -1 },
  { label: "Finale", color: "#22c55e", inS: 0.86, inE: 0.94, outS: 0.99, outE: 1.00, dir: 0 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function FrameInjection() {
  const navigate = useNavigate();

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const admissionRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const overlayRefs = [missionRef, visionRef, admissionRef, finaleRef];

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const isReady = loadedCount >= FRAME_COUNT;

  // ── Preload ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const list: HTMLImageElement[] = [];
    let done = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frameinjection/video_in_${String(i).padStart(3, "0")}.webp`;
      const fin = () => { done++; setLoadedCount(done); };
      img.onload = fin;
      img.onerror = fin;
      list.push(img);
    }
    setImages(list);
  }, []);

  // ── Main engine ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const section = sectionRef.current!;
    const pinned = pinnedRef.current!;

    // ── Canvas draw ──
    let lastIdx = -1;
    const draw = (rawIdx: number) => {
      const idx = Math.min(Math.max(Math.round(rawIdx), 0), FRAME_COUNT - 1);
      if (idx === lastIdx) return;
      lastIdx = idx;
      const img = images[idx];
      if (!img?.complete || !img.naturalWidth) return;
      const dpi = window.devicePixelRatio || 1;
      const W = window.innerWidth, H = window.innerHeight;
      const tW = Math.round(W * dpi), tH = Math.round(H * dpi);
      if (canvas.width !== tW || canvas.height !== tH) {
        canvas.width = tW; canvas.height = tH;
        ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
      }
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
        (W - dw) / 2, (H - dh) / 2, dw, dh);
    };
    draw(0);

    // ── Scroll engine ──
    // We do NOT use GSAP ScrollTrigger pin.
    // Instead: section is tall (600vh), pinned panel is sticky via CSS.
    // We read window.scrollY ourselves for full control.
    pinned.style.position = "sticky";
    pinned.style.top = "0px";

    let SECTION_TOP = section.offsetTop;
    let SECTION_H = section.scrollHeight;
    let VH = window.innerHeight;
    let MAX_SCROLL = SECTION_H - VH;

    // Smooth progress — raw from scroll, lerped for rendering
    let rawProgress = 0;
    let smoothProgress = 0;

    // Autoplay
    let autoPlaying = true;
    let autoPos = 0; // virtual scroll px
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    // Overlay update — pure DOM, no GSAP needed
    const updateOverlays = (p: number) => {
      PHASES.forEach((ph, i) => {
        const ref = overlayRefs[i].current;
        if (!ref) return;

        // Finale (last phase) — once shown, never hide
        const isFinale = i === PHASES.length - 1;
        const op = isFinale
          ? Math.min((p - ph.inS) / (ph.inE - ph.inS + 0.001), 1)
          : phaseOpacity(p, ph.inS, ph.inE, ph.outS, ph.outE);

        const clampedOp = Math.min(Math.max(op, 0), 1);
        const tx = ph.dir === 0
          ? 0
          : phaseX(p, ph.inS, ph.inE, ph.outS, ph.outE, ph.dir);
        const ty = ph.dir === 0
          ? (1 - Math.min((p - ph.inS) / (ph.inE - ph.inS + 0.001), 1)) * 40
          : 0;

        ref.style.opacity = String(clampedOp);
        ref.style.transform = `translate3d(${tx}px, ${Math.max(ty, 0)}px, 0)`;
        ref.style.pointerEvents = clampedOp > 0.1 ? "auto" : "none";
      });

      // Progress bar
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${p * 100}%`;

      // Scroll hint fade
      if (p > 0.02 && scrollHintRef.current)
        scrollHintRef.current.style.opacity = "0";

      // Pill
      if (pillRef.current) {
        const TRACK_H = 220, PILL_H = 52;
        pillRef.current.style.top = `${p * (TRACK_H - PILL_H)}px`;
      }
    };

    // ── RAF loop ──
    let rafId = 0;
    const tick = () => {
      // 1. Autoplay advances virtual position
      if (autoPlaying && autoPos < MAX_SCROLL) {
        autoPos = Math.min(autoPos + AUTO_SPEED, MAX_SCROLL);
        window.scrollTo(0, SECTION_TOP + autoPos);
      }

      // 2. Read real scroll
      const scrolled = window.scrollY - SECTION_TOP;
      rawProgress = Math.min(Math.max(scrolled / MAX_SCROLL, 0), 1);

      // 3. Inertia lerp — the magic: no stickiness, pure fluid
      smoothProgress += (rawProgress - smoothProgress) * INERTIA;

      // 4. Update canvas
      draw(p2f(smoothProgress));

      // 5. Update overlays & UI
      updateOverlays(smoothProgress);

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── User scroll → pause autoplay, sync autoPos ──
    const onScroll = () => {
      const scrolled = window.scrollY - SECTION_TOP;
      autoPos = Math.min(Math.max(scrolled, 0), MAX_SCROLL);

      autoPlaying = false;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { autoPlaying = true; }, RESUME_DELAY);
    };

    // ── Resize ──
    const onResize = () => {
      SECTION_TOP = section.offsetTop;
      SECTION_H = section.scrollHeight;
      VH = window.innerHeight;
      MAX_SCROLL = SECTION_H - VH;
      lastIdx = -1;
      draw(p2f(smoothProgress));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      // Restore pinned style
      pinned.style.position = "";
      pinned.style.top = "";
    };
  }, [isReady, images]);

  const pct = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <div ref={sectionRef} style={{ height: "600svh", position: "relative" }}>

      {/* ══ LOADER ══════════════════════════════════════════════════════ */}
      {!isReady && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#04080F" }}>
          <img
            src={logo}
            alt="Bravo Groups"
            style={{ width: "128px", height: "128px", objectFit: "contain", marginBottom: "2.5rem" }}
          />
          <div style={{ width: 220, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#2F4DFF,#8B5CF6)", borderRadius: 99, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 12px rgba(47,77,255,0.6)" }} />
          </div>
          <p style={{ marginTop: "1.2rem", fontSize: "0.65rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif" }}>LOADING · {pct}%</p>
        </div>
      )}

      {/* ══ PINNED PANEL ════════════════════════════════════════════════ */}
      <div ref={pinnedRef} style={{ width: "100%", height: "100svh", overflow: "hidden", position: "relative" }}>

        {/* Canvas */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

        {/* Cinematic vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", background: [
            "linear-gradient(to bottom,rgba(4,8,15,0.4) 0%,transparent 22%)",
            "linear-gradient(to top,   rgba(4,8,15,0.55) 0%,transparent 32%)",
            "linear-gradient(to right, rgba(4,8,15,0.45) 0%,transparent 28%)",
            "linear-gradient(to left,  rgba(4,8,15,0.4)  0%,transparent 28%)",
          ].join(",")
        }} />

        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem clamp(1.5rem,4vw,3.5rem)", zIndex: 10, pointerEvents: "none" }}>
          <span style={{ fontSize: "clamp(0.75rem,1.2vw,0.95rem)", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", fontFamily: "system-ui,sans-serif", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>BRAVO GROUPS</span>
          <div style={{ width: 120, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 99, overflow: "hidden" }}>
            <div ref={progressBarRef} style={{ height: "100%", width: "0%", background: "linear-gradient(90deg,#2F4DFF,#8B5CF6)", borderRadius: 99, boxShadow: "0 0 8px rgba(47,77,255,0.8)" }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", pointerEvents: "none", zIndex: 10, opacity: 1, transition: "opacity 0.8s ease" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>Scroll to explore</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)", animation: "pulse 2s ease-in-out infinite" }} />
          <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scaleY(0.8)}50%{opacity:1;transform:scaleY(1)}}`}</style>
        </div>

        {/* Pill scrollbar */}
        <ScrollPillBar pillRef={pillRef} />

        {/* ══ PHASE 1: MISSION ════════════════════════════════════════ */}
        <div ref={missionRef} style={{ position: "absolute", top: 0, left: 0, width: "clamp(340px,92vw,540px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1rem,4vw,4rem)", opacity: 0, willChange: "transform,opacity" }}>
          <div style={{ position: "absolute", top: "28%", left: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(47,77,255,0.18) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", background: "rgba(4,10,28,0.76)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "1.75rem", padding: "clamp(1.5rem,3vw,2.5rem)", boxShadow: "0 24px 64px rgba(0,0,0,0.65),inset 0 1px 1px rgba(255,255,255,0.1)", maxHeight: "76vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(47,77,255,0.15)", border: "1px solid rgba(47,77,255,0.4)", borderRadius: 99, padding: "0.4rem 1.1rem", marginBottom: "1.4rem", alignSelf: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 10px #3b82f6" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", color: "#60a5fa", fontFamily: "system-ui,sans-serif", textTransform: "uppercase" }}>Our Mission</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.2vw,3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.045em", lineHeight: 1, marginBottom: "1.2rem", fontFamily: "'Inter','system-ui',sans-serif" }}>Empowering Every<br />Medical Dream</h2>
            <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#3b82f6,transparent)", borderRadius: 99, marginBottom: "1.5rem" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <p style={{ fontSize: "clamp(0.85rem,1.1vw,0.98rem)", color: "rgba(220,230,255,0.85)", fontWeight: 400, lineHeight: 1.7, margin: 0, fontFamily: "system-ui,sans-serif" }}>Our mission at Bravo Groups Educational Consultancy Pvt. Ltd. is to guide aspiring medical students toward achieving their dreams of studying MBBS abroad through transparent, ethical, and reliable counseling.</p>
              <p style={{ fontSize: "clamp(0.85rem,1.1vw,0.98rem)", color: "rgba(220,230,255,0.85)", fontWeight: 400, lineHeight: 1.7, margin: 0, fontFamily: "system-ui,sans-serif" }}>We are committed to providing accurate information, personalized guidance, and end-to-end support—from university selection to admission and visa processing.</p>
              <p style={{ fontSize: "clamp(0.85rem,1.1vw,0.98rem)", color: "rgba(220,230,255,0.85)", fontWeight: 400, lineHeight: 1.7, margin: 0, fontFamily: "system-ui,sans-serif" }}>We simplify the journey of international medical education and empower students with the right opportunities for global healthcare careers.</p>
              <p style={{ fontSize: "clamp(0.85rem,1.1vw,0.98rem)", color: "#ffffff", fontWeight: 600, lineHeight: 1.6, margin: "0.8rem 0 0 0", padding: "0.8rem 1.2rem", background: "linear-gradient(90deg, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.05) 100%)", borderLeft: "3px solid #3b82f6", borderRadius: "0 8px 8px 0", fontFamily: "system-ui,sans-serif", letterSpacing: "0.02em" }}>✨ At Bravo Groups, we turn medical dreams into international success stories.</p>
            </div>
          </div>
        </div>

        {/* ══ PHASE 2: VISION ═════════════════════════════════════════ */}
        <div ref={visionRef} style={{ position: "absolute", top: 0, right: 0, width: "clamp(340px,92vw,540px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", padding: "0 clamp(1rem,4vw,4rem)", opacity: 0, willChange: "transform,opacity" }}>
          <div style={{ position: "absolute", top: "28%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", background: "rgba(4,10,28,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "1.5rem", padding: "clamp(1.5rem,3vw,2.5rem)", boxShadow: "0 12px 56px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)", maxHeight: "82vh", overflowY: "auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 99, padding: "0.3rem 0.9rem", marginBottom: "1.2rem", marginTop: "20px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6", boxShadow: "0 0 6px #8B5CF6" }} />
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(190,160,255,0.9)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase" }}>Our Vision</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "1rem", fontFamily: "'system-ui','Segoe UI',sans-serif" }}>A Borderless Future<br />for Medicine</h2>
            <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#8B5CF6,transparent)", borderRadius: 99, marginBottom: "1.2rem" }} />
            <p style={{ fontSize: "clamp(0.8rem,1.15vw,0.92rem)", color: "rgba(200,215,255,0.78)", fontWeight: 300, lineHeight: 1.7, margin: "0 0 0.8rem 0", fontFamily: "system-ui,sans-serif" }}>Our vision is to become a leading and most trusted educational consultancy in India for MBBS abroad admissions, recognized for our integrity, transparency, and student success.</p>
            <p style={{ fontSize: "clamp(0.8rem,1.15vw,0.92rem)", color: "rgba(200,215,255,0.78)", fontWeight: 300, lineHeight: 1.7, margin: 0, fontFamily: "system-ui,sans-serif" }}>We aim to build a global network of reputed medical universities and create a seamless pathway for students to achieve their dreams of becoming internationally qualified doctors.</p>
            <p style={{ fontSize: "clamp(0.85rem,1.15vw,0.92rem)", color: "#ffffff", fontWeight: 600, lineHeight: 1.6, margin: "0.8rem 0 0 0", padding: "0.8rem 1.2rem", background: "linear-gradient(90deg, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.05) 100%)", borderLeft: "3px solid #8B5CF6", borderRadius: "0 8px 8px 0", fontFamily: "system-ui,sans-serif", letterSpacing: "0.02em" }}>✨ Bravo Groups — a lifelong partner in every student's success journey.</p>
          </div>
        </div>

        {/* ══ PHASE 3: ADMISSION ══════════════════════════════════════ */}
        <div ref={admissionRef} style={{ position: "absolute", top: 0, left: 0, width: "clamp(340px,95vw,620px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1rem,4vw,4rem)", opacity: 0, willChange: "transform,opacity" }}>
          <div style={{ background: "rgba(4,10,28,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "2rem", padding: "clamp(1.5rem,3vw,2.75rem)", boxShadow: "0 24px 80px rgba(0,0,0,0.7),inset 0 1px 1px rgba(255,255,255,0.12)", maxHeight: "76vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "clamp(1.2rem,2.2vw,1.8rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem", fontFamily: "system-ui,sans-serif", lineHeight: 1.1 }}>🎓 MBBS ADMISSION OPEN <span style={{ color: "#60a5fa", fontStyle: "italic", whiteSpace: "nowrap" }}>2026–2027</span></h4>
            <p style={{ fontSize: "clamp(0.85rem,1.2vw,1rem)", color: "rgba(180,180,180,1)", marginBottom: "1.5rem", fontFamily: "system-ui,sans-serif" }}>Study MBBS Abroad in <span style={{ color: "#3b82f6", fontWeight: 700 }}>Top Countries</span></p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "2.2rem" }}>
              {countries.map((c) => (
                <div key={c} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.85rem", padding: "0.75rem 0.9rem", display: "flex", alignItems: "center", gap: "0.6rem", transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)", cursor: "default" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(59,130,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#eee", fontFamily: "system-ui,sans-serif" }}>{c}</span>
                </div>
              ))}
            </div>

            {/* NEW HIGHLIGHTS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", paddingBottom: "1.8rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              {[
                "Limited Seats Available",
                "Early Admission Benefits",
                "Apply Now for Secure Admission"
              ].map((text, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ color: "#10b981", fontSize: "1.2rem", fontWeight: "bold" }}>✔</div>
                  <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.92rem", fontWeight: 600, fontFamily: "system-ui,sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* QUOTE */}
            <div style={{ paddingTop: "1.8rem", textAlign: "center" }}>
              <p style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "320px", margin: "0 auto", fontFamily: "system-ui,sans-serif", borderLeft: "2px solid rgba(59,130,246,0.3)", paddingLeft: "1rem" }}>
                “Your dream of becoming a doctor starts with the right guidance.”
              </p>
            </div>
          </div>
        </div>

        {/* ══ PHASE 4: FINALE ═════════════════════════════════════════ */}
        <div ref={finaleRef} style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", textAlign: "center", opacity: 0, willChange: "transform,opacity", background: "rgba(4,8,15,0.55)", pointerEvents: "none" }}>
          <div style={{ maxWidth: 820, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 99, padding: "0.35rem 1rem" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#4ade80", fontWeight: 700, textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>Trusted Since 2022 · Vellore · Tamil Nadu</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,4.5vw,3.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.035em", fontFamily: "'system-ui','Segoe UI',sans-serif" }}>
              Study Abroad with the Most<br />
              <span style={{ color: "#3b82f6", textDecoration: "underline", textDecorationColor: "rgba(59,130,246,0.28)", textUnderlineOffset: "7px" }}>Trusted Bravo Groups</span>
            </h2>
            <p style={{ fontSize: "clamp(0.9rem,1.4vw,1.08rem)", color: "rgba(155,165,185,1)", maxWidth: 540, lineHeight: 1.8, fontFamily: "system-ui,sans-serif" }}>
              Expert guidance, affordable MBBS admissions, and end-to-end support trusted by <strong style={{ color: "#fff" }}>100+ of students</strong>.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center", paddingTop: "0.4rem", pointerEvents: "auto" }}>
              <div onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", background: "linear-gradient(135deg,#2F4DFF,#6B21C8)", borderRadius: 99, cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, color: "#fff", fontFamily: "system-ui,sans-serif", boxShadow: "0 4px 28px rgba(47,77,255,0.4)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.17 3.27 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Get Free Counseling
              </div>
              <div onClick={() => navigate('/universities')} style={{ padding: "0.85rem 2rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 99, cursor: "pointer", fontSize: "0.88rem", fontWeight: 400, color: "rgba(255,255,255,0.8)", fontFamily: "system-ui,sans-serif" }}>View Universities</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Pill Scrollbar ────────────────────────────────────────────────────────────
function ScrollPillBar({ pillRef }: { pillRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", height: 220, width: 6, zIndex: 50, pointerEvents: "none" }}>
      {/* Track */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "rgba(255,255,255,0.10)" }} />
      {/* Pill */}
      <div ref={pillRef} style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 6, height: 52, borderRadius: 99, background: "linear-gradient(180deg,#818cf8 0%,#3b82f6 60%,#6366f1 100%)", boxShadow: "0 0 12px 3px rgba(99,102,241,0.85),0 0 24px 6px rgba(59,130,246,0.35)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: 2, height: 18, borderRadius: 99, background: "rgba(255,255,255,0.5)" }} />
      </div>
    </div>
  );
}