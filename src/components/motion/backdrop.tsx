// The living background (D18): instead of flat navy, two soft pools of blue
// light drift slowly behind every page, like Horizon Night's one light moving
// across a dark room, over a faint ledger-style dot grid that creeps along.
// The light also slides as you scroll. Pure CSS (globals.css, "Backdrop"):
// transform-only animations, so it costs almost nothing, and it holds still
// with reduced motion. Decorative and behind everything.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop-grid" />
      <div className="backdrop-scroll">
        <div className="backdrop-glow backdrop-glow-a" />
        <div className="backdrop-glow backdrop-glow-b" />
        <div className="backdrop-glow backdrop-glow-c" />
      </div>
    </div>
  );
}
