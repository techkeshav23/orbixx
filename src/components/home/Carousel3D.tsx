"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { carouselImages } from "@/lib/constants";

export default function Carousel3D({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [, forceRender] = useState(0);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const autoRotateRef = useRef(true);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animFrame = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const count = carouselImages.length;
  const step = 360 / count;

  const applyAngle = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    let running = true;
    const tick = () => {
      if (!running) return;
      if (autoRotateRef.current && !draggingRef.current) {
        angleRef.current -= 0.12;
        applyAngle();
      }
      requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animFrame.current);
    };
  }, [open, applyAngle]);

  const startMomentum = useCallback(() => {
    const decel = () => {
      if (draggingRef.current) return;
      if (Math.abs(velocity.current) > 0.05) {
        velocity.current *= 0.95;
        angleRef.current += velocity.current;
        applyAngle();
        requestAnimationFrame(decel);
      } else {
        velocity.current = 0;
        setTimeout(() => {
          autoRotateRef.current = true;
        }, 2000);
      }
    };
    requestAnimationFrame(decel);
  }, [applyAngle]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      angleRef.current = 0;
      velocity.current = 0;
      autoRotateRef.current = true;
      draggingRef.current = false;
      forceRender((n) => n + 1);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    autoRotateRef.current = false;
    velocity.current = 0;
    lastX.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
    if (innerRef.current) innerRef.current.style.transition = "none";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastX.current;
    velocity.current = dx * 0.4;
    angleRef.current += dx * 0.4;
    applyAngle();
    lastX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (innerRef.current) innerRef.current.style.transition = "";
    startMomentum();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    draggingRef.current = true;
    autoRotateRef.current = false;
    velocity.current = 0;
    lastX.current = e.touches[0].clientX;
    if (innerRef.current) innerRef.current.style.transition = "none";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const dx = e.touches[0].clientX - lastX.current;
    velocity.current = dx * 0.4;
    angleRef.current += dx * 0.4;
    applyAngle();
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (innerRef.current) innerRef.current.style.transition = "";
    startMomentum();
  };

  if (!open) return null;

  const radius = window.innerWidth < 640 ? 200 : 340;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_0.3s_ease]" />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 group"
        aria-label="Close"
      >
        <svg
          className="w-5 h-5 text-white"
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

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[110] text-center">
        <p className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-1">
          Drag to rotate
        </p>
        <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight">
          Real Transformations
        </h3>
      </div>

      <div
        ref={containerRef}
        className="relative z-[105] select-none w-full h-[400px] sm:h-[450px] flex items-center justify-center touch-none"
        style={{ perspective: "1000px" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={innerRef}
          className="relative"
          style={{
            width: "180px",
            height: "240px",
            transformStyle: "preserve-3d",
            transform: `rotateY(0deg)`,
          }}
        >
          {carouselImages.map((img, i) => {
            const rot = step * i;
            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-[180px] h-[240px] sm:w-[200px] sm:h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/15"
                style={{
                  transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{img.name}</p>
                  <p className="text-[#FF6B4A] text-xs font-mono font-bold">
                    {img.result}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110]">
        <Link
          href="/results"
          className="text-white/50 hover:text-white text-xs font-mono tracking-wider transition-colors duration-300 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          View all details
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
