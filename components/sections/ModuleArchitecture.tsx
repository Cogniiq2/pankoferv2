import { Document, Grid, Link, Mail, Package, Reply } from "@/components/ui/Icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/content/site";
import { ProcessFlow } from "./ProcessFlow";

const COMPONENTS = [
  {
    icon: Mail,
    title: "E-Mail-Assistent",
    text: "Eingehende E-Mails werden automatisch analysiert, nach Thema eingeordnet und dem richtigen Vorgang zugewiesen. Relevante Angaben werden herausgelesen, ein Antwortvorschlag liegt bereit.",
    note: "Ob eine Antwort versendet wird, entscheidet weiterhin Ihr Team. Keine sensible Antwort verlässt ungeprüft das Haus.",
  },
  {
    icon: Document,
    title: "Dokumenten-Hub",
    text: "Anhänge, PDFs, Scans, Bestellungen und Lieferpapiere werden ausgelesen, verstanden und strukturiert abgelegt: kategorisiert, wo möglich geprüft, durchsuchbar und für den Export vorbereitet.",
    note: "Ein Ort für alles, was täglich hereinkommt.",
  },
  {
    icon: Package,
    title: "Bestell- & Lieferinformationen",
    text: "Wichtige Angaben aus Dokumenten und E-Mails, etwa Mengen, Termine und Lieferstände, aktualisieren automatisch die zugehörigen Vorgangsdaten.",
    note: "Niemand tippt mehr ab, was bereits geschrieben steht.",
  },
  {
    icon: Reply,
    title: "Statusautomatisierung",
    text: "Wiederkehrende Status- und Lieferanfragen werden erkannt, dem Auftrag zugeordnet und mit dem aktuellen Stand beantwortet: je nach Regel automatisch oder als fertiger Vorschlag.",
    note: "Unklare Fälle landen immer bei einem Menschen.",
  },
  {
    icon: Link,
    title: "Warenwirtschaft-Anbindung",
    text: "Ihre bestehende Warenwirtschaft bleibt das führende System. Angebunden wird sie pragmatisch: über Schnittstelle, CSV-Brücke oder strukturierten Datenaustausch, je nachdem, was technisch sinnvoll ist.",
    note: "Wir ersetzen nichts, was bereits gut funktioniert.",
  },
  {
    icon: Grid,
    title: "Zentrale Übersicht",
    text: "Ihr Team sieht auf einen Blick, was eingegangen ist, was verarbeitet wurde, was auf Prüfung wartet, was noch offen ist, was beantwortet wurde und wo eine Ausnahme aufgetreten ist.",
    note: "Kontrolle ohne Nachfragen.",
  },
] as const;

const GUARDRAILS = [
  {
    title: "Freigabe durch Ihr Team, wo es darauf ankommt",
    text: "Automatisiert wird nur, was nach klaren Regeln sicher ist. Alles andere wird vorbereitet, nicht versendet.",
  },
  {
    title: "Bestehende Systeme bleiben führend",
    text: "Das System ergänzt Ihre Warenwirtschaft und Ihre Arbeitsweise. Es verlangt nicht, dass Sie beides umstellen.",
  },
  {
    title: "Ausnahmen werden sichtbar, nicht versteckt",
    text: "Was das System nicht sicher zuordnen kann, wird als offener Punkt gezeigt. Nichts geht still verloren.",
  },
] as const;

export function ModuleArchitecture() {
  return (
    <section id="modul" aria-labelledby="module-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="03"
          eyebrow="Das erste Modul"
          title={
            <span id="module-title">
              {SITE.proposalTitle}
              <span className="mt-3 block text-ink-3">{SITE.proposalSubtitle}</span>
            </span>
          }
          lead="Ein System, das die eingehende Kommunikation und die dazugehörigen Dokumente versteht, strukturiert und so aufbereitet, dass Ihr Team damit direkt weiterarbeiten kann. Und nur dort eingreifen muss, wo es wirklich nötig ist."
        />

        {/* Flow diagram */}
        <Reveal className="mt-16 rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-10 lg:p-12">
          <p className="eyebrow mb-10">So arbeitet das System</p>
          <ProcessFlow />
        </Reveal>

        {/* Components */}
        <RevealGroup
          as="ol"
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {COMPONENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <RevealItem as="li" key={c.title} className="h-full">
                <article className="card card-hover flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="num text-caption text-ink-4">0{i + 1}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink-2">
                      <Icon size={17} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-h3 font-medium tracking-[-0.01em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-small text-pretty text-ink-2">{c.text}</p>
                  <p className="mt-auto border-t border-line-2 pt-4 text-caption text-ink-3">
                    {c.note}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Guardrails */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Leitplanken</p>
            <p className="mt-4 text-pretty text-ink-2">
              Drei Grundsätze, die für jede Komponente gelten. Sie sorgen dafür, dass das
              System im Alltag verlässlich bleibt.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-3 lg:col-span-8" stagger={0.1}>
            {GUARDRAILS.map((g) => (
              <RevealItem as="li" key={g.title} className="border-t border-ink/20 pt-5">
                <h3 className="text-body font-medium text-ink">{g.title}</h3>
                <p className="mt-2 text-small text-pretty text-ink-3">{g.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
