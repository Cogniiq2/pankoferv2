import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const STEPS = [
  {
    title: "Erster Schritt geht in Betrieb",
    text: "Das Modul wird umgesetzt, mit Ihrem Team getestet und läuft im echten Tagesgeschäft.",
  },
  {
    title: "Gemeinsame Auswertung",
    text: "Nach einigen Wochen im Betrieb sehen wir uns die realen Kennzahlen zusammen an.",
  },
  {
    title: "Ihre Entscheidung",
    text: "Ob und wann weitere Module sinnvoll sind, entscheiden Sie. Ohne Verpflichtung, ohne Zeitdruck.",
  },
] as const;

const KPIS = [
  "Verarbeitete E-Mails",
  "Verarbeitete Dokumente",
  "Beantwortete Statusanfragen",
  "Eingesparte manuelle Zeit",
  "Ausnahmen und manuelle Prüfungen",
  "Rückmeldung Ihres Teams",
];

export function ProofThenExpand() {
  return (
    <section aria-labelledby="proof-title" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgb(44 98 112 / 0.35), transparent 70%)",
        }}
      />
      <div className="container-proposal relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-paper/55">
                <span className="num" aria-hidden>06</span>
                <span>Erst beweisen, dann erweitern</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="proof-title"
                className="serif-display text-h2 text-balance mt-6 text-paper"
              >
                Sie müssen heute nicht entscheiden, wie weit die Digitalisierung später
                gehen soll. Zunächst muss der erste Schritt überzeugen.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lead text-pretty mt-8 max-w-2xl text-paper/75">
                Mir ist lieber, einen Bereich richtig umzusetzen und seinen Nutzen im
                echten Betrieb zu zeigen, als Sie heute um eine Entscheidung für das
                gesamte ursprüngliche Projekt zu bitten.
              </p>
            </Reveal>

            <RevealGroup as="ol" className="mt-14 grid gap-8 sm:grid-cols-3" stagger={0.12}>
              {STEPS.map((s, i) => (
                <RevealItem as="li" key={s.title} className="border-t border-paper/20 pt-5">
                  <p className="num text-caption text-paper/45">0{i + 1}</p>
                  <h3 className="mt-2 text-body font-medium text-paper">{s.title}</h3>
                  <p className="mt-2 text-small text-pretty text-paper/65">{s.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-paper/15 bg-paper/[0.04] p-7 sm:p-8">
                <p className="eyebrow text-paper/55">Was wir gemeinsam messen</p>
                <ul className="mt-5 divide-y divide-paper/10">
                  {KPIS.map((k) => (
                    <li key={k} className="flex items-center gap-3 py-3 text-small text-paper/85">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-accent-soft/80" />
                      {k}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3 text-caption text-paper/65">
                  Spätere Module sind optional. Es gibt keine Verpflichtung, weitere
                  Phasen zu beauftragen.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
