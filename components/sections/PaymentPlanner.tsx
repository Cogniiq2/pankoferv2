"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Check } from "@/components/ui/Icons";
import { PlannerSlider } from "@/components/ui/PlannerSlider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PRICING,
  calculatePlan,
  formatEuro,
  formatMonths,
} from "@/lib/pricing";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Money that glides to its new value instead of jumping. */
function AnimatedMoney({
  value,
  cents = false,
  className = "",
}: {
  value: number;
  cents?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 260, damping: 36, mass: 0.6, restDelta: 0.05 });

  useEffect(() => {
    if (reduce) spring.jump(value);
    else spring.set(value);
  }, [value, spring, reduce]);

  const text = useTransform(spring, (v) =>
    formatEuro(cents ? Math.round(v * 100) / 100 : Math.round(v), { cents }),
  );

  return <motion.span className={`num ${className}`}>{text}</motion.span>;
}

const PRESETS = [
  { label: "30 % · 12 Monate", down: 30, months: 12 },
  { label: "50 % · 12 Monate", down: 50, months: 12 },
  { label: "70 % · 6 Monate", down: 70, months: 6 },
  { label: "100 % · sofort", down: 100, months: 12 },
] as const;

function SummaryRow({
  label,
  children,
  emphasis = false,
}: {
  label: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 py-3.5 ${
        emphasis ? "text-ink" : "text-ink-2"
      }`}
    >
      <dt className={`text-small ${emphasis ? "font-medium text-ink" : ""}`}>{label}</dt>
      <dd className={`text-right ${emphasis ? "text-[1.35rem] font-medium" : "text-body"}`}>
        {children}
      </dd>
    </div>
  );
}

export function PaymentPlanner() {
  const [downPercent, setDownPercent] = useState<number>(PRICING.DEFAULT_DOWN_PAYMENT);
  const [months, setMonths] = useState<number>(PRICING.DEFAULT_INSTALLMENT_MONTHS);
  const reduce = useReducedMotion();

  const plan = useMemo(
    () => calculatePlan({ downPaymentPercent: downPercent, months }),
    [downPercent, months],
  );

  const monthSegments = plan.isPaidInFull ? 0 : plan.months;

  return (
    <section
      id="zahlungsplan"
      aria-labelledby="planner-title"
      className="scroll-mt-24 bg-paper-2/60 py-24 sm:py-32"
    >
      <div className="container-proposal">
        <SectionHeading
          index="08"
          eyebrow="Individueller Zahlungsplan"
          title={<span id="planner-title">Die Zahlungsweise soll zu Ihrer Planung passen.</span>}
          lead={
            <>
              Da Sie mir offen mitgeteilt haben, dass derzeit vor allem die Finanzierung
              des Gesamtprojekts die Umsetzung erschwert, möchte ich Ihnen bei der
              Zahlungsweise entgegenkommen. Sie legen selbst fest, wie die Implementierung
              bezahlt wird: mit einer Anzahlung zwischen {PRICING.MIN_DOWN_PAYMENT} und{" "}
              {PRICING.MAX_DOWN_PAYMENT} Prozent und dem Restbetrag in bis zu{" "}
              {PRICING.MAX_INSTALLMENT_MONTHS} Monatsraten – ohne Zinsen und ohne
              zusätzliche Kosten.
            </>
          }
        />

        <Reveal className="mt-6">
          <p className="max-w-2xl text-pretty text-ink-2">
            Leistungsumfang und Implementierungspreis bleiben unabhängig vom gewählten
            Zahlungsmodell identisch. Sie entscheiden lediglich, wie sich die Investition
            zeitlich verteilt.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Controls */}
          <Reveal className="lg:col-span-7">
            <div className="card p-7 sm:p-10">
              <div className="space-y-10">
                <PlannerSlider
                  label="Anzahlung"
                  valueDisplay={
                    <>
                      <span className="text-ink">{plan.downPaymentPercent} %</span>
                      <span className="text-ink-4"> · </span>
                      <AnimatedMoney value={plan.downPayment} />
                    </>
                  }
                  value={downPercent}
                  min={PRICING.MIN_DOWN_PAYMENT}
                  max={PRICING.MAX_DOWN_PAYMENT}
                  step={PRICING.DOWN_PAYMENT_STEP}
                  onChange={setDownPercent}
                  valueText={`${plan.downPaymentPercent} Prozent, ${formatEuro(plan.downPayment)}`}
                  minLabel={`${PRICING.MIN_DOWN_PAYMENT} %`}
                  maxLabel={`${PRICING.MAX_DOWN_PAYMENT} %`}
                />

                <PlannerSlider
                  label="Laufzeit der Raten"
                  valueDisplay={
                    plan.isPaidInFull ? (
                      <span className="text-ink-3">entfällt</span>
                    ) : (
                      formatMonths(months)
                    )
                  }
                  value={months}
                  min={PRICING.MIN_INSTALLMENT_MONTHS}
                  max={PRICING.MAX_INSTALLMENT_MONTHS}
                  step={1}
                  onChange={setMonths}
                  valueText={plan.isPaidInFull ? "Keine Ratenphase" : formatMonths(months)}
                  minLabel={formatMonths(PRICING.MIN_INSTALLMENT_MONTHS)}
                  maxLabel={formatMonths(PRICING.MAX_INSTALLMENT_MONTHS)}
                  disabled={plan.isPaidInFull}
                  hint={
                    plan.isPaidInFull
                      ? "Bei vollständiger Anzahlung entfällt die Ratenphase."
                      : undefined
                  }
                />
              </div>

              {/* Presets */}
              <div className="mt-10 border-t border-line-2 pt-7">
                <p className="text-caption text-ink-3">Beispiele zum Ausprobieren</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const active =
                      downPercent === p.down && (p.down === 100 || months === p.months);
                    return (
                      <button
                        key={p.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setDownPercent(p.down);
                          setMonths(p.months);
                        }}
                        className={`num rounded-full border px-3.5 py-1.5 text-caption transition-[background-color,border-color,color] duration-300 ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-line bg-surface text-ink-2 hover:border-ink/40 hover:text-ink"
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment timeline */}
              <div className="mt-10 border-t border-line-2 pt-7">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-caption text-ink-3">Zahlungsverlauf</p>
                  <p className="num text-caption text-ink-4">
                    {plan.isPaidInFull
                      ? "Anzahlung, danach nur Betrieb"
                      : `Anzahlung, ${formatMonths(plan.months)} Raten, danach nur Betrieb`}
                  </p>
                </div>
                <div className="mt-4 flex h-8 gap-1" aria-hidden>
                  <div
                    className="shrink-0 rounded-md bg-accent transition-[flex-basis] duration-700 ease-out-expo"
                    style={{ flexBasis: `${(plan.downPaymentPercent / 100) * 72}%` }}
                  />
                  <AnimatePresence initial={false}>
                    {Array.from({ length: monthSegments }, (_, i) => (
                      <motion.div
                        key={`m-${i}`}
                        layout
                        initial={{ opacity: 0, scaleY: reduce ? 1 : 0.6 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: reduce ? 1 : 0.6 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="min-w-[3px] flex-1 rounded-md bg-accent/25"
                      />
                    ))}
                  </AnimatePresence>
                  <div
                    className="shrink-0 rounded-md border border-dashed border-ink/25"
                    style={{ flexBasis: "28%" }}
                  />
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-caption text-ink-3" aria-hidden>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
                    Anzahlung
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-accent/25" />
                    Monatsraten
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-ink/30" />
                    danach nur Betrieb, {formatEuro(PRICING.MONTHLY_OPERATION)} / Monat
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Summary */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="card sticky top-24 overflow-hidden">
              <div className="border-b border-line-2 bg-paper/50 px-7 py-5 sm:px-8">
                <p className="eyebrow">Ihre Auswahl</p>
              </div>

              <motion.dl layout className="divide-y divide-line-2 px-7 sm:px-8">
                <SummaryRow label="Anzahlung">
                  <AnimatedMoney value={plan.downPayment} />
                </SummaryRow>

                <AnimatePresence initial={false} mode="popLayout">
                  {!plan.isPaidInFull && (
                    <motion.div
                      key="installments"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                      className="divide-y divide-line-2 overflow-hidden"
                    >
                      <SummaryRow label="Verbleibender Setup-Betrag">
                        <AnimatedMoney value={plan.remainingSetup} />
                      </SummaryRow>
                      <SummaryRow label="Laufzeit">{formatMonths(plan.months)}</SummaryRow>
                      <SummaryRow label="Monatliche Setup-Rate">
                        <AnimatedMoney value={plan.monthlySetupRate} cents />
                      </SummaryRow>
                    </motion.div>
                  )}
                </AnimatePresence>

                <SummaryRow label="Laufender Betrieb">
                  {formatEuro(plan.operatingFee)}
                  <span className="text-ink-4"> / Monat</span>
                </SummaryRow>

                <motion.div layout>
                  {plan.isPaidInFull ? (
                    <SummaryRow label="Monatlich ab Live-Betrieb" emphasis>
                      <AnimatedMoney value={plan.monthlyCombined} cents />
                    </SummaryRow>
                  ) : (
                    <SummaryRow label="Monatlich während der Ratenphase" emphasis>
                      <AnimatedMoney value={plan.monthlyCombined} cents />
                    </SummaryRow>
                  )}
                </motion.div>

                <AnimatePresence initial={false} mode="popLayout">
                  {!plan.isPaidInFull && (
                    <motion.div
                      key="after"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <SummaryRow label={`Danach, ab Monat ${plan.months + 1}`}>
                        {formatEuro(plan.afterPaymentPeriod)}
                        <span className="text-ink-4"> / Monat</span>
                      </SummaryRow>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.dl>

              <motion.div layout className="border-t border-line-2 bg-paper/50 px-7 py-6 sm:px-8">
                <AnimatePresence mode="wait" initial={false}>
                  {plan.isPaidInFull ? (
                    <motion.div
                      key="full"
                      initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex items-start gap-3 text-small text-ink-2"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
                        <Check size={12} strokeWidth={2} />
                      </span>
                      <p>
                        Vollständige Zahlung bei Beauftragung. Keine Ratenphase, danach
                        ausschließlich der laufende Betrieb.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.ul
                      key="terms"
                      initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="grid gap-2.5 text-small text-ink-2"
                    >
                      {[
                        `${PRICING.INTEREST_RATE} % Zinsen`,
                        `${formatEuro(PRICING.FINANCING_FEES)} zusätzliche Finanzierungskosten`,
                        `Implementierungspreis bleibt ${formatEuro(plan.totalSetup)}`,
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                            <Check size={12} strokeWidth={2} />
                          </span>
                          <span className="num">{t}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <p className="mt-5 text-caption text-ink-4">
                  Alle Beträge netto. Die Fälligkeiten stimmen wir gemeinsam ab. Die
                  Betriebskosten fallen ab dem Live-Betrieb an.
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <p className="max-w-3xl text-pretty text-ink-2">
            Sollte eine andere Aufteilung besser zu Ihrer Planung passen, sprechen Sie mich
            gern an.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
