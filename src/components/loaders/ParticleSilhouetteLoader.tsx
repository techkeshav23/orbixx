"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
  delay: number; // staggered gather delay
}

/**
 * Check if a pixel is "colorful" enough to be part of the logo (not background).
 * The logo bg is dark gray (~45,42,42). Logo elements are vibrant colored.
 */
function isLogoPixel(r: number, g: number, b: number, a: number): boolean {
  if (a < 100) return false;

  const brightness = (r + g + b) / 3;

  // Calculate saturation (how colorful vs gray)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  // Accept if: saturated (colorful parts like orange/pink/teal)
  // OR bright enough (white/light text)
  // Reject dark grayish background
  if (saturation > 0.15 && brightness > 40) return true;
  if (brightness > 100) return true;

  return false;
}

/**
 * Sample visible pixel positions from the logo image.
 */
function sampleLogoPoints(
  img: HTMLImageElement,
  screenW: number,
  screenH: number,
  targetCount: number
): [number, number, number, number, number, number][] {
  const offCanvas = document.createElement("canvas");
  const maxSize = Math.min(screenW, screenH) * 0.55;
  const aspect = img.width / img.height;
  let drawW: number, drawH: number;
  if (aspect >= 1) {
    drawW = maxSize;
    drawH = maxSize / aspect;
  } else {
    drawH = maxSize;
    drawW = maxSize * aspect;
  }

  // Sample at reasonable resolution for pixel detection
  const sampleScale = Math.min(1, 500 / Math.max(drawW, drawH));
  const sw = Math.round(drawW * sampleScale);
  const sh = Math.round(drawH * sampleScale);
  offCanvas.width = sw;
  offCanvas.height = sh;

  const offCtx = offCanvas.getContext("2d", { willReadFrequently: true })!;
  offCtx.drawImage(img, 0, 0, sw, sh);
  const imageData = offCtx.getImageData(0, 0, sw, sh);
  const data = imageData.data;

  const visiblePixels: [number, number, number, number, number, number][] = [];
  const offsetX = (screenW - drawW) / 2;
  const offsetY = (screenH - drawH) / 2;

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (isLogoPixel(r, g, b, a)) {
        const screenX = offsetX + x / sampleScale;
        const screenY = offsetY + y / sampleScale;
        visiblePixels.push([screenX, screenY, r, g, b, a]);
      }
    }
  }

  // Randomly sample from visible pixels
  const points: [number, number, number, number, number, number][] = [];
  for (let i = 0; i < targetCount; i++) {
    const src = visiblePixels[Math.floor(Math.random() * visiblePixels.length)];
    if (src) {
      points.push([
        src[0] + (Math.random() - 0.5) * (1.5 / sampleScale),
        src[1] + (Math.random() - 0.5) * (1.5 / sampleScale),
        src[2],
        src[3],
        src[4],
        src[5],
      ]);
    }
  }
  return points;
}

