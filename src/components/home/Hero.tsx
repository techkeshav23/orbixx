"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

import { WHATSAPP_URL } from "@/lib/constants";
import { useLoaderReady } from "@/components/AppShell";

export default function Hero({
  onSeeResults,
}: {
  onSeeResults: () => void;
}) {
  const loaderReady = useLoaderReady();
  const [mounted, setMounted] = useState(false);
  const [heroPhase, setHeroPhase] = useState(-1);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnTransform, setBtnTransform] = useState("");
  const [showMobileBmi, setShowMobileBmi] = useState(false);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Wait for loader to finish before starting hero entrance animations
  useEffect(() => {
    if (!loaderReady) return;
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, [loaderReady]);

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

  const bmi = useMemo(() => {
    const height = Number(heightCm);
    const weight = Number(weightKg);

    if (!height || !weight || height <= 0 || weight <= 0) return null;

    const value = weight / ((height / 100) * (height / 100));
    const rounded = Number(value.toFixed(1));

    if (rounded < 18.5) {
      return { value: rounded, label: "Underweight", color: "text-amber-500" };
    }
    if (rounded < 25) {
      return { value: rounded, label: "Healthy", color: "text-emerald-500" };
    }
    if (rounded < 30) {
      return { value: rounded, label: "Overweight", color: "text-orange-500" };
    }

    return { value: rounded, label: "Obese", color: "text-rose-500" };
  }, [heightCm, weightKg]);

  useEffect(() => {
    if (!showMobileBmi) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showMobileBmi]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start overflow-hidden bg-white mb-4"
    >
      {/* Soft gradient accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] sm:w-[600px] h-[60vw] sm:h-[600px] bg-[#FF6B4A]/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] sm:w-[500px] h-[50vw] sm:h-[500px] bg-[#14B8A6]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] sm:w-[400px] h-[40vw] sm:h-[400px] bg-[#EC4899]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            {/* Main headline — Cinematic Pullback */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                {[
                  { text: "DANCE", color: "#FF6B4A", idx: 0 },
                  { text: "SWEAT", color: "#EC4899", idx: 1 },
                  { text: "GLOW.", color: "#14B8A6", idx: 2 },
                ].map((w) => (
                  <span
                    key={w.text}
                    className={`block font-mono text-[clamp(2rem,7vw,7rem)] font-black leading-[0.95] tracking-tighter ${
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

              <button
                onClick={() => setShowMobileBmi(true)}
                className="sm:hidden inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-bold border-2 border-[#EC4899] text-[#EC4899] bg-white/90 hover:bg-[#ffdee4] transition-all duration-200 mt-1 shrink-0"
              >
                Check BMI
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
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
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-7 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,107,74,0.3)] cursor-pointer"
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
                </a>
              </div>
              <div className="relative group/see">
                <button
                  onClick={onSeeResults}
                  className="relative inline-flex items-center gap-3 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-bold text-sm transition-all duration-300 bg-[#FF6B4A] hover:bg-[#e55a3a] cursor-pointer hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] overflow-visible"
                >
                  {/* Ripple ping rings */}
                  <span className="absolute inset-0 rounded-full border-2 border-[#FF6B4A]/40 see-ping" />
                  <span className="absolute inset-0 rounded-full border-2 border-[#FF6B4A]/20 see-ping" style={{ animationDelay: "0.8s" }} />

                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  SEE RESULTS
                </button>
              </div>

            </div>
          </div>

          <div
            className={`hidden lg:block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-xl p-6 lg:p-7 max-w-md ml-auto">
              <p className="text-[11px] tracking-[0.2em] font-semibold text-slate-400 uppercase mb-2">
                Quick Check
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                BMI Calculator
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Enter your height and weight to know your BMI instantly.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g. 165"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/30 focus:border-[#EC4899] text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 62"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/30 focus:border-[#FF6B4A] text-slate-800"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#ffdee4] p-4 border border-[#f8c8d0]">
                {bmi ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Your BMI</p>
                      <p className="text-3xl font-black text-slate-900 leading-none mt-1">
                        {bmi.value}
                      </p>
                    </div>
                    <span className={`text-sm font-bold ${bmi.color}`}>{bmi.label}</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    Fill both fields to view your BMI score.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMobileBmi && (
        <div className="fixed inset-0 z-[120] lg:hidden" onClick={() => setShowMobileBmi(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 pb-7 shadow-2xl animate-[slideUp_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[11px] tracking-[0.2em] font-semibold text-slate-400 uppercase mb-1">
                  Quick Check
                </p>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  BMI Calculator
                </h3>
              </div>
              <button
                onClick={() => setShowMobileBmi(false)}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-red-100 hover:border-red-200 text-slate-500 hover:text-red-500 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
                aria-label="Close BMI calculator"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g. 165"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/30 focus:border-[#EC4899] text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="e.g. 62"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/30 focus:border-[#FF6B4A] text-slate-800"
                />
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#ffdee4] p-4 border border-[#f8c8d0]">
              {bmi ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Your BMI</p>
                    <p className="text-3xl font-black text-slate-900 leading-none mt-1">
                      {bmi.value}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${bmi.color}`}>{bmi.label}</span>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Fill both fields to view your BMI score.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

        {/* Bottom stats with stagger — full width */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#ffdee4]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 py-8 text-center">
          {[
            { val: "18K+", label: "Active Members" },
            { val: "4.6", label: "App Rating" },
            { val: "550+", label: "Cal/Session" },
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
        </div>
    </section>
  );
}
