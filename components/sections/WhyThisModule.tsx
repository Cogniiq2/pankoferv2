import { Check } from "@/components/ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FIRST_STEP = [
  "E-Mail-Bearbeitung",
  "Dokumente & Belege",
  "Bestell- & Lieferinformationen",
  "Statusanfragen",
];

const LATER = [
  "Wissensdatenbank",
  "Onboarding neuer Mitarbeitender",
  "Ausschreibungen & Leistungsverzeichnisse",
  "Angebotserstellung",
  "Außendienst & Montage",
];

const CRITERIA = [
  {
    title: "Kommt jeden Tag vor",
    text: "Nicht ein paar Mal im Quartal, sondern mehrmals pro Arbeitstag.",
  },
  {
    title: "Betrifft mehrere Mitarbeitende",
    text: "Die Entlastung verteilt sich im Team, statt an einer Person hängen zu bleiben.",
  },
  {
    title: "Entlastet schnell",
    text: "Der Unterschied zeigt sich in den ersten Wochen, nicht erst nach Monaten.",
  },
  {
    title: "Lässt sich messen",
    text: "Verarbeitete E-Mails, Dokumente und Anfragen lassen sich zählen. So bleibt der Nutzen überprüfbar.",
  },
  {
    title: "Schafft die Grundlage für später",
    text: "Die strukturierten Daten und Anbindungen aus diesem Schritt können spätere Module direkt nutzen.",
  },
];

export function WhyThisModule() {
  return (
    <section aria-labelledby="why-title" className="bg-paper-2/60 py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="02"
          eyebrow="Warum genau dieser erste Schritt?"
          title={
            <span id="why-title">
              Begonnen wird dort, wo täglich die meiste Routinearbeit anfällt.
            </span>
          }
          lead="Das ursprüngliche Gesamtprojekt umfasste deutlich mehr, von der Wissensdatenbank bis zum Außendienst. Für den Anfang habe ich daraus nur die Abläufe ausgewählt, die fünf Kriterien zugleich erfüllen."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Project map */}
          <Reveal className="lg:col-span-5">
            <div className="card overflow-hidden">
              <div className="border-b border-line-2 px-6 py-5 sm:px-8">
                <p className="eyebrow">Projektlandkarte</p>
              </div>
              <div className="px-6 py-6 sm:px-8">
                <p className="text-caption font-medium text-accent">Erster Schritt</p>
                <ul className="mt-3 space-y-2.5">
                  {FIRST_STEP.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-ink">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
                        <Check size={12} strokeWidth={2} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line-2 bg-paper/60 px-6 py-6 sm:px-8">
                <p className="text-caption font-medium text-ink-3">
                  Später möglich · optional
                </p>
                <ul className="mt-3 space-y-2.5">
                  {LATER.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-ink-3">
                      <span className="h-5 w-5 shrink-0 rounded-full border border-dashed border-ink/25" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Criteria */}
          <div className="lg:col-span-7">
            <RevealGroup as="ol" className="divide-y divide-line border-y border-line" stagger={0.09}>
              {CRITERIA.map((c, i) => (
                <RevealItem as="li" key={c.title} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                  <span className="num text-caption text-ink-4 sm:col-span-1 sm:pt-1">
                    0{i + 1}
                  </span>
                  <div className="sm:col-span-11">
                    <h3 className="text-body font-medium text-ink">{c.title}</h3>
                    <p className="mt-1.5 text-small text-pretty text-ink-3">{c.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Reveal className="mt-20 sm:mt-24">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="serif-display text-balance text-[clamp(1.6rem,1.15rem+1.7vw,2.6rem)] leading-[1.22] text-ink">
              „Ziel ist nicht, möglichst viel auf einmal zu digitalisieren. Ziel ist,
              dass Ihr Team möglichst früh merkt:{" "}
              <em className="text-accent">Der Alltag wird tatsächlich einfacher.</em>“
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