export default function ParticleSilhouetteLoader({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);

    // Fill black immediately
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    // Load real logo image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/logo.png";

    img.onload = () => {
      // Aggressively reduce particles on mobile for smooth 60fps
      const isMobile = W < 768;
      const NUM = isMobile
        ? Math.min(300, Math.max(150, Math.round(W * H / 3000)))
        : Math.min(2000, Math.max(800, Math.round(W * H / 800)));
      const logoPoints = sampleLogoPoints(img, W, H, NUM);

      const particles: Particle[] = [];
      for (let i = 0; i < logoPoints.length; i++) {
        const [tx, ty, r, g, b, a] = logoPoints[i];
        const angle = Math.random() * Math.PI * 2;
        const dist = 150 + Math.random() * Math.max(W, H) * 0.45;
        particles.push({
          x: W / 2 + Math.cos(angle) * dist,
          y: H / 2 + Math.sin(angle) * dist,
          tx,
          ty,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: isMobile ? 2 + Math.random() * 2 : 1 + Math.random() * 1.8,
          r,
          g,
          b,
          a: a / 255,
          delay: Math.random() * 200, // stagger delay in ms
        });
      }

      let raf = 0;
      let exploding = false;
      const startTime = performance.now();
      const cx = W / 2;
      const cy = H / 2;

      // ── TIME-BASED TIMELINE (milliseconds) — same speed on every device ──
      // 0–500ms:      swirl (particles orbit center)
      // 500–1000ms:   gather (particles fly to logo positions) — 0.5s
      // 1000–1500ms:  hold (logo visible, shimmer) — 0.5s
      // 1500ms:       explode (cinematic) — 1s
      // 2500ms:       done
      const SWIRL_END = 500;
      const GATHER_END = 1000;
      const HOLD_END = 1500;
      const TOTAL = 2500;

      const animate = () => {
        const t = performance.now() - startTime; // elapsed ms

        // Clear with slight trail for motion blur during swirl/gather,
        // full clear during hold for crisp logo
        if (t > GATHER_END && !exploding) {
          ctx.fillStyle = "rgba(0,0,0,0.35)";
        } else {
          ctx.fillStyle = "rgba(0,0,0,0.14)";
        }
        ctx.fillRect(0, 0, W, H);

        const swirlPhase = t <= SWIRL_END;
        const gatherPhase = t > SWIRL_END && t < GATHER_END;
        const holdPhase = t >= GATHER_END && !exploding;

        if (t >= HOLD_END && !exploding) {
          exploding = true;
          setPhase(2);
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (exploding) {
            const explodeT = t - HOLD_END;
            const dx = p.x - cx;
            const dy = p.y - cy;
            // Fast inverse distance — avoid sqrt, use dx*dx+dy*dy
            const distSq = dx * dx + dy * dy;
            const invDist = distSq > 0 ? 1 / (Math.sqrt(distSq)) : 1;
            const force = Math.min(1.8, (explodeT / 1000) * 0.95);
            p.vx += dx * invDist * force + (Math.random() - 0.5) * 0.8;
            p.vy += dy * invDist * force + (Math.random() - 0.5) * 0.8;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.988;
            p.a *= 0.98;
          } else if (holdPhase) {
            const dx = p.tx - p.x;
            const dy = p.ty - p.y;
            p.x += dx * 0.15 + Math.sin(t * 0.005 + p.tx) * 0.2;
            p.y += dy * 0.15 + Math.cos(t * 0.005 + p.ty) * 0.2;
          } else if (gatherPhase) {
            const effectiveT = t - SWIRL_END - p.delay;
            if (effectiveT > 0) {
              const dx = p.tx - p.x;
              const dy = p.ty - p.y;
              const progress = Math.min(1, effectiveT / 1000);
              const spring = 0.05 + progress * 0.10;
              const damp = 0.80 - progress * 0.06;
              p.vx += dx * spring;
              p.vy += dy * spring;
              p.vx *= damp;
              p.vy *= damp;
            } else {
              const dx = cx - p.x;
              const dy = cy - p.y;
              const distSq = dx * dx + dy * dy;
              const invDist = distSq > 0 ? 1 / Math.sqrt(distSq) : 1;
              p.vx += -dy * invDist * 0.25;
              p.vy += dx * invDist * 0.25;
              p.vx *= 0.97;
              p.vy *= 0.97;
            }
            p.x += p.vx;
            p.y += p.vy;
          } else if (swirlPhase) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const invDist = distSq > 0 ? 1 / Math.sqrt(distSq) : 1;
            p.vx += -dy * invDist * 0.35;
            p.vy += dx * invDist * 0.35;
            p.vx += dx * 0.0008;
            p.vy += dy * 0.0008;
            p.vx *= 0.97;
            p.vy *= 0.97;
            p.x += p.vx;
            p.y += p.vy;
          }

          if (p.size < 0.15 || p.a < 0.01) continue;

          // fillRect is 5-10x faster than beginPath+arc+fill on mobile
          const s = p.size;
          const alpha = Math.min(1, p.a);
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
          ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
        }

        // Subtle brand glow pulse while logo is held
        if (t > 1100 && t < HOLD_END) {
          const pulse = Math.sin((t - 1100) * 0.008) * 0.025;
          if (pulse > 0) {
            ctx.fillStyle = `rgba(255,107,74,${pulse})`;
            ctx.fillRect(0, 0, W, H);
          }
        }

        // Company name text — fades in during gather, holds, fades out during explode
        if (t > 600) {
          const logoBottomY = H / 2 + Math.min(W, H) * 0.55 * 0.5 * 0.52;
          const textY = logoBottomY + 30;

          let textAlpha = 0;
          if (t >= 600 && t < 1000) {
            // Fade in during gather phase
            textAlpha = Math.min(1, (t - 600) / 400);
          } else if (t >= 1000 && t <= HOLD_END) {
            // Full visible during hold
            textAlpha = 1;
          } else if (t > HOLD_END && t < HOLD_END + 800) {
            // Fade out during explosion
            textAlpha = Math.max(0, 1 - (t - HOLD_END) / 800);
          }

          if (textAlpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = textAlpha * 0.9;

            const fontSize = Math.min(W * 0.07, 42);
            ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            const grad = ctx.createLinearGradient(W / 2 - 80, textY, W / 2 + 80, textY);
            grad.addColorStop(0, "#FF6B4A");
            grad.addColorStop(0.5, "#EC4899");
            grad.addColorStop(1, "#FF6B4A");
            ctx.fillStyle = grad;
            ctx.shadowColor = "rgba(255,107,74,0.4)";
            ctx.shadowBlur = 12;
            ctx.fillText("ORBIXX", W / 2, textY);
            ctx.shadowBlur = 0;

            ctx.globalAlpha = textAlpha * 0.5;
            const subSize = Math.min(W * 0.03, 16);
            ctx.font = `400 ${subSize}px system-ui, -apple-system, sans-serif`;
            ctx.fillStyle = "#ffdee4";
            ctx.letterSpacing = "0.15em";
            ctx.fillText("F I T N E S S", W / 2, textY + fontSize + 6);

            ctx.restore();
          }
        }

        if (t < TOTAL) {
          raf = requestAnimationFrame(animate);
        } else {
          setPhase(3);
          setTimeout(() => onComplete?.(), 400);
        }
      };

      setPhase(1);
      raf = requestAnimationFrame(animate);

      const cleanup = () => cancelAnimationFrame(raf);
      (canvas as any).__cleanup = cleanup;
    };

    // Fallback if image fails to load
    img.onerror = () => {
      setPhase(3);
      setTimeout(() => onComplete?.(), 300);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: phase >= 3 ? 0 : 1, transition: "opacity 0.6s" }}
      />
      <div
        className="absolute inset-0 bg-white transition-opacity duration-600"
        style={{ opacity: phase >= 3 ? 1 : 0 }}
      />
    </div>
  );
}
