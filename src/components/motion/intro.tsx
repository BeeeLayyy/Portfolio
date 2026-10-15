import { site } from "@/content/site";

// The first-visit intro (D16), Lusion's loader: a blue screen counts 000 to
// 100 while a bar fills, the name rolls up out of the bar, then the screen
// splits along its diagonal and both halves slide off to the corners.
// Entirely CSS (globals.css, "Intro"), shown only while <html data-intro="play">,
// which the inline script in the layout sets on the first page of a visit.
// Decorative: it never blocks clicks and screen readers skip it.
const STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-half" />
      <div className="intro-half" />
      <div className="intro-content">
        <div className="intro-bar" />
        <div className="intro-name">
          <span>{site.name}</span>
        </div>
        <div className="intro-count">
          {[0, 1, 2].map((d) => (
            <span key={d} className="intro-digit">
              <span className="intro-strip">
                {STRIP.map((n, i) => (
                  <span key={i}>{n}</span>
                ))}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
