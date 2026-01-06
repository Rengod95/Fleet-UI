'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace('#', '').trim();
  const isShort = value.length === 3 || value.length === 4;
  const isLong = value.length === 6 || value.length === 8;
  if (!isShort && !isLong) return `rgba(255, 255, 255, ${alpha})`;

  const full = isShort
    ? value
        .split('')
        .map((c) => c + c)
        .join('')
    : value;

  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbToRgba(rgb: string, alpha: number) {
  // rgb(1 2 3) / rgb(1,2,3) / rgba(1,2,3,0.5) 등 일부 변형을 커버
  const inner = rgb
    .trim()
    .replace(/^rgba?\(/, '')
    .replace(/\)$/, '')
    .trim();

  const parts = inner
    .split(/[,/\s]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 3) return `rgba(255, 255, 255, ${alpha})`;

  const r = Number(parts[0]);
  const g = Number(parts[1]);
  const b = Number(parts[2]);
  if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) {
    return `rgba(255, 255, 255, ${alpha})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hslToHsla(hsl: string, alpha: number) {
  // hsl(...) / hsla(...) 형태면 alpha만 덮어쓰기
  const inner = hsl
    .trim()
    .replace(/^hsla?\(/, '')
    .replace(/\)$/, '')
    .trim();
  return `hsla(${inner} / ${alpha})`;
}

function colorFromVar(name: string, alpha = 1) {
  const raw = cssVar(name);
  if (!raw) return `rgba(255, 255, 255, ${alpha})`;

  // Case 1) hex tokens: "#00c5ff"
  if (raw.startsWith('#')) return hexToRgba(raw, alpha);

  // Case 2) already css function
  if (raw.startsWith('rgb')) return rgbToRgba(raw, alpha);
  if (raw.startsWith('hsl')) return hslToHsla(raw, alpha);

  // Case 3) space-separated HSL parts (e.g. "240 10% 3.9%")
  if (raw.includes('%') && raw.includes(' ')) return `hsla(${raw} / ${alpha})`;

  // Fallback: try as-is (may still work for some formats), else safe fallback
  // Note: Canvas doesn't support color-mix(), so keep this conservative.
  return `rgba(255, 255, 255, ${alpha})`;
}

export function ParticlesBackground({
  className,
  density = 2,
}: {
  className?: string;
  // 1.0 = baseline density, lower = fewer particles
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    // dynamic colors (theme-aware)
    let c1 = colorFromVar('--primary', 0.45);
    let c2 = colorFromVar('--muted-foreground', 1);
    let c3 = colorFromVar('--foreground', 1);

    function refreshColors() {
      c1 = colorFromVar('--primary', 0.45);
      c2 = colorFromVar('--muted-foreground', 1);
      c3 = colorFromVar('--foreground', 1);
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // particle count scales with area
      const baseCount = Math.round((width * height) / 18000); // ~1 per 18k px
      const count = Math.max(18, Math.round(baseCount * density));

      // keep as much as possible, but adjust count
      if (particles.length > count) particles = particles.slice(0, count);
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.6 + Math.random() * 1.8,
          alpha: 0.35 + Math.random() * 0.55,
        });
      }
    }

    function step() {
      // if parent becomes hidden/0-size (rare), re-measure
      if (width <= 1 || height <= 1) resize();

      ctx.clearRect(0, 0, width, height);

      // subtle vignette wash (helps depth)
      const g = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.35, Math.max(width, height));
      g.addColorStop(0, colorFromVar('--primary', 0.05));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // optional: connecting lines for close particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > 90 * 90) continue;
          const t = 1 - Math.sqrt(dist2) / 90;
          ctx.strokeStyle = colorFromVar('--primary', 0.18 * t);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // three-tone mix for depth
        const pick = Math.random();
        const color = pick < 0.18 ? c1 : pick < 0.65 ? c2 : c3;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(step);
    }

    // keep colors in sync with theme toggles (.dark class on html)
    const mo = new MutationObserver(() => refreshColors());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    refreshColors();
    resize();
    raf = window.requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      ro.disconnect();
      mo.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}

