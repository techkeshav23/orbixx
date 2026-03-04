"use client";

import { useInView } from "@/lib/hooks";

export default function Schedule() {
  const { ref, inView } = useInView();

  const classes = [
    {
      time: "06:00",
      name: "Morning Zumba Flow",
      trainer: "Parul",
      level: "Beginner",
      intensity: 3,
    },
    {
      time: "08:00",
      name: "Yoga & Stretch",
      trainer: "Shivangi",
      level: "All Levels",
      intensity: 2,
    },
    {
      time: "10:00",
      name: "Bollywood Cardio",
      trainer: "Vanshika",
      level: "Intermediate",
      intensity: 4,
    },
    {
      time: "17:00",
      name: "Power HIIT Burn",
      trainer: "Parul",
      level: "Advanced",
      intensity: 5,
    },
    {
      time: "19:00",
      name: "Dance Cardio Party",
      trainer: "Shivangi",
      level: "All Levels",
      intensity: 4,
    },
    {
      time: "21:00",
      name: "Cool Down Yoga",
      trainer: "Vanshika",
      level: "Beginner",
      intensity: 1,
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
            // TODAY&apos;S SCHEDULE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Classes running
            <br />
            <span className="text-slate-300">all day long.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {classes.map((cls, i) => (
            <div
              key={i}
              className={`group flex items-center gap-4 sm:gap-8 p-5 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-all duration-500 cursor-pointer hover:shadow-sm ${
                inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: `${200 + i * 80}ms`,
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="text-slate-300 font-mono text-sm min-w-[50px] group-hover:text-[#FF6B4A] transition-colors duration-300">
                {cls.time}
              </div>
              <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#FF6B4A] transition-colors duration-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-semibold text-sm sm:text-base truncate group-hover:text-[#FF6B4A] transition-colors duration-300">
                  {cls.name}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {cls.trainer} · {cls.level}
                </p>
              </div>
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className={`w-1.5 h-4 rounded-full transition-colors duration-300 ${
                      j < cls.intensity
                        ? "bg-[#FF6B4A]/30 group-hover:bg-[#FF6B4A]/60"
                        : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
              <svg
                className="w-4 h-4 text-slate-200 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
