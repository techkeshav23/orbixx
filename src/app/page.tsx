"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

/* ════════════════════════════════════════════
   HOOKS
   ════════════════════════════════════════════ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); ob.disconnect(); } }, { threshold });
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* Scramble text hook — decodes random chars into actual text */
function useTextScramble(text: string, trigger: boolean, duration = 1200) {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
  
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = duration / 16;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const decoded = text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (progress * text.length > i) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      setDisplay(decoded);
      if (frame >= totalFrames) { setDisplay(text); clearInterval(interval); }
    }, 16);
    return () => clearInterval(interval);
  }, [trigger, text, duration]);
  
  return display;
}

/* ════════════════════════════════════════════
   3D CAROUSEL POPUP
   ════════════════════════════════════════════ */
const carouselImages = [
  { src: "/transformations/priya.jpg", name: "Priya S.", result: "-15 kg" },
  { src: "/transformations/ananya.jpg", name: "Ananya R.", result: "-10 kg" },
  { src: "/transformations/meera.jpg", name: "Meera K.", result: "-8 kg" },
  { src: "/transformations/sneha.jpg", name: "Sneha D.", result: "-12 kg" },
  { src: "/transformations/kavita.jpg", name: "Kavita P.", result: "-18 kg" },
  { src: "/transformations/ritu.jpg", name: "Ritu M.", result: "-9 kg" },
  { src: "/transformations/deepika.jpg", name: "Deepika G.", result: "-14 kg" },
  { src: "/transformations/nisha.jpg", name: "Nisha T.", result: "-7 kg" },
];

