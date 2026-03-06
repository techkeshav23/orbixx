"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";
import { Zap, Flame, Gem, Crown, Leaf, Lock, MessageCircle, ShieldCheck, Star } from "lucide-react";

const plans = [
  {
    name: "1 Month",
    price: "₹999",
    tag: "Starter",
    icon: <Zap className="w-5 h-5 text-white" />,
    accent: "from-amber-400 to-orange-500",
    accentLight: "bg-amber-50 text-amber-700 border-amber-200",
    features: [
      "Zumba + Other Activities",
      "Weekend Yoga Sessions",
      "Doubt Sessions",
      "Personalized Diet Plan",
      "Weekly Consultation",
      "Recordings of Live Classes",
      "Miss Day Extensions",
      "Flexible Time-Slots",
    ],
  },
  {
    name: "2 Months",
    price: "₹1,599",
    tag: "Value",
    icon: <Flame className="w-5 h-5 text-white" />,
    accent: "from-[#FF6B4A] to-[#EC4899]",
    accentLight: "bg-orange-50 text-[#FF6B4A] border-orange-200",
    features: [
      "Zumba + Other Activities",
      "Weekend Yoga Sessions",
      "Doubt Sessions",
      "Personalized Diet Plan",
      "Weekly Consultation",
      "Recordings of Live Classes",
      "Miss Day Extensions",
      "Flexible Time-Slots",
    ],
  },
  {
    name: "3 Months",
    price: "₹2,199",
    tag: "Best Deal",
    icon: <Gem className="w-5 h-5 text-white" />,
    accent: "from-violet-500 to-purple-600",
    accentLight: "bg-violet-50 text-violet-700 border-violet-200",
    popular: true,
    features: [
      "Zumba + Other Activities",
      "Weekend Yoga Sessions",
      "Doubt Sessions",
      "Personalized Diet Plan",
      "Weekly Consultation",
      "Recordings of Live Classes",
      "Miss Day Extensions",
      "Flexible Time-Slots",
    ],
  },
  {
    name: "Personal Training",
    price: "₹6,999",
    tag: "Premium 1-on-1",
    icon: <Crown className="w-5 h-5 text-white" />,
    accent: "from-rose-500 to-pink-600",
    accentLight: "bg-rose-50 text-rose-700 border-rose-200",
    features: [
      "One-on-one personal interaction",
      "Flexible & convenient timing",
      "Personalized Zumba, Yoga & Fitness guidance",
      "Goal-based personal diet plan",
      "Daily routine & meal structure",
      "Anytime direct contact with trainer",
      "24x7 trainer & dietician support",
      "PDF diet & routine chart",
    ],
  },
  {
    name: "Diet Only",
    price: "₹199",
    tag: "Budget Pick",
    icon: <Leaf className="w-5 h-5 text-white" />,
    accent: "from-teal-400 to-emerald-500",
    accentLight: "bg-teal-50 text-teal-700 border-teal-200",
    features: [
      "Goal-based personalized diet",
      "Indian home-style meals (Veg/Non-Veg)",
      "Daily meal plan (Breakfast, Lunch, Dinner, Snacks)",
      "Portion & calorie guidance",
      "Budget-friendly food options",
      "Meal alternatives / swaps",
      "Hydration & basic lifestyle tips",
      "Easy-to-follow PDF diet chart",
    ],
  },
];

export default function PricingPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <main>
      <div className="pt-16 lg:pt-20" />

      <section className="pt-8 pb-20 md:pb-28 bg-[#ffdee4]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899]">Plan</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-3 max-w-md mx-auto">
              No hidden charges. Cancel anytime. Start your fitness journey today.
            </p>
          </div>

          {/* Accordion Cards */}
          <div className="flex flex-col gap-3">
            {plans.map((plan, i) => {
              const isOpen = openIdx === i;
              const isPopular = "popular" in plan && plan.popular;

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border overflow-hidden transition-all duration-500 bg-white ${
                    isOpen
                      ? "border-slate-200 shadow-xl shadow-slate-200/50"
                      : isPopular
                        ? "border-[#FF6B4A]/30 shadow-sm shadow-[#FF6B4A]/5"
                        : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                  }`}
                >
                  {/* Gradient accent bar */}
                  <div className={`h-1 bg-gradient-to-r ${plan.accent} ${isOpen ? "opacity-100" : "opacity-40"} transition-opacity duration-500`} />

                  {/* Collapsed row — always visible */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between px-5 sm:px-7 py-5 cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-4">
                      {/* Emoji circle */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        {plan.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-slate-900 font-extrabold text-base">{plan.name}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${plan.accentLight}`}>
                            {plan.tag}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs font-mono mt-0.5">{plan.features.length} features included</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">{plan.price}</span>
                      {/* Expand arrow */}
                      <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-180 bg-slate-200" : "group-hover:bg-slate-200"}`}>
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      maxHeight: isOpen ? "600px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 sm:px-7 pb-6 pt-1">
                      <div className="border-t border-slate-100 pt-5">
                        {/* Features grid */}
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                          {plan.features.map((feature, fi) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2.5"
                              style={{ animationDelay: `${fi * 40}ms` }}
                            >
                              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              <span className="text-slate-700 text-sm font-semibold">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 bg-gradient-to-r ${plan.accent} text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300`}
                        >
                          Buy Now — {plan.price}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
