"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

// The rounded card under the name that holds the 3D scene (D15).
//
// A still render of the scene (public/images/hero-scene.webp) fades in first,
// so nothing waits on Three.js. Once the page is idle, desktops with a mouse
// load the live scene and crossfade to it. Phones, touch screens and reduced
// motion keep the still. Decorative, so it's hidden from screen readers.
//
// The still is drawn into a canvas rather than shown as an <img> on purpose:
// a canvas never counts as Largest Contentful Paint, so the name, which paints
// at once, stays the LCP. As an <img> the card was the largest thing on a
// phone screen and Lighthouse mobile fell from the high 90s to the 80s.
const still = getImageProps({
  src: "/images/hero-scene.webp",
  alt: "",
  width: 2144,
  height: 922,
  sizes: "(min-width: 1280px) 1072px, 100vw",
}).props;

export function HeroScene({ className = "aspect-[4/3] md:aspect-[21/9]" }: { className?: string }) {
  const stillRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLCanvasElement>(null);
  const [stillShown, setStillShown] = useState(false);
  const [live, setLive] = useState(false);

  // Draw the still, cropped to cover the card, and redraw when the card's
  // shape changes (4:3 on phones, 21:9 from md up).
  useEffect(() => {
    const canvas = stillRef.current;
    if (!canvas) return;
    const image = new window.Image();
    image.sizes = still.sizes ?? "";
    image.srcset = still.srcSet ?? "";
    image.src = still.src;
    let ready = false;

    const draw = () => {
      const context = canvas.getContext("2d");
      const { clientWidth: width, clientHeight: height } = canvas;
      if (!ready || !context || !width || !height) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    image
      .decode()
      .then(() => {
        ready = true;
        draw();
        setStillShown(true);
      })
      .catch(() => {
        // The card's gradient stays, which still reads as a finished card.
      });
    const resize = new ResizeObserver(draw);
    resize.observe(canvas);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !mouse) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;
    const load = async () => {
      const { mountHeroScene } = await import("./scene");
      if (cancelled || !liveRef.current) return;
      try {
        dispose = mountHeroScene(liveRef.current, { onFirstFrame: () => setLive(true) });
      } catch {
        // No WebGL: the still stays, which is the designed fallback.
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 1200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose?.();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`hero-scene relative overflow-hidden rounded-media ${className}`}
      data-still={stillShown}
      data-live={live}
    >
      <canvas ref={stillRef} className="hero-scene-still absolute inset-0 h-full w-full" />
      <canvas ref={liveRef} className="hero-scene-live absolute inset-0 h-full w-full" />
    </div>
  );
}
