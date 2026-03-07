"use client";

import { useInView, useTextScramble } from "@/lib/hooks";

export default function Stats() {
  const { ref, inView } = useInView(0.3);
  const stat1 = useTextScramble("18,000+", inView, 1000);
  const stat2 = useTextScramble("550+", inView, 1000);
  const stat3 = useTextScramble("150+", inView, 1000);
  const stat4 = useTextScramble("4.6/5", inView, 1000);

  const stats = [
    { display: stat1, label: "ACTIVE MEMBERS", sub: "and growing every day" },
    {
      display: stat2,
      label: "CALORIES PER SESSION",
      sub: "average burn rate",
    },
    { display: stat3, label: "MONTHLY CLASSES", sub: "across all categories" },
    { display: stat4, label: "AVERAGE RATING", sub: "from 10K+ reviews" },
  ];

  return (
    <section
      ref={ref}
      className="pt-8 pb-8 md:pt-10 md:pb-10 bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[600px] h-[40vw] sm:h-[300px] bg-[#FF6B4A]/[0.04] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500">
                {s.display}
              </div>
              <div className="text-[#FF6B4A] text-[10px] font-mono tracking-[0.2em] mt-3 mb-1">
                {s.label}
              </div>
              <div className="text-slate-400 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
