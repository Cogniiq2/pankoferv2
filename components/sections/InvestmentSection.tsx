import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tooltip } from "@/components/ui/Tooltip";
import { PRICING, formatEuro } from "@/lib/pricing";

const SETUP_INCLUDES = [
  "Prozessaufnahme mit Ihrem Team vor Ort",
  "Aufbau der sechs Komponenten",
  "Anbindung an Ihre Warenwirtschaft",
  "Testbetrieb mit echten Vorgängen",
  "Einführung und Schulung",
];

const OPERATION_INCLUDES = [
  "Infrastruktur und Hosting",
  "Betrieb der Automatisierungen",
  "Monitoring und Systemgesundheit",
  "Wartung, Sicherheits- und Technik-Updates",
  "KI- und API-Betrieb im vereinbarten Umfang",
  "Pflege der bestehenden Workflows",
  "Support bei Fragen und Störungen",
];

const PHASES = [
  { title: "Prozessaufnahme", text: "Reale Vorgänge, Regeln, Ausnahmen" },
  { title: "Aufbau & Anbindung", text: "Komponenten, Warenwirtschaft, Übersicht" },
  { title: "Testbetrieb", text: "Mit Ihrem Team, mit echten Mails und Belegen" },
  { title: "Live-Betrieb & Auswertung", text: "Messung, Feinschliff, Kennzahlen" },
] as const;

export function InvestmentSection() {
  return (
    <section id="investition" aria-labelledby="investment-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="07"
          eyebrow="Investition"
          title={<span id="investment-title">Klar kalkuliert, ohne versteckte Positionen.</span>}
          lead="Zwei Beträge, beide netto. Der Umsetzungspreis deckt den gesamten Weg bis zum Live-Betrieb ab. Der monatliche Betrag hält das System danach verlässlich am Laufen."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <article className="card flex h-full flex-col p-8 sm:p-10">
              <p className="eyebrow">Einmalige Implementierung</p>
              <p className="serif-display text-figure num mt-6 text-ink">
                {formatEuro(PRICING.SETUP_PRICE)}
              </p>
              <p className="mt-2 text-small text-ink-3">netto, einmalig</p>
              <ul className="mt-8 divide-y divide-line-2 border-t border-line-2">
                {SETUP_INCLUDES.map((item) => (
                  <li key={item} className="py-3 text-small text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="card flex h-full flex-col p-8 sm:p-10">
              <div className="flex items-center gap-1.5">
                <p className="eyebrow">Laufender Betrieb</p>
                <Tooltip label="Was der laufende Betrieb umfasst">
                  Der monatliche Betrag ist kein reines Hosting. Er deckt den Betrieb des
                  produktiven Systems ab: Infrastruktur, Überwachung, Wartung, Updates,
                  den KI- und API-Betrieb im vereinbarten Umfang sowie Support.
                  Weiterentwicklungen darüber hinaus werden separat abgestimmt.
                </Tooltip>
              </div>
              <p className="serif-display text-figure num mt-6 text-ink">
                {formatEuro(PRICING.MONTHLY_OPERATION)}
                <span className="text-[0.45em] text-ink-3"> / Monat</span>
              </p>
              <p className="mt-2 text-small text-ink-3">netto, ab Live-Betrieb</p>
              <ul className="mt-8 divide-y divide-line-2 border-t border-line-2">
                {OPERATION_INCLUDES.map((item) => (
                  <li key={item} className="py-3 text-small text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-caption text-ink-3">
                Individuelle Weiterentwicklungen über den vereinbarten Umfang hinaus stimmen
                wir separat ab.
              </p>
            </article>
          </Reveal>
        </div>

        {/* Implementation phases */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow">Ablauf der Umsetzung</p>
          </Reveal>
          <RevealGroup as="ol" className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-4" stagger={0.1}>
            {PHASES.map((p, i) => (
              <RevealItem as="li" key={p.title} className="relative">
                <p className="num text-caption text-ink-4">Phase {i + 1}</p>
                <h3 className="mt-2 text-body font-medium text-ink">{p.title}</h3>
                <p className="mt-1.5 text-small text-ink-3">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6">
            <p className="text-caption text-ink-3">
              Den konkreten Zeitplan stimmen wir in der Prozessaufnahme gemeinsam ab. Alle
              Beträge verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
