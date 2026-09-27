import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPERATIONS } from "@/lib/pricing";

const ROWS = [
  {
    figure: OPERATIONS.EMAILS_PER_DAY,
    label: "E-Mails täglich",
    today: "Lesen, einordnen, weiterleiten, beantworten – alles von Hand.",
  },
  {
    figure: OPERATIONS.ORDERS_PER_DAY,
    label: "Bestellungen täglich",
    today: "Die Angaben werden aus E‑Mails und Belegen von Hand in die Warenwirtschaft übertragen.",
  },
  {
    figure: OPERATIONS.DOCUMENTS_PER_DAY,
    label: "Dokumente & Belege täglich",
    today: "PDFs, Scans und Lieferpapiere werden geöffnet, geprüft und abgelegt.",
  },
  {
    figure: OPERATIONS.STATUS_REQUESTS_PER_DAY,
    label: "Statusanfragen täglich",
    today: "Jemand sucht den Auftrag, schlägt den Stand nach und formuliert eine Antwort.",
  },
] as const;

export function OperationalSnapshot() {
  return (
    <section aria-labelledby="snapshot-title" className="py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="01"
          eyebrow="Was ich aus unserem Termin mitgenommen habe"
          title={
            <span id="snapshot-title">
              Vier Stellen, an denen jeden Tag wiederkehrende Handarbeit entsteht.
            </span>
          }
          lead="Die Zahlen stammen aus unserem Gespräch und sind gerundet. Für sich genommen ist jeder dieser Schritte überschaubar. Weil sie sich aber täglich wiederholen, binden sie in Summe kontinuierlich Zeit und Aufmerksamkeit."
        />

        <RevealGroup as="ol" className="mt-16 border-t border-line" stagger={0.1}>
          {ROWS.map((row) => (
            <RevealItem
              as="li"
              key={row.label}
              className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-7 sm:grid-cols-12 sm:py-8"
            >
              <p className="num serif-display text-figure text-ink sm:col-span-3">
                {row.figure}
              </p>
              <p className="text-body font-medium text-ink sm:col-span-3">{row.label}</p>
              <p className="text-small text-pretty text-ink-3 sm:col-span-6">
                <span className="text-ink-4">Heute: </span>
                {row.today}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-12">
          <p className="text-pretty text-ink-2 lg:col-span-7 lg:col-start-4">
            Hinzu kommt, dass diese Aufgaben selten am Stück anfallen. Sie unterbrechen
            andere Arbeit, oft bei genau den Mitarbeitenden, deren Fachwissen an anderer
            Stelle gebraucht wird.{" "}
            <span className="text-ink">Hier setzt der erste Schritt an.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