function Carousel3D({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef<number>(0);
  const count = carouselImages.length;
  const step = 360 / count;

  // Auto-rotate
  useEffect(() => {
    if (!open || !autoRotate) return;
    const id = setInterval(() => setAngle(a => a - 0.3), 16);
    return () => clearInterval(id);
  }, [open, autoRotate]);

  // Momentum deceleration
  useEffect(() => {
    if (!open || dragging) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      if (Math.abs(velocity.current) > 0.05) {
        velocity.current *= 0.95;
        setAngle(a => a + velocity.current);
        animFrame.current = requestAnimationFrame(tick);
      } else {
        velocity.current = 0;
        // Resume auto-rotate after momentum stops
        setTimeout(() => setAutoRotate(true), 2000);
      }
    };
    if (Math.abs(velocity.current) > 0.05) {
      animFrame.current = requestAnimationFrame(tick);
    }
    return () => { running = false; cancelAnimationFrame(animFrame.current); };
  }, [open, dragging]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setAutoRotate(false);
    velocity.current = 0;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX.current;
    velocity.current = dx * 0.4;
    setAngle(a => a + dx * 0.4);
    lastX.current = e.clientX;
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setAutoRotate(false);
    setDragging(true);
    velocity.current = 0;
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - lastX.current;
    velocity.current = dx * 0.4;
    setAngle(a => a + dx * 0.4);
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  if (!open) return null;

  // Responsive radius
  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 200 : 340;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease]" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group"
        aria-label="Close"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[110] text-center">
        <p className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-1">Drag to rotate</p>
        <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight">Real Transformations</h3>
      </div>

      {/* 3D Carousel container */}
      <div
        className="relative z-[105] select-none w-full h-[400px] sm:h-[450px] flex items-center justify-center"
        style={{ perspective: "1000px" }}
        onClick={e => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative"
          style={{
            width: "180px",
            height: "240px",
            transformStyle: "preserve-3d",
            transform: `rotateY(${angle}deg)`,
            transition: dragging ? "none" : "transform 0.05s linear",
          }}
        >
          {carouselImages.map((img, i) => {
            const rot = step * i;
            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-[180px] h-[240px] sm:w-[200px] sm:h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/15"
                style={{
                  transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                {/* Overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{img.name}</p>
                  <p className="text-[#FF6B4A] text-xs font-mono font-bold">{img.result}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110]">
        <Link
          href="/results"
          className="text-white/50 hover:text-white text-xs font-mono tracking-wider transition-colors duration-300 flex items-center gap-2"
          onClick={e => e.stopPropagation()}
        >
          View all details
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SECTION 1 — HERO
   Light bg + text scramble + magnetic btn
   ════════════════════════════════════════════ */
function Hero({ onSeeResults, onSpinWheel }: { onSeeResults: () => void; onSpinWheel: () => void }) {
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnTransform, setBtnTransform] = useState("");
  const scrambledTitle = useTextScramble("DANCE. SWEAT. GLOW.", mounted, 1500);

  useEffect(() => { 
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* Magnetic button effect */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnTransform(`translate(${x * 0.3}px, ${y * 0.3}px)`);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Soft gradient accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B4A]/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#14B8A6]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EC4899]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Top tag */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-flex items-center gap-3 border border-slate-200 rounded-full px-5 py-2.5 mb-10 backdrop-blur-sm bg-white/80">
            <span className="live-dot w-2 h-2 rounded-full bg-[#FF6B4A]" />
            <span className="text-slate-500 text-xs font-mono tracking-wider uppercase">250+ women training right now</span>
          </div>
        </div>

        {/* Main headline with scramble */}
        <h1 className={`font-mono text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-tighter mb-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]">
            {scrambledTitle}
          </span>
        </h1>

        {/* Sub text */}
        <p className={`text-slate-500 text-lg sm:text-xl max-w-xl leading-relaxed mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "500ms" }}
        >
          India&apos;s highest-rated online Zumba platform. 
          Exclusively for women. No equipment. No excuses.
        </p>

        {/* CTA group */}
        <div className={`flex flex-col sm:flex-row gap-5 mb-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "700ms" }}
        >
          <div 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => setBtnTransform("")}
            className="magnetic-wrap"
          >
            <button
              ref={btnRef as React.RefObject<HTMLButtonElement>}
              onClick={onSpinWheel}
              className="magnetic-btn group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-10 py-5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,107,74,0.3)] cursor-pointer"
              style={{ transform: btnTransform }}
            >
              <span>START FREE TRIAL</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
          </div>
          <button
            onClick={onSeeResults}
            className="inline-flex items-center gap-3 text-[#FF6B4A] hover:text-white px-8 py-5 rounded-full font-bold text-sm transition-all duration-300 border-2 border-[#FF6B4A] hover:bg-gradient-to-r hover:from-[#FF6B4A] hover:to-[#EC4899] cursor-pointer hover:shadow-[0_0_40px_rgba(255,107,74,0.2)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            SEE RESULTS
          </button>
        </div>

        {/* Bottom stats with stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-10 border-t border-slate-100">
          {[
            { val: "10K+", label: "Active Members" },
            { val: "4.9", label: "App Rating" },
            { val: "500+", label: "Cal/Session" },
            { val: "93%", label: "Retention" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${900 + i * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{stat.val}</div>
              <div className="text-slate-400 text-xs mt-1 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 2 — INFINITE MARQUEE
   ════════════════════════════════════════════ */
function Marquee() {
  const words = ["ZUMBA", "YOGA", "STRENGTH", "DANCE", "CARDIO", "HIIT", "WELLNESS"];
  return (
    <div className="bg-slate-50 border-y border-slate-100 py-8 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1, 2].map(set => (
          <div key={set} className="flex items-center shrink-0">
            {words.map((w, i) => (
              <span key={`${set}-${i}`} className="flex items-center mx-6">
                <span className={`text-3xl sm:text-5xl font-black tracking-tight ${
                  i % 2 === 0 
                    ? "text-transparent [-webkit-text-stroke:1px_rgba(255,107,74,0.35)]" 
                    : "text-slate-200"
                }`}>
                  {w}
                </span>
                <span className="text-[#FF6B4A]/25 mx-6 text-xl">◈</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SECTION 3 — FEATURES
   ════════════════════════════════════════════ */
function Features() {
  const { ref, inView } = useInView();
  const cards = [
    { num: "01", title: "Live Sessions", desc: "Real-time classes with trainers who see you, correct your form, and push your limits.", color: "#FF6B4A" },
    { num: "02", title: "Women Only", desc: "Private, judgment-free space. Dance like nobody\u2019s watching \u2014 because they aren\u2019t.", color: "#EC4899" },
    { num: "03", title: "Any Device", desc: "Phone, tablet, laptop. Join from your bedroom, terrace, or while traveling.", color: "#14B8A6" },
    { num: "04", title: "All Levels", desc: "Whether you\u2019ve never exercised or you\u2019re a fitness junkie \u2014 we\u2019ve got your class.", color: "#FF6B4A" },
    { num: "05", title: "Flexible Timing", desc: "Classes from 6 AM to 10 PM. Miss a live session? Recordings available 24/7.", color: "#EC4899" },
    { num: "06", title: "Expert Trainers", desc: "Certified, experienced, and passionate. 50+ trainers across different styles.", color: "#14B8A6" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`max-w-2xl mb-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">// WHAT WE OFFER</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Not another fitness app.
            <br />
            <span className="text-slate-300">A revolution.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="relative bg-white rounded-2xl p-7 h-full border border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-lg overflow-hidden">
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700" 
                  style={{ background: card.color }} 
                />
                
                <div className="relative z-10">
                  <span className="text-5xl font-black font-mono text-slate-100 leading-none block mb-4">{card.num}</span>
                  <h3 className="text-slate-900 font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent group-hover:via-slate-200 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 4 — ABOUT / SPLIT 
   ════════════════════════════════════════════ */
function About() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} id="about" className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Visual */}
          <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative">
              {/* Main visual */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#FF6B4A]/[0.08] via-[#EC4899]/[0.04] to-transparent border border-slate-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
                  <div className="relative w-full max-w-[280px]">
                    {/* Animated ring */}
                    <div className="ring-spin absolute inset-0 rounded-full border-2 border-dashed border-[#FF6B4A]/20" />
                    <div className="aspect-square rounded-full bg-gradient-to-br from-[#FF6B4A]/15 to-[#EC4899]/15 flex items-center justify-center border border-slate-200">
                      <div className="text-center">
                        <div className="text-6xl sm:text-7xl font-black font-mono text-slate-800 leading-none">45</div>
                        <div className="text-slate-400 text-xs tracking-[0.2em] uppercase mt-2">min/session</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-10 justify-center">
                    {["High Energy", "Beginner Friendly", "Music-Driven", "Zero Equipment"].map((tag, i) => (
                      <span key={i} className="text-slate-500 text-xs border border-slate-200 rounded-full px-4 py-1.5 bg-white/80">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className={`absolute -bottom-6 -right-4 sm:-right-8 bg-white rounded-2xl p-5 shadow-lg border border-slate-100 transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B4A] to-[#EC4899] flex items-center justify-center text-white font-bold font-mono text-sm">
                    #1
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">Rated #1 in India</p>
                    <p className="text-slate-400 text-xs">Women&apos;s Online Fitness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">// WHY ORBIXX</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Fitness that doesn&apos;t feel
              <br />like punishment
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              We blend high-energy Zumba choreography with effective workout science. 
              Every session is designed to burn 500+ calories while you&apos;re too busy 
              having fun to notice. That&apos;s the Orbixx difference.
            </p>

            {/* Animated progress bars */}
            <div className="space-y-6">
              {[
                { label: "Members see results in 30 days", value: 85, color: "from-[#FF6B4A] to-[#EC4899]" },
                { label: "Continue after month one", value: 93, color: "from-[#EC4899] to-[#14B8A6]" },
                { label: "Would recommend to friends", value: 98, color: "from-[#14B8A6] to-[#FF6B4A]" },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">{bar.label}</span>
                    <span className="text-slate-900 font-mono font-bold">{bar.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                      style={{ 
                        width: inView ? `${bar.value}%` : "0%",
                        transitionDelay: `${800 + i * 200}ms`,
                        transitionDuration: "1.5s"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 5 — STATS (Number Scramble)
   ════════════════════════════════════════════ */
function Stats() {
  const { ref, inView } = useInView(0.3);
  const stat1 = useTextScramble("10,000+", inView, 1000);
  const stat2 = useTextScramble("500+", inView, 1000);
  const stat3 = useTextScramble("150+", inView, 1000);
  const stat4 = useTextScramble("4.9/5", inView, 1000);

  const stats = [
    { display: stat1, label: "ACTIVE MEMBERS", sub: "and growing every day" },
    { display: stat2, label: "CALORIES PER SESSION", sub: "average burn rate" },
    { display: stat3, label: "MONTHLY CLASSES", sub: "across all categories" },
    { display: stat4, label: "AVERAGE RATING", sub: "from 10K+ reviews" },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6B4A]/[0.04] rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500">
                {s.display}
              </div>
              <div className="text-[#FF6B4A] text-[10px] font-mono tracking-[0.2em] mt-3 mb-1">{s.label}</div>
              <div className="text-slate-400 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 6 — TESTIMONIALS
   ════════════════════════════════════════════ */
function Testimonials() {
  const { ref, inView } = useInView();
  const stories = [
    {
      quote: "I\u2019ve tried every fitness app, gym, and YouTube video. Orbixx is the only thing that actually stuck. 6 months in, 15kg down, and I genuinely look forward to every class.",
      name: "Priya Sharma",
      loc: "Mumbai",
      result: "-15 KG",
      time: "6 months",
    },
    {
      quote: "The women-only environment changed everything. No awkward stares, no judgment. Just me, the music, and 200 other women having the time of their lives.",
      name: "Ananya Reddy",
      loc: "Hyderabad",
      result: "2X STAMINA",
      time: "4 months",
    },
    {
      quote: "My doctor told me to exercise for my health. I dreaded it until Orbixx. Now my blood pressure is normal, my energy is through the roof, and I\u2019m hooked.",
      name: "Meera Kulkarni",
      loc: "Bangalore",
      result: "+100% ENERGY",
      time: "3 months",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`max-w-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">// REAL STORIES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            They did it.
            <br />
            <span className="text-slate-300">So can you.</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <div
              key={i}
              className={`group relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="bg-white border border-slate-100 rounded-2xl p-7 h-full hover:border-slate-200 hover:shadow-lg transition-all duration-500 relative overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B4A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Result badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#FF6B4A] font-mono font-bold text-sm tracking-wider">{story.result}</span>
                  <span className="text-slate-300 text-xs font-mono">{story.time}</span>
                </div>

                {/* Quote */}
                <blockquote className="text-slate-500 text-sm leading-[1.8] mb-8">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B4A]/20 to-[#EC4899]/20 flex items-center justify-center text-slate-500 text-xs font-mono font-bold border border-slate-100">
                    {story.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">{story.name}</p>
                    <p className="text-slate-400 text-xs">{story.loc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 7 — CLASS SCHEDULE PREVIEW
   ════════════════════════════════════════════ */
function Schedule() {
  const { ref, inView } = useInView();
  const classes = [
    { time: "06:00", name: "Morning Zumba Flow", trainer: "Parul", level: "Beginner", intensity: 3 },
    { time: "08:00", name: "Yoga & Stretch", trainer: "Shivangi", level: "All Levels", intensity: 2 },
    { time: "10:00", name: "Bollywood Cardio", trainer: "Vanshika", level: "Intermediate", intensity: 4 },
    { time: "17:00", name: "Power HIIT Burn", trainer: "Parul", level: "Advanced", intensity: 5 },
    { time: "19:00", name: "Dance Cardio Party", trainer: "Shivangi", level: "All Levels", intensity: 4 },
    { time: "21:00", name: "Cool Down Yoga", trainer: "Vanshika", level: "Beginner", intensity: 1 },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className={`max-w-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">// TODAY&apos;S SCHEDULE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Classes running
            <br />
            <span className="text-slate-300">all day long.</span>
          </h2>
        </div>

        {/* Schedule list */}
        <div className="space-y-3">
          {classes.map((cls, i) => (
            <div
              key={i}
              className={`group flex items-center gap-4 sm:gap-8 p-5 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-all duration-500 cursor-pointer hover:shadow-sm ${
                inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ 
                transitionDelay: `${200 + i * 80}ms`,
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
              }}
            >
              {/* Time */}
              <div className="text-slate-300 font-mono text-sm min-w-[50px] group-hover:text-[#FF6B4A] transition-colors duration-300">{cls.time}</div>
              
              {/* Divider dot */}
              <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#FF6B4A] transition-colors duration-300 flex-shrink-0" />
              
              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-semibold text-sm sm:text-base truncate group-hover:text-[#FF6B4A] transition-colors duration-300">{cls.name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{cls.trainer} · {cls.level}</p>
              </div>
              
              {/* Intensity */}
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className={`w-1.5 h-4 rounded-full transition-colors duration-300 ${
                    j < cls.intensity 
                      ? "bg-[#FF6B4A]/30 group-hover:bg-[#FF6B4A]/60" 
                      : "bg-slate-100"
                  }`} />
                ))}
              </div>

              {/* Arrow */}
              <svg className="w-4 h-4 text-slate-200 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   SECTION 8 — CTA
   ════════════════════════════════════════════ */
function FinalCTA() {
  const { ref, inView } = useInView();
  
  return (
    <section ref={ref} className="relative py-28 md:py-36 overflow-hidden bg-slate-50">
      {/* Soft gradient accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#FF6B4A]/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#14B8A6]/[0.04] rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-6">// YOUR MOVE</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1] tracking-tight mb-6">
            STOP THINKING.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]">
              START MOVING.
            </span>
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-lg mx-auto">
            7-day free trial. Cancel anytime. No card needed. 
            10,000+ women already made the choice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-12 py-5 rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,107,74,0.3)] hover:scale-105"
            >
              START FREE TRIAL
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </Link>
            <a
              href="https://wa.me/917451874271"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 px-10 py-5 rounded-full font-medium text-base transition-all duration-300 hover:bg-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   OFFER COUNTDOWN BANNER (top of page)
   ════════════════════════════════════════════ */
function OfferBanner({ onClose }: { onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 0, s: 0 });

  useEffect(() => {
    const end = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="sticky top-16 lg:top-20 z-[45] bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6] text-white overflow-hidden animate-[slideDown_0.4s_ease]">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] animate-[shimmer_2.5s_infinite]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-sm sm:text-base">FLAT 40% OFF — First 100 Women Only!</span>
        </div>
        
        {/* Countdown */}
        <div className="flex items-center gap-1.5 font-mono text-sm">
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">{pad(timeLeft.h)}</span>
          <span className="font-bold">:</span>
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">{pad(timeLeft.m)}</span>
          <span className="font-bold">:</span>
          <span className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1 font-bold">{pad(timeLeft.s)}</span>
        </div>

        <Link href="/pricing" className="bg-white text-[#FF6B4A] px-5 py-1.5 rounded-full text-xs font-bold hover:bg-white/90 transition-all hover:scale-105 whitespace-nowrap">
          CLAIM NOW →
        </Link>

        <button onClick={onClose} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1" aria-label="Close banner">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   FREE CLASS LEAD CAPTURE POPUP (3s delay)
   ════════════════════════════════════════════ */
function FreeClassPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const spotsLeft = 50;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    const msg = encodeURIComponent(`Hi! I'm ${name}. I'd like to book my FREE Zumba class! My number: ${phone}`);
    window.open(`https://wa.me/917451874271?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />
      
      <div
        className="relative z-10 bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient strip */}
        <div className="h-2 bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]" />

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" aria-label="Close">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 pt-6">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Get Your FREE Zumba Class!</h3>
                <p className="text-slate-500 text-sm">Enter your details and we&apos;ll book you in instantly via WhatsApp</p>
              </div>

              {/* Urgency */}
              <div className="flex items-center justify-center gap-2 bg-[#FFF1ED] rounded-full px-4 py-2 mb-6">
                <span className="live-dot w-2 h-2 rounded-full bg-[#FF6B4A]" />
                <span className="text-[#FF6B4A] text-xs font-bold">Only {spotsLeft} spots left this week!</span>
              </div>

              {/* Form */}
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white py-4 rounded-xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                🎯 BOOK MY FREE CLASS
              </button>

              <p className="text-slate-300 text-[10px] text-center mt-4">No spam. No card required. Redirects to WhatsApp.</p>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">You&apos;re In!</h3>
              <p className="text-slate-500 text-sm">Complete your booking on WhatsApp. See you in class! 💃</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SPIN THE WHEEL POPUP
   ════════════════════════════════════════════ */
const wheelOffers = [
  { label: "10% OFF", color: "#FF6B4A", emoji: "🏷️" },
  { label: "FREE CLASS", color: "#14B8A6", emoji: "🎉" },
  { label: "FREE WEEK", color: "#EC4899", emoji: "🔥" },
  { label: "20% OFF", color: "#FF6B4A", emoji: "💰" },
  { label: "1 MONTH FREE", color: "#14B8A6", emoji: "🏆" },
  { label: "15% OFF", color: "#EC4899", emoji: "✨" },
];

function SpinWheel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [phone, setPhone] = useState("");
  const [claimed, setClaimed] = useState(false);
  const count = wheelOffers.length;
  const segAngle = 360 / count;

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; setResult(null); setSpinning(false); setRotation(0); setClaimed(false); setPhone(""); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const winIndex = Math.floor(Math.random() * count);
    // Spin 5 full rotations + land on winner
    const targetAngle = 360 * 5 + (360 - winIndex * segAngle - segAngle / 2);
    setRotation(prev => prev + targetAngle);
    setTimeout(() => {
      setSpinning(false);
      setResult(winIndex);
    }, 4500);
  };

  const claimReward = () => {
    if (!phone.trim() || result === null) return;
    const offer = wheelOffers[result];
    const msg = encodeURIComponent(`Hi! 🎰 I won "${offer.label}" on the Orbixx Spin Wheel! My number: ${phone}. Please apply my reward!`);
    window.open(`https://wa.me/917451874271?text=${msg}`, "_blank");
    setClaimed(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease]" />

      <div
        className="relative z-10 bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-2 bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]" />

        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" aria-label="Close">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-5">
          <div className="text-center mb-5">
            <h3 className="text-xl font-black text-slate-900">🎰 Spin & Win!</h3>
            <p className="text-slate-400 text-xs mt-1">Try your luck — every spin wins!</p>
          </div>

          {/* Wheel */}
          <div className="relative mx-auto w-[260px] h-[260px] mb-5">
            {/* Pointer triangle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#FF6B4A] drop-shadow-md" />
            </div>

            {/* Rotating wheel */}
            <div
              className="w-full h-full rounded-full border-4 border-slate-200 overflow-hidden shadow-inner"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              }}
            >
              <svg viewBox="0 0 260 260" className="w-full h-full">
                {wheelOffers.map((offer, i) => {
                  const startAngle = i * segAngle;
                  const endAngle = startAngle + segAngle;
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  const cx = 130, cy = 130, r = 130;
                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);
                  const largeArc = segAngle > 180 ? 1 : 0;
                  const midAngle = (startAngle + segAngle / 2 - 90) * Math.PI / 180;
                  const textR = r * 0.62;
                  const tx = cx + textR * Math.cos(midAngle);
                  const ty = cy + textR * Math.sin(midAngle);
                  const textAngle = startAngle + segAngle / 2;

                  const colors = i % 2 === 0 ? "#fff8f6" : "#f0fdfa";
                  return (
                    <g key={i}>
                      <path
                        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                        fill={colors}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                        fontSize="11"
                        fontWeight="800"
                        fill={offer.color}
                      >
                        {offer.emoji} {offer.label}
                      </text>
                    </g>
                  );
                })}
                {/* Center circle */}
                <circle cx="130" cy="130" r="22" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                <text x="130" y="132" textAnchor="middle" dominantBaseline="middle" fontSize="16">🎯</text>
              </svg>
            </div>
          </div>

          {/* Result / Spin button */}
          {result === null ? (
            <button
              onClick={spin}
              disabled={spinning}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                spinning
                  ? "bg-slate-200 text-slate-400 cursor-wait"
                  : "bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {spinning ? "🎰 Spinning..." : "🎯 SPIN THE WHEEL!"}
            </button>
          ) : !claimed ? (
            <div className="space-y-3 animate-[fadeIn_0.4s_ease]">
              <div className="text-center bg-[#FFF1ED] rounded-xl p-3">
                <p className="text-xs text-slate-500">You won</p>
                <p className="text-lg font-black text-[#FF6B4A]">{wheelOffers[result].emoji} {wheelOffers[result].label}!</p>
              </div>
              <input
                type="tel"
                placeholder="Enter phone to claim"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
              />
              <button
                onClick={claimReward}
                className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                🎉 CLAIM ON WHATSAPP
              </button>
            </div>
          ) : (
            <div className="text-center py-4 animate-[fadeIn_0.4s_ease]">
              <div className="text-4xl mb-2">🎊</div>
              <p className="text-slate-900 font-bold">Reward Claimed!</p>
              <p className="text-slate-400 text-xs mt-1">Complete on WhatsApp to activate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════ */
export default function Home() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [showFreeClass, setShowFreeClass] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Show free class popup after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowFreeClass(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {showBanner && <OfferBanner onClose={() => setShowBanner(false)} />}
      <Hero onSeeResults={() => setShowCarousel(true)} onSpinWheel={() => setShowSpinWheel(true)} />
      <Marquee />
      <Features />
      <About />
      <Stats />
      <Testimonials />
      <Schedule />
      <FinalCTA />
      <Footer />
      <Carousel3D open={showCarousel} onClose={() => setShowCarousel(false)} />
      <FreeClassPopup open={showFreeClass} onClose={() => setShowFreeClass(false)} />
      <SpinWheel open={showSpinWheel} onClose={() => setShowSpinWheel(false)} />
    </main>
  );
}
