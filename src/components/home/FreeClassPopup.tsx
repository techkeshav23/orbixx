"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FreeClassPopup({
  open,
  onClose,
  planName,
  planPrice,
}: {
  open: boolean;
  onClose: () => void;
  planName?: string;
  planPrice?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [bellyFat, setBellyFat] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "WhatsApp number is required";
    else if (!/^[0-9]{10}$/.test(phone.trim())) newErrors.phone = "Enter a valid 10-digit number";
    if (!age.trim()) newErrors.age = "Age is required";
    else if (Number(age) < 10 || Number(age) > 80) newErrors.age = "Enter a valid age (10-80)";
    if (!bellyFat) newErrors.bellyFat = "Please select an option";
    if (!goal.trim()) newErrors.goal = "Please tell us your goal";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const safeName = name.trim().slice(0, 50).replace(/[^\w\s]/gi, "");
    const safeGoal = goal.trim().slice(0, 200).replace(/[^\w\s.,!?-]/gi, "");
    const planInfo = planName && planPrice ? `\nPlan: ${planName} (${planPrice})` : "";
    const msg = encodeURIComponent(
      `Hi! I'm ${safeName}.\nAge: ${age.trim()}\nBelly Fat: ${bellyFat}\nGoal: ${safeGoal}\nPhone: ${phone.trim()}${planInfo}\n\nI'd like to start my fitness journey with Orbixx!`
    );
    const url = `${WHATSAPP_URL}?text=${msg}`;
    
    // Use anchor click to avoid popup blockers
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setSubmitted(true);
  };

  if (!open) return null;

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-slate-900 text-sm focus:outline-none transition-all placeholder:text-slate-400 ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-slate-200 bg-slate-50 focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10"
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />

      <div
        className="relative z-10 bg-white rounded-3xl max-w-xl w-full shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6] shrink-0" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all duration-200 cursor-pointer z-10 hover:scale-110 shadow-lg"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-5 sm:p-6 pt-5 sm:pt-5 flex-1 overflow-y-auto">
          {!submitted ? (
            <>
              <div className="text-center mb-3 sm:mb-4 pr-10 sm:pr-0">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                  {planName ? (
                    <>Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899]">{planName}</span></>
                  ) : (
                    <>Ready To Lose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#EC4899]">Weight</span></>
                  )}
                </h3>
                {planPrice && <p className="text-sm font-bold text-slate-700 mb-1">{planPrice}</p>}
                <p className="text-slate-500 text-xs leading-relaxed">
                  Fill the form & tap Submit to connect via WhatsApp!
                </p>
              </div>

              <div className="space-y-2.5 mb-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                    className={inputClass("name")}
                    aria-label="Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setErrors((p) => ({ ...p, phone: "" })); }}
                    className={inputClass("phone")}
                    aria-label="WhatsApp Number"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="Your age"
                    value={age}
                    onChange={(e) => { setAge(e.target.value); setErrors((p) => ({ ...p, age: "" })); }}
                    className={inputClass("age")}
                    aria-label="Age"
                    min={10}
                    max={80}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1 font-medium">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1">Do you have belly fat?</label>
                  <select
                    value={bellyFat}
                    onChange={(e) => { setBellyFat(e.target.value); setErrors((p) => ({ ...p, bellyFat: "" })); }}
                    className={inputClass("bellyFat")}
                    aria-label="Belly Fat"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="A little">A little</option>
                  </select>
                  {errors.bellyFat && <p className="text-red-500 text-xs mt-1 font-medium">{errors.bellyFat}</p>}
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1">Goal</label>
                  <textarea
                    placeholder="e.g. Weight loss, PCOD, Toning, Energy..."
                    value={goal}
                    onChange={(e) => { setGoal(e.target.value); setErrors((p) => ({ ...p, goal: "" })); }}
                    rows={1}
                    className={`${inputClass("goal")} resize-none`}
                    aria-label="Goal"
                  />
                  {errors.goal && <p className="text-red-500 text-xs mt-1 font-medium">{errors.goal}</p>}
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white py-3 rounded-xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Submit to WhatsApp
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                You&apos;re In!
              </h3>
              <p className="text-slate-500 text-sm">
                Complete your booking on WhatsApp. See you in class! 💃
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
