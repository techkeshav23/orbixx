"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { carouselImages } from "@/lib/constants";
import { RESULTS_ENABLED } from "@/lib/constants";

export default function Carousel3D({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [viewportWidth, setViewportWidth] = useState(1200);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const autoRotateRef = useRef(true);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = carouselImages.length;

  const { cardWidth, cardHeight, radius } = useMemo(() => {
    const isMobile = viewportWidth < 640;
    const targetRadius = isMobile
      ? Math.min(420, viewportWidth * 0.92)
      : Math.min(700, viewportWidth * 0.52);

    const maxWidthForNoOverlap =
      2 * (targetRadius - 24) * Math.tan(Math.PI / Math.max(count, 3));

    const width = Math.min(
      isMobile ? 112 : 210,
      Math.max(isMobile ? 64 : 110, maxWidthForNoOverlap)
    );

    const computedRadius =
      width / (2 * Math.tan(Math.PI / Math.max(count, 3))) + 24;

    return {
      cardWidth: Math.round(width),
      cardHeight: Math.round(width * 1.45),
      radius: Math.round(computedRadius),
    };
  }, [count, viewportWidth]);

  const step = 360 / count;

  const applyAngle = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }
  }, []);

  const startMomentum = useCallback(() => {
    const decel = () => {
      if (draggingRef.current) return;

      if (Math.abs(velocityRef.current) > 0.03) {
        velocityRef.current *= 0.95;
        angleRef.current += velocityRef.current;
        applyAngle();
        rafRef.current = requestAnimationFrame(decel);
      } else {
        velocityRef.current = 0;
        window.setTimeout(() => {
          autoRotateRef.current = true;
        }, 1800);
      }
    };

    rafRef.current = requestAnimationFrame(decel);
  }, [applyAngle]);

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      angleRef.current = 0;
      velocityRef.current = 0;
      autoRotateRef.current = true;
      draggingRef.current = false;
      applyAngle();

      const tick = () => {
        if (autoRotateRef.current && !draggingRef.current) {
          angleRef.current -= 0.08;
          applyAngle();
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(rafRef.current);
    };
  }, [open, applyAngle]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    autoRotateRef.current = false;
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
    if (innerRef.current) innerRef.current.style.transition = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    const delta = dx * 0.33;
    velocityRef.current = delta;
    angleRef.current += delta;
    applyAngle();
    lastXRef.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (innerRef.current) innerRef.current.style.transition = "";
    startMomentum();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
        aria-label="Close"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="relative z-[110] text-center mb-6 sm:mb-8 mt-16 sm:mt-8">
        <p className="text-white/40 text-xs font-mono tracking-[0.3em] uppercase mb-1">
          Drag to rotate
        </p>
        <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight">
          Real Transformations
        </h3>
      </div>

      {/* 3D ring */}
      <div
        ref={containerRef}
        className="relative z-[105] w-full h-[420px] sm:h-[560px] flex items-center justify-center select-none touch-none"
        style={{ perspective: "1300px" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={innerRef}
          className="relative"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformStyle: "preserve-3d",
            transform: "rotateY(0deg)",
          }}
        >
          {carouselImages.map((img, index) => {
            const rot = step * index;
            return (
              <div
                key={`${img.src}-${index}`}
                className="absolute top-0 left-0 rounded-2xl overflow-hidden shadow-2xl border border-white/15"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes={`${cardWidth}px`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5">
                  <p className="text-white font-bold text-[11px] sm:text-sm leading-tight truncate">
                    {img.name}
                  </p>
                  <p className="text-[#FF6B4A] text-[10px] sm:text-xs font-mono font-bold">
                    {img.result}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer link */}
      {RESULTS_ENABLED && (
        <div className="relative z-[110] mt-6 sm:mt-8 mb-8">
          <Link
            href="/results"
            className="text-white/50 hover:text-white text-xs font-mono tracking-wider transition-colors duration-300 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            View all details
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
