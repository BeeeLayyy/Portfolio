"use client";

import { useEffect, useRef } from "react";

// Lusion paints the screen where the cursor moves. This is a light version:
// a soft blue trail that follows the mouse and fades within a second. It
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

    let last: { x: number; y: number } | null = null;
    let lastMove = 0;
    let frame = 0;
    const points: { x: number; y: number }[] = [];

    const tick = (now: number) => {
      // Fade what's there, then draw the newest stretch of the path.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0,0,0,0.09)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "source-over";
      if (points.length) {
        context.strokeStyle = color;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 14;
        context.globalAlpha = 0.35;
        context.beginPath();
        const start = last ?? points[0];
        context.moveTo(start.x, start.y);
        for (const p of points) context.lineTo(p.x, p.y);
        context.stroke();
        context.globalAlpha = 1;
        last = points[points.length - 1];
        points.length = 0;
      }
      // Keep fading for a second after the mouse stops, then sleep.
      frame = now - lastMove < 1200 ? requestAnimationFrame(tick) : 0;
      if (!frame) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        last = null;
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
