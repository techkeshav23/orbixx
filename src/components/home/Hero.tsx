"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Hero({
  onSeeResults,
  onSpinWheel,
}: {
  onSeeResults: () => void;
  onSpinWheel: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [heroPhase, setHeroPhase] = useState(-1);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnTransform, setBtnTransform] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timers = [
      setTimeout(() => setHeroPhase(0), 200),
      setTimeout(() => setHeroPhase(1), 900),
      setTimeout(() => setHeroPhase(2), 1600),
      setTimeout(() => setHeroPhase(3), 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [mounted]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnTransform(`translate(${x * 0.3}px, ${y * 0.3}px)`);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Soft gradient accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B4A]/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#14B8A6]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EC4899]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        {/* Main headline — Cinematic Pullback */}
        <div className="mb-8">
          {[
            { text: "DANCE", color: "#FF6B4A", idx: 0 },
            { text: "SWEAT", color: "#EC4899", idx: 1 },
            { text: "GLOW.", color: "#14B8A6", idx: 2 },
          ].map((w) => (
            <span
              key={w.text}
              className={`block font-mono text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter ${
                heroPhase >= w.idx ? "cine-pullback" : "opacity-0"
              }`}
              style={{ color: w.color }}
            >
              {w.text}
            </span>
          ))}
          <div
            className={`h-[3px] w-40 mt-4 rounded-full bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6] origin-left ${
              heroPhase >= 3 ? "cine-wipe" : "opacity-0 scale-x-0"
            }`}
          />
        </div>

        {/* Sub text */}
        <p
          className={`text-slate-500 text-lg sm:text-xl max-w-xl leading-relaxed mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            heroPhase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          India&apos;s highest-rated online Zumba platform. Exclusively for
          women. No equipment. No excuses.
        </p>

        {/* CTA group */}
        <div
          className={`flex flex-col items-center sm:items-start sm:flex-row gap-5 mb-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            heroPhase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
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
              <span>BOOK NOW</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
          <div className="relative group/see">
            <button
              onClick={onSeeResults}
              className="relative inline-flex items-center gap-3 text-[#FF6B4A] hover:text-white px-8 py-5 rounded-full font-bold text-sm transition-all duration-300 border-2 border-[#FF6B4A] hover:bg-gradient-to-r hover:from-[#FF6B4A] hover:to-[#EC4899] cursor-pointer hover:shadow-[0_0_40px_rgba(255,107,74,0.2)] overflow-visible"
            >
              {/* Ripple ping rings */}
              <span className="absolute inset-0 rounded-full border-2 border-[#FF6B4A]/40 see-ping" />
              <span className="absolute inset-0 rounded-full border-2 border-[#FF6B4A]/20 see-ping" style={{ animationDelay: "0.8s" }} />

              <span className="text-lg animate-bounce" role="img" aria-label="point right">&#x1F449;</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              SEE RESULTS
              <span className="text-lg animate-bounce" role="img" aria-label="point left">&#x1F448;</span>
            </button>
          </div>
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
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                heroPhase >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {stat.val}
              </div>
              <div className="text-slate-400 text-xs mt-1 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
