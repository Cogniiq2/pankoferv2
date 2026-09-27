import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VALUE_ESTIMATE } from "@/lib/pricing";

const QUALITATIVE = [
  "Weniger wiederkehrende Routinearbeit",
  "Weniger Unterbrechungen im Tagesgeschäft",
  "Weniger Suchen in Postfächern, Ordnern und Systemen",
  "Schnellerer Zugriff auf Informationen",
  "Klarere, einheitliche Abläufe",
  "Mehr Zeit für Aufgaben, die Fachwissen erfordern",
  "Technische Grundlage für spätere Module",
];

export function ValueSection() {
  return (
    <section id="wirkung" aria-labelledby="value-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="05"
          eyebrow="Erwartete Wirkung"
          title={<span id="value-title">Was sich dadurch verändern soll.</span>}
          lead="Heute wird jeden Tag gelesen, gesucht, abgetippt, zugeordnet und beantwortet. Das System soll Ihrem Team davon so viel wie möglich abnehmen. Die Werte unten beziffern die Größenordnung; wie viel davon in der Praxis ankommt, messen wir gemeinsam."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
            <Reveal>
              <div className="card p-8 sm:p-10">
                <p className="eyebrow">Potenzieller Zeitgewinn</p>
                <p className="serif-display text-figure mt-6 text-ink">
                  <span className="text-ink-4">≈</span>{" "}
                  <AnimatedNumber
                    value={VALUE_ESTIMATE.HOURS_SAVED_PER_WEEK}
                    format="number"
                  />{" "}
                  <span className="text-[0.55em] text-ink-3">Std.</span>
                </p>
                <p className="mt-3 text-small text-ink-3">pro Woche, über das Team verteilt</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card p-8 sm:p-10">
                <p className="eyebrow">Potenzielle Entlastung</p>
                <p className="serif-display text-figure mt-6 text-ink">
                  <span className="text-ink-4">≈</span>{" "}
                  <AnimatedNumber
                    value={VALUE_ESTIMATE.ANNUAL_SAVING_EUR}
                    format="euro"
                  />
                </p>
                <p className="mt-3 text-small text-ink-3">pro Jahr (brutto), auf Basis der bisher besprochenen Abläufe</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Was sich im Arbeitstag ändert</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-6 divide-y divide-line border-y border-line" stagger={0.06}>
              {QUALITATIVE.map((item) => (
                <RevealItem as="li" key={item} className="flex items-center gap-4 py-3.5 text-ink-2">
                  <span aria-hidden className="h-px w-5 shrink-0 bg-accent/70" />
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Reveal className="mt-12">
          <p className="max-w-3xl text-small text-pretty text-ink-3">
            <span className="font-medium text-ink-2">Einordnung: </span>
            Beide Werte sind gerundete Schätzungen auf Basis der bisher besprochenen
            Abläufe, keine Zusage. Zu Beginn des Projekts prüfen wir sie anhand Ihrer
            realen Prozessdaten; die tatsächliche Wirkung messen wir nach dem Start
            gemeinsam.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
