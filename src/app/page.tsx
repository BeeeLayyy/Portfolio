// Phase 1 style tile: shows the tokens in use so they can be reviewed on a
// real preview URL. Replaced by the real home page later in Phase 1.

const swatches = [
  { name: "sky", token: "bg-sky", hex: "#4A96D6", use: "Hero and feature surfaces" },
  { name: "mist", token: "bg-mist", hex: "#EAF3FB", use: "Alternate sections" },
  { name: "white", token: "bg-white", hex: "#FFFFFF", use: "Page background" },
  { name: "red", token: "bg-red", hex: "#D21F2F", use: "The accent" },
  { name: "ink", token: "bg-ink", hex: "#0E2A47", use: "Body text" },
  { name: "ink-muted", token: "bg-ink-muted", hex: "#4A6178", use: "Secondary text" },
];

const typeLadder = [
  { size: "text-3xl", label: "3xl, section titles" },
  { size: "text-2xl", label: "2xl" },
  { size: "text-xl", label: "xl" },
  { size: "text-lg", label: "lg, lead paragraphs" },
  { size: "text-base", label: "base, body" },
  { size: "text-sm", label: "sm, captions" },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Split hero draft: finance in serif on the left, data in sans on the right */}
      <section className="relative grid min-h-[80vh] grid-cols-1 bg-sky md:grid-cols-2">
        <div className="flex flex-col justify-end border-b-4 border-red p-8 md:border-b-0 md:border-r-4 md:p-16">
          <p className="font-serif text-3xl italic text-ink">Finance</p>
          <p className="mt-4 max-w-sm text-ink">
            Financial control at JPMorgan Chase. Reading what the numbers say.
          </p>
        </div>
        <div className="flex flex-col justify-end p-8 md:p-16">
          <p className="font-sans text-3xl font-medium tracking-tight text-ink">
            Data &amp; technology
          </p>
          <p className="mt-4 max-w-sm text-ink">
            Revenue operations at SAP. Building the systems that produce them.
          </p>
        </div>
        <h1 className="pointer-events-none absolute inset-x-0 top-1/3 overflow-hidden whitespace-nowrap text-center font-serif text-display font-semibold jersey">
          Brandon Le
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-8 py-24">
        <h2 className="font-serif text-2xl">Color</h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
          {swatches.map((s) => (
            <li key={s.name}>
              <div className={`${s.token} h-20 rounded-media border border-rule`} />
              <p className="mt-3 font-medium">{s.name}</p>
              <p className="text-sm text-ink-muted">
                {s.hex}, {s.use}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-24 font-serif text-2xl">Type</h2>
        <div className="mt-8 space-y-6">
          {typeLadder.map((t) => (
            <div key={t.size} className="grid gap-2 border-t border-rule pt-4 md:grid-cols-[12rem_1fr]">
              <p className="text-sm text-ink-muted">{t.label}</p>
              <p className={t.size}>
                <span className="font-serif">Forecast accuracy</span>{" "}
                <span className="font-sans">by region, Q3 2026</span>
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-24 font-serif text-2xl">Controls</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="rounded-control bg-red px-5 py-3 font-medium text-white transition-colors duration-(--duration-quick) ease-out-soft hover:bg-ink"
          >
            See my work
          </a>
          <a
            href="#"
            className="rounded-control border border-rule px-5 py-3 transition-colors duration-(--duration-quick) ease-out-soft hover:border-red"
          >
            Download resume
          </a>
          <span className="rounded-tag bg-mist px-2 py-1 text-sm text-ink">SQL</span>
          <span className="rounded-tag bg-mist px-2 py-1 text-sm text-ink">Tableau</span>
        </div>
      </section>
    </main>
  );
}
