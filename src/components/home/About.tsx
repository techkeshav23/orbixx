"use client";

import React from "react";
import { useInView } from "@/lib/hooks";
import { Check, X } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="about"
      className="pt-8 pb-10 md:pt-10 md:pb-12 bg-[#ffdee4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Visual */}
          <div
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Main visual — session dashboard */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 shadow-sm">
                <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-[#FF6B4A]/[0.07] rounded-full blur-[80px]" />
                <div className="absolute bottom-10 left-10 w-[180px] h-[180px] bg-[#14B8A6]/[0.06] rounded-full blur-[80px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-[#EC4899]/[0.05] rounded-full blur-[60px]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Animated circular progress ring */}
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90"
                      viewBox="0 0 200 200"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="6"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        stroke="url(#progressGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="553"
                        style={{
                          strokeDashoffset: inView ? "138" : "553",
                          transition:
                            "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.5s",
                        }}
                      />
                      <defs>
                        <linearGradient
                          id="progressGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FF6B4A" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#14B8A6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 ring-spin" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl sm:text-6xl font-black font-mono text-slate-900 leading-none">
                        1<span className="text-3xl sm:text-4xl">hr</span>
                      </span>
                      <span className="text-slate-400 text-[10px] tracking-[0.25em] uppercase mt-1.5 font-mono">
                        per session
                      </span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div
                    className={`flex items-center gap-6 mt-8 transition-all duration-700 ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "800ms" }}
                  >
                    {[
                      { val: "50min", unit: "workout", color: "#FF6B4A" },
                      { val: "10min", unit: "doubt session", color: "#EC4899" },
                      { val: "500+", unit: "cal burn", color: "#14B8A6" },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="font-black font-mono text-lg sm:text-xl leading-none"
                          style={{ color: s.color }}
                        >
                          {s.val}
                        </div>
                        <div className="text-slate-400 text-[9px] tracking-[0.15em] uppercase mt-1">
                          {s.unit}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div
                    className={`flex flex-wrap gap-2 mt-8 justify-center transition-all duration-700 ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "1100ms" }}
                  >
                    {[
                      "High Energy",
                      "Beginner Friendly",
                      "Music-Driven",
                      "Zero Equipment",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="text-slate-500 text-[10px] border border-slate-200 rounded-full px-3.5 py-1.5 bg-white tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Live indicator */}
                  <div
                    className={`flex items-center gap-2 mt-6 transition-all duration-700 ${
                      inView ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1400ms" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] live-dot" />
                    <span className="text-slate-400 text-[9px] font-mono tracking-[0.2em] uppercase">
                      3 classes live now
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div
                className={`absolute -bottom-6 -right-4 sm:-right-8 bg-white rounded-2xl p-5 shadow-lg border border-slate-100 transition-all duration-700 delay-500 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B4A] to-[#EC4899] flex items-center justify-center text-white font-bold font-mono text-sm">
                    #1
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">
                      Rated #1 in India
                    </p>
                    <p className="text-slate-400 text-xs">
                      Women&apos;s Online Fitness
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Comparison Table */}
          <div
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
              // WHY ORBIXX
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
              Orbixx Fitness
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899]">vs. Others</span>
            </h2>

            {/* Comparison Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-[#ffdee4]/50 border-b border-pink-200">
                <div className="px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Features</div>
                <div className="px-3 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Offline</div>
                <div className="px-3 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Other Online</div>
                <div className="px-3 py-3.5 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] uppercase tracking-wider text-center">Orbixx</div>
              </div>

              {/* Table Rows */}
              {[
                { feature: "Certified Celebrity Instructors", offline: false, otherOnline: false, orbixx: true },
                { feature: "1-on-1 Attention", offline: true, otherOnline: false, orbixx: true },
                { feature: "Unlimited LIVE Access", offline: false, otherOnline: false, orbixx: true },
                { feature: "Guaranteed Results", offline: false, otherOnline: false, orbixx: true },
                { feature: "Customer Success Agent", offline: true, otherOnline: false, orbixx: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-4 items-center border-b border-slate-100 last:border-b-0 transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className="px-4 py-4 text-sm font-bold text-slate-800">{row.feature}</div>
                  <div className="flex justify-center py-4">
                    {row.offline ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-500" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center py-4">
                    {row.otherOnline ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-500" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B4A]/20 to-[#EC4899]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#FF6B4A]" strokeWidth={3} />
                    </div>
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
