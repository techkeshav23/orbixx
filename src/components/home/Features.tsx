"use client";

import React, { useState, useRef, useCallback } from "react";
import { useInView } from "@/lib/hooks";
import { Video, Crown, Smartphone, Target, Clock, Dumbbell, type LucideIcon } from "lucide-react";

export default function Features() {
  const { ref, inView } = useInView(0.1);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardClick = useCallback((i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCard(i);
    timerRef.current = setTimeout(() => setActiveCard(null), 2000);
  }, []);

  const cards: { num: string; title: string; desc: string; color: string; Icon: LucideIcon }[] = [
    {
      num: "01",
      title: "Live Sessions",
      desc: "Real-time classes with trainers who see you, correct your form, and push your limits.",
      color: "#FF6B4A",
      Icon: Video,
    },
    {
      num: "02",
      title: "Women Only",
      desc: "Private, judgment-free space. Dance like nobody\u2019s watching \u2014 because they aren\u2019t.",
      color: "#EC4899",
      Icon: Crown,
    },
    {
      num: "03",
      title: "Any Device",
      desc: "Phone, tablet, laptop. Join from your bedroom, terrace, or while traveling.",
      color: "#14B8A6",
      Icon: Smartphone,
    },
    {
      num: "04",
      title: "All Levels",
      desc: "Whether you\u2019ve never exercised or you\u2019re a fitness junkie \u2014 we\u2019ve got your class.",
      color: "#FF6B4A",
      Icon: Target,
    },
    {
      num: "05",
      title: "Flexibility in Time Slots",
      desc: "Morning: 6 | 7 | 8 | 9 | 10 AM\nEvening: 5 | 6 | 7 | 8 | 10 PM\nChoose Any slot - Any day With Unlimited times 🤯",
      color: "#EC4899",
      Icon: Clock,
    },
    {
      num: "06",
      title: "Expert Trainers",
      desc: "Certified, experienced, and passionate. 50+ trainers across different styles.",
      color: "#14B8A6",
      Icon: Dumbbell,
    },
  ];

  return (
    <section ref={ref} className="pt-16 pb-4 md:pt-20 md:pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
            // WHAT WE OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            Not another fitness app.
            <br />
            A revolution.
          </h2>
        </div>

        {/* Vertical Cards */}
        <div className="flex flex-col gap-5">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
            <div
              key={i}
              className={`group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
              onClick={() => handleCardClick(i)}
            >
              <div className="relative rounded-2xl p-[1px] overflow-hidden">
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{
                    background: `linear-gradient(135deg, ${card.color}30, transparent 50%, ${card.color}15)`,
                  }}
                />
                <div className={`relative bg-white rounded-2xl p-6 sm:p-8 overflow-hidden border-2 shadow-sm transition-all duration-500 ${isActive ? "border-transparent shadow-lg" : "border-slate-200 group-hover:border-transparent group-hover:shadow-lg"}`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 rounded-2xl ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{ background: card.color }}
                  />
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] transition-all duration-700 ${isActive ? "opacity-20" : "opacity-0 group-hover:opacity-20"}`}
                    style={{ background: "#fff" }}
                  />
                  <div className="relative z-10 flex items-center gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${isActive ? "scale-110 rotate-[-4deg] bg-white/20" : "group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:bg-white/20"}`}
                      style={{ backgroundColor: isActive ? undefined : card.color }}
                    >
                      <card.Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-extrabold text-lg tracking-tight transition-all duration-500 ${isActive ? "text-white translate-x-1" : "text-slate-900 group-hover:text-white group-hover:translate-x-1"}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm leading-relaxed font-semibold mt-1 transition-colors duration-500 whitespace-pre-line ${isActive ? "text-white/90" : "text-slate-700 group-hover:text-white/90"}`}>
                        {card.desc}
                      </p>
                    </div>
                    <span
                      className={`text-3xl font-black font-mono leading-none shrink-0 hidden sm:block transition-colors duration-500 ${isActive ? "!text-white/20" : "group-hover:!text-white/20"}`}
                      style={{ color: isActive ? undefined : `${card.color}18` }}
                    >
                      {card.num}
                    </span>
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    style={{
                      background: `linear-gradient(90deg, ${card.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
