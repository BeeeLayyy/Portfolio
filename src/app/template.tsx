"use client";

import { useEffect, useState } from "react";

// A template remounts on every navigation, unlike a layout. The first mount
// is the page load, which gets no fade (Home has the hero entrance instead);
// every later mount is a client navigation and fades in.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  // Decided once at mount, so a later re-render can't restart the fade.
  const [animate] = useState(hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
