"use client";

import { useInView } from "@/lib/hooks";

export default function Testimonials() {
  const { ref, inView } = useInView();

  const stories = [
    {
      quote:
        "I\u2019ve tried every fitness app, gym, and YouTube video. Orbixx is the only thing that actually stuck. 6 months in, 15kg down, and I genuinely look forward to every class.",
      name: "Priya Sharma",
      loc: "Mumbai",
      result: "-15 KG",
      time: "6 months",
    },
    {
      quote:
        "The women-only environment changed everything. No awkward stares, no judgment. Just me, the music, and 200 other women having the time of their lives.",
      name: "Ananya Reddy",
      loc: "Hyderabad",
      result: "2X STAMINA",
      time: "4 months",
    },
    {
      quote:
        "My doctor told me to exercise for my health. I dreaded it until Orbixx. Now my blood pressure is normal, my energy is through the roof, and I\u2019m hooked.",
      name: "Meera Kulkarni",
      loc: "Bangalore",
      result: "+100% ENERGY",
      time: "3 months",
    },
    {
      quote:
        "Post-pregnancy, I thought my body would never recover. Orbixx\u2019s Zumba classes made fitness fun again. Lost 12kg and gained so much confidence!",
      name: "Sneha Desai",
      loc: "Delhi",
      result: "-12 KG",
      time: "5 months",
    },
    {
      quote:
        "From size XL to M \u2014 I still can\u2019t believe it. The trainers remember your name, push you just right, and the community keeps you accountable.",
      name: "Kavita Patil",
      loc: "Pune",
      result: "XL \u2192 M",
      time: "7 months",
    },
    {
      quote:
        "PCOD symptoms reduced drastically within 3 months. My hormonal balance improved and I feel like a completely new person. Orbixx is a lifesaver.",
      name: "Ritu Mehta",
      loc: "Jaipur",
      result: "PCOD RELIEF",
      time: "4 months",
    },
    {
      quote:
        "I dance every morning now. My kids join in too! It\u2019s become a family ritual. The flexible timing makes it so easy to fit into my schedule.",
      name: "Deepika Gupta",
      loc: "Agra",
      result: "-14 KG",
      time: "6 months",
    },
    {
      quote:
        "As a working professional with no time for the gym, Orbixx was a game-changer. 30 minutes from home, real results. Best investment I\u2019ve made in myself.",
      name: "Nisha Thakur",
      loc: "Chennai",
      result: "3X FITNESS",
      time: "3 months",
    },
    {
      quote:
        "I was skeptical about online fitness. After one week of Orbixx, I was addicted. The energy of live classes is unmatched. 10kg down and counting!",
      name: "Swati Joshi",
      loc: "Ahmedabad",
      result: "-10 KG",
      time: "4 months",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[#FF6B4A] text-xs font-mono tracking-[0.3em] uppercase block mb-4">
            // REAL STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
            They did it.
            <br />
            So can you.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <div
              key={i}
              className={`group relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="bg-white border border-slate-100 rounded-2xl p-7 h-full hover:border-slate-200 hover:shadow-lg transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6B4A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#FF6B4A] font-mono font-bold text-sm tracking-wider">
                    {story.result}
                  </span>
                  <span className="text-slate-300 text-xs font-mono">
                    {story.time}
                  </span>
                </div>

                <blockquote className="text-slate-700 text-sm leading-[1.8] mb-8 font-semibold">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B4A]/20 to-[#EC4899]/20 flex items-center justify-center text-slate-500 text-xs font-mono font-bold border border-slate-100">
                    {story.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">
                      {story.name}
                    </p>
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
