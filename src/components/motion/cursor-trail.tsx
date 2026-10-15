"use client";

import { useEffect, useRef } from "react";

// Lusion paints the screen where the cursor moves. This is a light version:
// a soft streak of blue light that follows the mouse and fades within a
// second. (The hero card has the full warp; see hero-scene/scene.ts.) It
// draws only while the mouse moves, so an idle page costs nothing. Mouse
// only, never with reduced motion. Decorative and click-through.
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // The trail is a smooth curve through the midpoints of recent mouse
    // positions, drawn wide and blurred so it reads as a streak of light
    // rather than a line of dots.
    let mid: { x: number; y: number } | null = null;
    let prev: { x: number; y: number } | null = null;
    let lastMove = 0;
    let frame = 0;
    const points: { x: number; y: number }[] = [];

    const tick = (now: number) => {
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0,0.07)"; // fade what's there a little each frame
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-over";
      if (points.length) {
        context.strokeStyle = color;
        context.shadowColor = color;
        context.shadowBlur = 28;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 22;
        context.globalAlpha = 0.14;
        context.beginPath();
        for (const p of points) {
          if (!prev) {
            prev = p;
            mid = p;
            continue;
          }
          const next = { x: (prev.x + p.x) / 2, y: (prev.y + p.y) / 2 };
          context.moveTo(mid!.x, mid!.y);
          context.quadraticCurveTo(prev.x, prev.y, next.x, next.y);
          prev = p;
          mid = next;
        }
        context.stroke();
        context.globalAlpha = 1;
        context.shadowBlur = 0;
        points.length = 0;
      }
      // Keep fading for a second after the mouse stops, then sleep.
      frame = now - lastMove < 1400 ? requestAnimationFrame(tick) : 0;
      if (!frame) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        prev = null;
        mid = null;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      points.push({ x: event.clientX, y: event.clientY });
      lastMove = performance.now();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 h-full w-full mix-blend-screen"
    />
  );
}
