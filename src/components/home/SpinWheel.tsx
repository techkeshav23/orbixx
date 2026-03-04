"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_URL, wheelOffers } from "@/lib/constants";

export default function SpinWheel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [phone, setPhone] = useState("");
  const [claimed, setClaimed] = useState(false);
  const count = wheelOffers.length;
  const segAngle = 360 / count;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setResult(null);
      setSpinning(false);
      setRotation(0);
      setClaimed(false);
      setPhone("");
    } else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const winIndex = Math.floor(Math.random() * count);
    const targetAngle =
      360 * 5 + (360 - winIndex * segAngle - segAngle / 2);
    setRotation((prev) => prev + targetAngle);
    setTimeout(() => {
      setSpinning(false);
      setResult(winIndex);
    }, 4500);
  };

  const claimReward = () => {
    const trimmedPhone = phone.trim();
    if (!/^[0-9]{10}$/.test(trimmedPhone) || result === null) return;
    const offer = wheelOffers[result];
    const msg = encodeURIComponent(
      `Hi! I won "${offer.label}" on the Orbixx Spin Wheel! My number: ${trimmedPhone}. Please apply my reward!`
    );
    window.open(`${WHATSAPP_URL}?text=${msg}`, "_blank", "noopener,noreferrer");
    setClaimed(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_0.3s_ease]" />

      <div
        className="relative z-10 bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl animate-[popIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 bg-gradient-to-r from-[#FF6B4A] via-[#EC4899] to-[#14B8A6]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
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

        <div className="p-6 pt-5">
          <div className="text-center mb-5">
            <h3 className="text-xl font-black text-slate-900">
              🎰 Spin & Win!
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Try your luck — every spin wins!
            </p>
          </div>

          {/* Wheel */}
          <div className="relative mx-auto w-[260px] h-[260px] mb-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#FF6B4A] drop-shadow-md" />
            </div>

            <div
              className="w-full h-full rounded-full border-4 border-slate-200 overflow-hidden shadow-inner"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "none",
              }}
            >
              <svg viewBox="0 0 260 260" className="w-full h-full">
                {wheelOffers.map((offer, i) => {
                  const startAngle = i * segAngle;
                  const endAngle = startAngle + segAngle;
                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;
                  const cx = 130,
                    cy = 130,
                    r = 130;
                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);
                  const largeArc = segAngle > 180 ? 1 : 0;
                  const midAngle =
                    ((startAngle + segAngle / 2 - 90) * Math.PI) / 180;
                  const textR = r * 0.62;
                  const tx = cx + textR * Math.cos(midAngle);
                  const ty = cy + textR * Math.sin(midAngle);
                  const textAngle = startAngle + segAngle / 2;
                  const colors = i % 2 === 0 ? "#fff8f6" : "#f0fdfa";

                  return (
                    <g key={i}>
                      <path
                        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                        fill={colors}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                        fontSize="11"
                        fontWeight="800"
                        fill={offer.color}
                      >
                        {offer.emoji} {offer.label}
                      </text>
                    </g>
                  );
                })}
                <circle
                  cx="130"
                  cy="130"
                  r="22"
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <text
                  x="130"
                  y="132"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="16"
                >
                  🎯
                </text>
              </svg>
            </div>
          </div>

          {/* Result / Spin button */}
          {result === null ? (
            <button
              onClick={spin}
              disabled={spinning}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                spinning
                  ? "bg-slate-200 text-slate-400 cursor-wait"
                  : "bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {spinning ? "🎰 Spinning..." : "🎯 SPIN THE WHEEL!"}
            </button>
          ) : !claimed ? (
            <div className="space-y-3 animate-[fadeIn_0.4s_ease]">
              <div className="text-center bg-[#FFF1ED] rounded-xl p-3">
                <p className="text-xs text-slate-500">You won</p>
                <p className="text-lg font-black text-[#FF6B4A]">
                  {wheelOffers[result].emoji} {wheelOffers[result].label}!
                </p>
              </div>
              <input
                type="tel"
                placeholder="Enter phone to claim"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/10 transition-all placeholder:text-slate-400"
                aria-label="Phone number"
              />
              <button
                onClick={claimReward}
                className="w-full bg-gradient-to-r from-[#FF6B4A] to-[#EC4899] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_0_40px_rgba(255,107,74,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                🎉 CLAIM ON WHATSAPP
              </button>
            </div>
          ) : (
            <div className="text-center py-4 animate-[fadeIn_0.4s_ease]">
              <div className="text-4xl mb-2">🎊</div>
              <p className="text-slate-900 font-bold">Reward Claimed!</p>
              <p className="text-slate-400 text-xs mt-1">
                Complete on WhatsApp to activate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
