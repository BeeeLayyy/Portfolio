import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { EndSection } from "@/components/end-section";
import { Backdrop } from "@/components/motion/backdrop";
import { Intro } from "@/components/motion/intro";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollNav } from "@/components/scroll-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

// Finance side of the identity: a serif with optical sizes, so the huge
// display name and small body text are each drawn for their size.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal"],
});

// The italic is used once ("Finance" in the hero), so it isn't preloaded:
// it loads after first paint instead of competing with the fonts the
// first screen needs. Use it with the font-serif-italic class.
const newsreaderItalic = Newsreader({
  variable: "--font-newsreader-italic",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["italic"],
  preload: false,
});

// Data side: a grotesk with true tabular figures for numbers and tables.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Numbers, dates and labels: monospaced, so figures and dates line up like a
// terminal. Below the first screen, so it isn't preloaded.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  // The share image is app/opengraph-image.png; metadataBase turns its path
  // into a full https://brandonle.site URL.
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

// Phone status bar matches the page. The site is dark only, so one color:
// --color-canvas in globals.css (metadata can't read CSS variables).
export const viewport: Viewport = {
  themeColor: "#070d18",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${newsreaderItalic.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning // the script below may set data-hero before React loads
    >
      <head>
        {/* Runs before first paint:
            - data-js: JavaScript is on, so scroll reveals may start hidden.
            - data-hero: skip the Home entrance if it already played this visit.
            - data-intro: play the intro (D16) on the first page of a visit,
              never with reduced motion; "done" once it's over, so later
              pages don't wait for it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.dataset.js="";try{if(sessionStorage.getItem("hero-played"))d.dataset.hero="played";var r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r&&!sessionStorage.getItem("intro-seen")){sessionStorage.setItem("intro-seen","1");d.dataset.intro="play";setTimeout(function(){d.dataset.intro="done"},3200)}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <Backdrop />
        <Intro />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 pt-header">
          {children}
        </main>
        <EndSection />
        <SiteFooter />
        <ScrollNav />
        <RevealObserver />
        <SmoothScroll />
        {/* Vercel Web Analytics (visits, no cookies) and Speed Insights (real
            visitors' load times). Both only send data on Vercel deployments
            once they're switched on in the project's dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
