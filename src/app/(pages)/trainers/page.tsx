"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";
import { Award, Users, Sparkles } from "lucide-react";

const trainers = [
  {
    name: "Parul",
    role: "Zumba Instructor",
    image: "/trainers/parul.jpg",
    experience: "8+ Years",
    clients: "7,500+",
    specialty: "PCOD & Hormonal Balance Expert",
    tags: ["Energetic", "Results-Focused", "Empowering"],
    bio: "Parul brings infectious energy to every session. With 8+ years of experience, she specializes in helping women with PCOD & hormonal issues through fitness.",
    accent: "from-pink-500 to-rose-500",
    accentLight: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    name: "Shivangi",
    role: "Zumba & Flexibility Coach",
    image: "/trainers/shivangi.jpg",
    experience: "10+ Years",
    clients: "6,500+",
    specialty: "Stress Relief Expert",
    tags: ["Calming", "Mindful", "Gentle"],
    bio: "Shivangi's classes are a sanctuary for stress relief. Her 10+ years in Zumba & flexibility training help women find balance and inner peace through movement.",
    accent: "from-violet-500 to-purple-600",
    accentLight: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    name: "Vanshika",
    role: "Strength & Power Yoga Coach",
    image: "/trainers/vanshika.jpeg",
    experience: "3+ Years",
    clients: "12,000+",
    specialty: "Women-Focused Training",
    tags: ["Dynamic", "Challenging", "Inspiring"],
    bio: "Vanshika pushes boundaries with her dynamic training style. Despite being the youngest, she's already transformed 12,000+ lives with her women-focused approach.",
    accent: "from-[#FF6B4A] to-[#EC4899]",
    accentLight: "bg-orange-50 text-[#FF6B4A] border-orange-200",
  },
];

export default function TrainersPage() {
  return (
    <main>
      <div className="pt-16 lg:pt-20" />

      <section className="pt-10 pb-20 md:pb-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#FF6B4A]/10 text-[#FF6B4A] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Our Expert Team
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Meet the experts <br className="hidden sm:block" />
              behind your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899]">results</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-4 max-w-lg mx-auto">
              Certified, passionate, and dedicated to transforming your fitness journey.
            </p>
          </div>

          {/* Trainer Cards */}
          <div className="flex flex-col gap-8">
            {trainers.map((trainer, i) => (
              <div
                key={trainer.name}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${trainer.accent}`} />

                <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                  {/* Image */}
                  <div className="relative w-full md:w-[320px] lg:w-[380px] h-72 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Experience badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                      {trainer.experience}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">
                      {trainer.name}
                    </h2>
                    <p className="text-[#FF6B4A] text-sm font-bold mb-4">{trainer.role}</p>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-6">
                      {trainer.bio}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${trainer.accent} flex items-center justify-center`}>
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-slate-900 font-bold text-sm">{trainer.clients}</p>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Happy Clients</p>
                        </div>
                      </div>
                      <div className="w-px h-10 bg-slate-100" />
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${trainer.accent} flex items-center justify-center`}>
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[#FF6B4A] font-extrabold text-xs leading-tight">{trainer.specialty}</p>
                          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Specialty</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {trainer.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-bold ${trainer.accentLight}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-slate-500 text-sm font-medium mb-5">
              Want to train with our experts?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.25)] transition-all duration-300"
            >
              Book a Session Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
