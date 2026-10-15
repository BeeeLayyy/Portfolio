"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState, ViewTransition, type CSSProperties, type ReactNode } from "react";
import type { Image as ProjectImage } from "@/content/types";

// Preview size and gap from the cursor, in px. Matches w-80 and a 16:9 image.
const WIDTH = 320;
const HEIGHT = 180;
const GAP = 24;

// A project row that shows a small screenshot beside the cursor while hovered.
// Mouse only: touch and pen never see it, and on those devices the image is
// display: none, so it isn't downloaded. With reduced motion the preview
// appears where the cursor entered and stays put instead of following.
export function ProjectRowLink({
  href,
  image,
  transitionName,
  className,
  reveal,
  children,
}: {
  href: string;
  image?: ProjectImage;
  /** View-transition name shared with the project page's screenshot. */
  transitionName?: string;
  className?: string;
  /** Rise in on scroll, this many steps into the stagger. Set on the link,
      not the row, so the fixed preview beside it never moves with it. */
  reveal?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [side, setSide] = useState<"right" | "left">("right");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { visualDuration: 0.3, bounce: 0 });
  const springY = useSpring(y, { visualDuration: 0.3, bounce: 0 });
  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  function place(event: React.PointerEvent, jump: boolean) {
    // Flip to the cursor's left near the right edge so it never leaves the screen.
    const flip = event.clientX + GAP + WIDTH > window.innerWidth;
    const left = flip ? event.clientX - GAP - WIDTH : event.clientX + GAP;
    const top = event.clientY - HEIGHT / 2;
    const nextSide = flip ? "left" : "right";
    if (nextSide !== side) setSide(nextSide); // no re-render on every pointer move
    if (jump) {
      x.jump(left);
      y.jump(top);
      springX.jump(left);
      springY.jump(top);
    } else {
      x.set(left);
      y.set(top);
    }
  }

  return (
    <>
      <Link
        href={href}
        className={className}
        data-reveal={reveal === undefined ? undefined : "rise"}
        style={reveal === undefined ? undefined : ({ "--i": reveal } as CSSProperties)}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse" || !image) return;
          place(e, true);
          setShown(true);
        }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse" && image && !reduce) place(e, false);
        }}
        onPointerLeave={() => setShown(false)}
      >
        {children}
        {/* Without a mouse there's no hover preview, so the row shows the
            screenshot itself (display: none with a mouse, so not downloaded).
            It holds the shared name only while the preview doesn't: with two
            named elements React could pair the hidden one and skip the morph. */}
        {image && (
          <ViewTransition name={shown ? undefined : transitionName} share="morph" default="none">
            <Image
              src={image.src}
              alt=""
              width={1600}
              height={900}
              sizes="(min-width: 768px) 1072px, 100vw"
              className="mt-2 rounded-media ring-1 ring-rule pointer-fine:hidden md:col-span-3"
            />
          </ViewTransition>
        )}
      </Link>
      {image && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-40 hidden pointer-fine:block"
          style={{ transform }}
        >
          <div className="project-preview w-80" data-shown={shown} data-side={side}>
            {/* Decorative: the same screenshot, with alt text, is on the project page. */}
            {/* Only claims the shared name while visible, so a keyboard click
                (no hover) doesn't morph from an invisible preview. */}
            <ViewTransition name={shown ? transitionName : undefined} share="morph" default="none">
              <Image src={image.src} alt="" width={1600} height={900} sizes="320px" className="rounded-media ring-1 ring-rule" />
            </ViewTransition>
          </div>
        </motion.div>
      )}
    </>
  );
}
