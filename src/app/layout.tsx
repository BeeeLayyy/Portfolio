import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
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
// --color-ledger in globals.css (metadata can't read CSS variables).
export const viewport: Viewport = {
  themeColor: "#0f1f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${newsreaderItalic.variable} ${plexSans.variable} h-full antialiased`}
      suppressHydrationWarning // the script below may set data-hero before React loads
    >
      <head>
        {/* Skip the hero entrance if it already played this session. Runs
            before first paint, so the name never flashes in twice. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("hero-played"))document.documentElement.dataset.hero="played"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-lamp focus:px-4 focus:py-2 focus:text-ledger"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Vercel Web Analytics (visits, no cookies) and Speed Insights (real
            visitors' load times). Both only send data on Vercel deployments
            once they're switched on in the project's dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
