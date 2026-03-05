"use client";

import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

const morningSlots = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
const eveningSlots = ["5 PM", "6 PM", "7 PM", "8 PM", "10 PM"];

const weeklySchedule = [
  { day: "Monday",    class: "Zumba",                  emoji: "💃", color: "from-pink-50 to-rose-50",     border: "border-pink-200",    badge: "bg-pink-100 text-pink-700" },
  { day: "Tuesday",   class: "Upper Body / KickBoxing", emoji: "🥊", color: "from-orange-50 to-amber-50",  border: "border-orange-200",  badge: "bg-orange-100 text-orange-700" },
  { day: "Wednesday", class: "Dance Fitness",           emoji: "🎵", color: "from-purple-50 to-violet-50", border: "border-purple-200",  badge: "bg-purple-100 text-purple-700" },
  { day: "Thursday",  class: "Lower Body / Tabata",     emoji: "🔥", color: "from-red-50 to-orange-50",    border: "border-red-200",     badge: "bg-red-100 text-red-700" },
  { day: "Friday",    class: "Bollywood Fitness",       emoji: "⭐", color: "from-yellow-50 to-amber-50",  border: "border-yellow-200",  badge: "bg-yellow-100 text-yellow-700" },
  { day: "Saturday",  class: "Weekend Yoga",            emoji: "🧘", color: "from-teal-50 to-cyan-50",     border: "border-teal-200",    badge: "bg-teal-100 text-teal-700" },
];

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const touchStartX = useRef(0);

  const switchTab = (newTab: 0 | 1) => {
    if (newTab === activeTab || sliding) return;
    setSlideDir(newTab > activeTab ? "left" : "right");
    setSliding(true);
    // After exit animation, swap content and enter
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setSliding(false), 20);
    }, 250);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) switchTab(1);
    else switchTab(0);
  };

  // Compute slide transform + opacity
  const getSlideStyle = (): React.CSSProperties => {
    if (sliding) {
      return {
        transform: `translateX(${slideDir === "left" ? "-60px" : "60px"})`,
        opacity: 0,
        transition: "transform 250ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease",
      };
    }
    return {
      transform: "translateX(0)",
      opacity: 1,
      transition: "transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
    };
  };

  return (
    <main>
      <div className="pt-16 lg:pt-20" />

      <section
        className="pt-6 pb-16 md:pb-20 bg-[#ffdee4]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 rounded-2xl p-1.5 gap-1">
              {["Daily Schedule", "Weekly Schedule"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => switchTab(idx as 0 | 1)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === idx
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Swipe hint — mobile only */}
          <p className="text-center text-slate-400 text-xs font-mono mb-8 sm:hidden">
            ← swipe to switch tabs →
          </p>

          {/* Tab content with slide animation */}
          <div style={getSlideStyle()} className="will-change-transform">
          {activeTab === 0 ? (
            /* ── Daily Schedule ── */
            <div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Morning */}
                <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-100/60 rounded-2xl p-7 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🌅</div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg">Morning Batches</h3>
                      <p className="text-slate-500 text-xs">Start your day with energy</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {morningSlots.map((slot) => (
                      <div key={slot} className="group bg-white border border-amber-200/60 rounded-xl px-4 py-3 text-center hover:border-[#FF6B4A] hover:shadow-md transition-all duration-300 cursor-pointer flex-1 min-w-[70px]">
                        <span className="text-slate-800 font-bold text-sm group-hover:text-[#FF6B4A] transition-colors duration-300">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100/60 rounded-2xl p-7 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">🌙</div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg">Evening Batches</h3>
                      <p className="text-slate-500 text-xs">Unwind & burn after work</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {eveningSlots.map((slot) => (
                      <div key={slot} className="group bg-white border border-indigo-200/60 rounded-xl px-4 py-3 text-center hover:border-[#EC4899] hover:shadow-md transition-all duration-300 cursor-pointer flex-1 min-w-[70px]">
                        <span className="text-slate-800 font-bold text-sm group-hover:text-[#EC4899] transition-colors duration-300">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {[
                  { icon: "📅", text: "Any Day" },
                  { icon: "🔄", text: "Unlimited Classes" },
                  { icon: "🎯", text: "Switch Slots Anytime" },
                  { icon: "📹", text: "Recordings Available" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-slate-700 text-sm font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ── Weekly Schedule ── */
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-3">
                {weeklySchedule.map((item) => (
                  <div
                    key={item.day}
                    className={`flex items-center gap-4 bg-gradient-to-r ${item.color} border ${item.border} rounded-2xl px-5 py-4 hover:shadow-md transition-all duration-300`}
                  >
                    {/* Day badge */}
                    <div className="w-28 shrink-0">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${item.badge}`}>
                        {item.day}
                      </span>
                    </div>
                    {/* Class */}
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{item.emoji}</span>
                      <p className="text-slate-900 font-extrabold text-base">{item.class}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-slate-400 text-xs mt-6 font-mono">
                Sunday = Rest & Recovery 🛌
              </p>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#ffdee4]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            Ready to start your journey?
          </h2>
          <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
            Pick your slot, join a class, and begin your transformation today.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.25)] transition-all duration-300"
          >
            Book Your Slot Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
