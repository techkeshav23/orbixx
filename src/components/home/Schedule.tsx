"use client";

import { useInView } from "@/lib/hooks";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Schedule() {
  const { ref, inView } = useInView();

  const morningSlots = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
  const eveningSlots = ["5 PM", "6 PM", "7 PM", "8 PM", "10 PM"];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
            // FLEXIBILITY IN TIME SLOTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Your schedule.
            <br />
            Your choice.
          </h2>
          <p className="text-slate-500 text-base mt-4 font-medium">
            Choose any slot · Any day · Unlimited times 🤯
          </p>
        </div>

        {/* Time Slots Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Morning Slots */}
          <div
            className={`bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-100/60 rounded-2xl p-7 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                🌅
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Morning Batches</h3>
                <p className="text-slate-500 text-xs">Start your day with energy</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {morningSlots.map((slot, i) => (
                <div
                  key={slot}
                  className={`group relative bg-white border border-amber-200/60 rounded-xl px-4 py-3 text-center hover:border-[#FF6B4A] hover:shadow-md hover:shadow-[#FF6B4A]/5 transition-all duration-300 cursor-pointer flex-1 min-w-[70px] ${
                    inView
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <span className="text-slate-800 font-bold text-sm group-hover:text-[#FF6B4A] transition-colors duration-300">
                    {slot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Slots */}
          <div
            className={`bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100/60 rounded-2xl p-7 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                🌙
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Evening Batches</h3>
                <p className="text-slate-500 text-xs">Unwind & burn after work</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {eveningSlots.map((slot, i) => (
                <div
                  key={slot}
                  className={`group relative bg-white border border-indigo-200/60 rounded-xl px-4 py-3 text-center hover:border-[#EC4899] hover:shadow-md hover:shadow-[#EC4899]/5 transition-all duration-300 cursor-pointer flex-1 min-w-[70px] ${
                    inView
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  style={{ transitionDelay: `${450 + i * 80}ms` }}
                >
                  <span className="text-slate-800 font-bold text-sm group-hover:text-[#EC4899] transition-colors duration-300">
                    {slot}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom highlights */}
        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {[
            { icon: "📅", text: "Any Day" },
            { icon: "🔄", text: "Unlimited Classes" },
            { icon: "🎯", text: "Switch Slots Anytime" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-slate-700 text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-10 text-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
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
      </div>
    </section>
  );
}
