"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FreeClassPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const spotsLeft = 50;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = () => {
    const trimmedName = name.trim().slice(0, 50);
    const trimmedPhone = phone.trim();
    if (!trimmedName || !/^[0-9]{10}$/.test(trimmedPhone)) return;
    const safeName = trimmedName.replace(/[^\w\s]/gi, "");
    const msg = encodeURIComponent(
      `Hi! I'm ${safeName}. I'd like to book my FREE Zumba class! My number: ${trimmedPhone}`
    );
    window.open(`${WHATSAPP_URL}?text=${msg}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />

      <div
        className="relative z-10 bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4 text-slate-500"
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

        <div className="p-8 pt-6">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Get Your FREE Zumba Class!
                </h3>
                <p className="text-slate-500 text-sm">
                  Enter your details and we&apos;ll book you in instantly via
                  WhatsApp
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 bg-[#FFF1ED] rounded-full px-4 py-2 mb-6">
                <span className="live-dot w-2 h-2 rounded-full bg-[#FF6B4A]" />
                <span className="text-[#FF6B4A] text-xs font-bold">
                  Only {spotsLeft} spots left this week!
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
                  aria-label="Your Name"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
                  aria-label="Phone Number"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white py-4 rounded-xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                🎯 BOOK MY FREE CLASS
              </button>

              <p className="text-slate-300 text-[10px] text-center mt-4">
                No spam. No card required. Redirects to WhatsApp.
              </p>
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
