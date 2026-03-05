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
      const NUM = Math.min(3000, Math.max(1000, Math.round(W * H / 600)));
      const logoPoints = sampleLogoPoints(img, W, H, NUM);

      const particles: Particle[] = [];
      for (let i = 0; i < logoPoints.length; i++) {
        const [tx, ty, r, g, b, a] = logoPoints[i];
        // Start at random positions in a ring around center
        const angle = Math.random() * Math.PI * 2;
        const dist = 150 + Math.random() * Math.max(W, H) * 0.45;
        particles.push({
          x: W / 2 + Math.cos(angle) * dist,
          y: H / 2 + Math.sin(angle) * dist,
          tx,
          ty,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: 1 + Math.random() * 1.8,
          r,
          g,
          b,
          a: a / 255,
          delay: Math.random() * 25, // stagger so they don't all arrive at once
        });
      }

      let frame = 0;
      let exploding = false;
      let raf = 0;

      // Timeline (at ~60fps):
      // 0–70:     swirl (particles orbit center)
      // 70–230:   gather (particles fly to logo positions)
      // 230–350:  hold (logo visible, particles shimmer — ~2 seconds)
      // 350:      explode (slow, cinematic)
      // 520:      done

      const animate = () => {
        frame++;

        // Clear with slight trail for motion blur during swirl/gather,
        // full clear during hold for crisp logo
        if (frame > 230 && !exploding) {
          ctx.fillStyle = "rgba(0,0,0,0.35)";
        } else {
          ctx.fillStyle = "rgba(0,0,0,0.14)";
        }
        ctx.fillRect(0, 0, W, H);

        const swirlPhase = frame <= 70;
        const gatherPhase = frame > 70 && frame < 230;
        const holdPhase = frame >= 230 && !exploding;

        if (frame === 350) {
          exploding = true;
          setPhase(2);
        }

        for (const p of particles) {
          if (exploding) {
            // Slow cinematic explode outward
            const explodeFrame = frame - 350;
            const dx = p.x - W / 2;
            const dy = p.y - H / 2;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            // Gentle initial push that ramps up over time
            const force = Math.min(1.2, explodeFrame * 0.008);
            p.vx += (dx / dist) * force + (Math.random() - 0.5) * 0.6;
            p.vy += (dy / dist) * force + (Math.random() - 0.5) * 0.6;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.993;
            p.a *= 0.988;
          } else if (holdPhase) {
            // Gentle shimmer around target position
            const dx = p.tx - p.x;
            const dy = p.ty - p.y;
            p.vx = dx * 0.15;
            p.vy = dy * 0.15;
            // Tiny breathing motion
            p.x += p.vx + Math.sin(frame * 0.08 + p.tx) * 0.2;
            p.y += p.vy + Math.cos(frame * 0.08 + p.ty) * 0.2;
          } else if (gatherPhase) {
            // Gather toward logo position with stagger delay
            const effectiveFrame = frame - 70 - p.delay;
            if (effectiveFrame > 0) {
              const dx = p.tx - p.x;
              const dy = p.ty - p.y;
              // Progressive spring — gets stronger as gather continues
              const progress = Math.min(1, effectiveFrame / 120);
              const spring = 0.03 + progress * 0.06;
              const damp = 0.82 - progress * 0.05;
              p.vx += dx * spring;
              p.vy += dy * spring;
              p.vx *= damp;
              p.vy *= damp;
            } else {
              // Still swirling until delay elapses
              const dx = W / 2 - p.x;
              const dy = H / 2 - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              p.vx += (-dy / dist) * 0.25;
              p.vy += (dx / dist) * 0.25;
              p.vx *= 0.97;
              p.vy *= 0.97;
            }
            p.x += p.vx;
            p.y += p.vy;
          } else if (swirlPhase) {
            // Clean orbital swirl around center
            const dx = W / 2 - p.x;
            const dy = H / 2 - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            // Tangential orbital force
            p.vx += (-dy / dist) * 0.35;
            p.vy += (dx / dist) * 0.35;
            // Gentle inward pull to keep them from flying off
            p.vx += dx * 0.0008;
            p.vy += dy * 0.0008;
            p.vx *= 0.97;
            p.vy *= 0.97;
            p.x += p.vx;
            p.y += p.vy;
          }

          if (p.size < 0.15 || p.a < 0.01) continue;

          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.3, p.size), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${Math.min(1, p.a)})`;
          ctx.fill();
        }

        // Subtle brand glow pulse while logo is held
        if (frame > 250 && frame < 350) {
          const pulse = Math.sin((frame - 250) * 0.06) * 0.025;
          if (pulse > 0) {
            ctx.fillStyle = `rgba(255,107,74,${pulse})`;
            ctx.fillRect(0, 0, W, H);
          }
        }

        // Company name text — fades in during hold, fades out during explode
        if (frame > 120) {
          const logoBottomY = H / 2 + Math.min(W, H) * 0.55 * 0.5 * 0.52;
          const textY = logoBottomY + 30;

          let textAlpha = 0;
          if (frame >= 120 && frame < 180) {
            // Fade in
            textAlpha = Math.min(1, (frame - 120) / 60);
          } else if (frame >= 180 && frame <= 350) {
            // Full visible during hold
            textAlpha = 1;
          } else if (frame > 350 && frame < 440) {
            // Fade out during explosion
            textAlpha = Math.max(0, 1 - (frame - 350) / 90);
          }

          if (textAlpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = textAlpha * 0.9;

            // "ORBIXX" main name
            const fontSize = Math.min(W * 0.07, 42);
            ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            // Gradient fill
            const grad = ctx.createLinearGradient(W / 2 - 80, textY, W / 2 + 80, textY);
            grad.addColorStop(0, "#FF6B4A");
            grad.addColorStop(0.5, "#EC4899");
            grad.addColorStop(1, "#FF6B4A");
            ctx.fillStyle = grad;
            ctx.shadowColor = "rgba(255,107,74,0.4)";
            ctx.shadowBlur = 12;
            ctx.fillText("ORBIXX", W / 2, textY);
            ctx.shadowBlur = 0;

            // ".fitness" subtitle
            ctx.globalAlpha = textAlpha * 0.5;
            const subSize = Math.min(W * 0.03, 16);
            ctx.font = `400 ${subSize}px system-ui, -apple-system, sans-serif`;
            ctx.fillStyle = "#ffdee4";
            ctx.letterSpacing = "0.15em";
            ctx.fillText("F I T N E S S", W / 2, textY + fontSize + 6);

            ctx.restore();
          }
        }

        if (frame < 520) {
          raf = requestAnimationFrame(animate);
        } else {
          setPhase(3);
          setTimeout(() => onComplete?.(), 600);
        }
      };

      setPhase(1);
      raf = requestAnimationFrame(animate);

      // Cleanup stored in a ref-like closure
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
