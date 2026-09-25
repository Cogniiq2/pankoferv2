"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Person } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const TODAY = [
  "Statusanfrage kommt per E-Mail",
  "Mitarbeiter liest die Mail",
  "sucht den zugehörigen Auftrag",
  "sucht die Lieferinformation",
  "formuliert eine Antwort",
  "sendet die Antwort",
];

const WITH_SYSTEM = [
  "Statusanfrage wird erkannt",
  "relevanter Auftrag wird zugeordnet",
  "aktueller Stand wird abgerufen",
  "Antwort wird vorbereitet oder nach Regel automatisiert",
];

const EASE = [0.16, 1, 0.3, 1] as const;

function StepColumn({
  label,
  meta,
  steps,
  final,
  tone,
}: {
  label: string;
  meta: string;
  steps: string[];
  final?: string;
  tone: "muted" | "accent";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const gap = reduce ? 0 : 0.16;
  const isAccent = tone === "accent";

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl border p-7 sm:p-9 ${
        isAccent
          ? "border-accent/25 bg-surface shadow-card"
          : "border-line bg-paper-2/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className={`eyebrow ${isAccent ? "text-accent" : ""}`}>{label}</p>
        <p className="num text-caption text-ink-4">{meta}</p>
      </div>

      <ol className="relative mt-8">
        <motion.span
          aria-hidden
          className={`absolute left-[0.6rem] top-3 bottom-3 w-px origin-top ${
            isAccent ? "bg-accent/50" : "bg-ink/15"
          }`}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{
            duration: reduce ? 0.2 : gap * (steps.length + (final ? 1 : 0)) + 0.4,
            ease: "linear",
          }}
        />
        {steps.map((step, i) => (
          <motion.li
            key={step}
            className="relative flex gap-5 py-2.5"
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -6 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.55, delay: i * gap, ease: EASE }}
          >
            <span
              className={`relative z-10 mt-[0.55rem] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                isAccent
                  ? "border-accent/50 bg-surface"
                  : "border-ink/20 bg-paper"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isAccent ? "bg-accent" : "bg-ink/40"}`}
              />
            </span>
            <span className={`text-body ${isAccent ? "text-ink" : "text-ink-2"}`}>
              {step}
            </span>
          </motion.li>
        ))}
        {final && (
          <motion.li
            className="relative mt-3 flex gap-5 py-2.5"
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -6 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.55, delay: steps.length * gap + 0.05, ease: EASE }}
          >
            <span className="relative z-10 mt-[0.35rem] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
              <Person size={13} strokeWidth={1.8} />
            </span>
            <span className="text-body font-medium text-ink">{final}</span>
          </motion.li>
        )}
      </ol>
    </div>
  );
}

export function ProcessComparison() {
  return (
    <section aria-labelledby="comparison-title" className="bg-paper-2/60 py-24 sm:py-32">
      <div className="container-proposal">
        <SectionHeading
          index="04"
          eyebrow="Ein typischer Vorgang"
          title={
            <span id="comparison-title">
              Was sich an einer einzelnen Statusanfrage konkret ändert.
            </span>
          }
          lead="Rund zehnmal am Tag läuft dieser Ablauf bei Ihnen durch. Heute komplett von Hand. Mit dem System greift Ihr Team nur noch dort ein, wo Erfahrung gefragt ist."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <StepColumn
              label="Heute"
              meta="6 manuelle Schritte"
              steps={TODAY}
              tone="muted"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StepColumn
              label="Mit dem System"
              meta="1 Eingriff, nur bei Ausnahmen"
              steps={WITH_SYSTEM}
              final="Mitarbeiter greift nur bei Ausnahmen ein"
              tone="accent"
            />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <p className="text-small text-ink-3">
            Dieselbe Logik gilt für Bestellungen, Belege und Lieferpapiere: erkennen,
            zuordnen, strukturieren, vorbereiten. Der Mensch entscheidet, wo es zählt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
