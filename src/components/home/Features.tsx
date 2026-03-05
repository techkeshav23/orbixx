"use client";

import React from "react";
import { useInView } from "@/lib/hooks";
import { Video, Crown, Smartphone, Target, Clock, Dumbbell } from "lucide-react";

export default function Features() {
  const { ref, inView } = useInView(0.1);

  const cards = [
    {
      num: "01",
      title: "Live Sessions",
      desc: "Real-time classes with trainers who see you, correct your form, and push your limits.",
      color: "#FF6B4A",
      icon: <Video className="w-6 h-6" />,
    },
    {
      num: "02",
      title: "Women Only",
      desc: "Private, judgment-free space. Dance like nobody\u2019s watching \u2014 because they aren\u2019t.",
      color: "#EC4899",
      icon: <Crown className="w-6 h-6" />,
    },
    {
      num: "03",
      title: "Any Device",
      desc: "Phone, tablet, laptop. Join from your bedroom, terrace, or while traveling.",
      color: "#14B8A6",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      num: "04",
      title: "All Levels",
      desc: "Whether you\u2019ve never exercised or you\u2019re a fitness junkie \u2014 we\u2019ve got your class.",
      color: "#FF6B4A",
      icon: <Target className="w-6 h-6" />,
    },
    {
      num: "05",
      title: "Flexibility in Time Slots",
      desc: "Morning: 6 | 7 | 8 | 9 | 10 AM\nEvening: 5 | 6 | 7 | 8 | 10 PM\nChoose Any slot - Any day With Unlimited times 🤯",
      color: "#EC4899",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      num: "06",
      title: "Expert Trainers",
      desc: "Certified, experienced, and passionate. 50+ trainers across different styles.",
      color: "#14B8A6",
      icon: <Dumbbell className="w-6 h-6" />,
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
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="relative rounded-2xl p-[1px] overflow-hidden">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}30, transparent 50%, ${card.color}15)`,
                  }}
                />
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 overflow-hidden border-2 border-slate-200 group-hover:border-transparent shadow-sm transition-all duration-500">
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-all duration-700"
                    style={{ background: card.color }}
                  />
                  <div className="relative z-10 flex items-center gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                      style={{ background: `${card.color}12`, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-extrabold text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                        {card.title}
                      </h3>
                      <p className="text-slate-700 text-sm leading-relaxed font-semibold mt-1 group-hover:text-slate-800 transition-colors duration-500 whitespace-pre-line">
                        {card.desc}
                      </p>
                    </div>
                    <span
                      className="text-3xl font-black font-mono leading-none shrink-0 hidden sm:block"
                      style={{ color: `${card.color}18` }}
                    >
                      {card.num}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      background: `linear-gradient(90deg, ${card.color}, transparent)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
