import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VALUE_ESTIMATE } from "@/lib/pricing";

const QUALITATIVE = [
  "Weniger repetitive Arbeit",
  "Weniger Unterbrechungen im Tagesgeschäft",
  "Schnellerer Zugriff auf Informationen",
  "Weniger Abhängigkeit vom manuellen Suchen",
  "Strukturiertere, gleichmäßigere Abläufe",
  "Mehr Zeit für Aufgaben, die fachliches Wissen erfordern",
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
          lead="Zwei Zahlen aus der derzeitigen Kalkulation und eine Reihe von Effekten, die sich schlechter in Zahlen fassen lassen, im Alltag aber mindestens genauso zählen."
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
                <p className="eyebrow">Derzeit kalkulierte operative Entlastung</p>
                <p className="serif-display text-figure mt-6 text-ink">
                  <span className="text-ink-4">≈</span>{" "}
                  <AnimatedNumber
                    value={VALUE_ESTIMATE.ANNUAL_SAVING_EUR}
                    format="euro"
                  />
                </p>
                <p className="mt-3 text-small text-ink-3">pro Jahr, brutto, vor finaler Prozessaufnahme</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Schwerer zu messen, aber täglich spürbar</p>
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
            Beide Werte sind Potenzial auf Basis der bisher besprochenen Abläufe, keine
            Zusage. Die finalen Werte werden zu Beginn des Projekts anhand Ihrer realen
            Prozessdaten validiert und im laufenden Betrieb gemeinsam gemessen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
