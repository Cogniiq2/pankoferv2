"use client";

import { motion, useReducedMotion } from "motion/react";
import { LinkButton } from "@/components/ui/Button";
import { SITE } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 1.1, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36"
    >
      {/* Ambient background – a single, slow-drifting warm highlight. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-[30%] right-[-10%] h-[70vh] w-[70vw] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(226 235 235 / 0.9), rgb(246 244 239 / 0))",
          }}
          animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgb(23 24 26 / 0.12), transparent)",
          }}
        />
      </div>

      <div className="container-proposal">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <motion.p className="eyebrow" {...item(0.05)}>
              Persönlicher Vorschlag · {SITE.clientName} × {SITE.senderCompany}
            </motion.p>

            <motion.h1
              id="hero-title"
              className="serif-display text-display text-balance mt-8 max-w-[15ch] text-ink [hyphens:manual]"
              {...item(0.18)}
            >
              Ein erster Digitalisierungs&shy;schritt, den Ihr Team im Alltag wirklich spürt.
            </motion.h1>

            <motion.p
              className="text-lead text-pretty mt-8 max-w-2xl text-ink-2"
              {...item(0.32)}
            >
              Aus allem, was wir in München besprochen haben, habe ich die Abläufe
              herausgelöst, die Ihrem Team am schnellsten messbar Arbeit abnehmen können.
              Ohne dass dafür das gesamte ursprüngliche Projekt nötig ist.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              {...item(0.46)}
            >
              <LinkButton href="#vorschlag">Vorschlag ansehen</LinkButton>
              <LinkButton href="#zahlungsplan" variant="secondary">
                Zum Zahlungsmodell
              </LinkButton>
            </motion.div>
          </div>

          <motion.aside
            className="lg:col-span-4 lg:self-end"
            aria-label="Eckdaten des Vorschlags"
            {...item(0.6)}
          >
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-small lg:grid-cols-1 lg:gap-y-4">
              <div>
                <dt className="eyebrow">Für</dt>
                <dd className="mt-1.5 text-ink">
                  {SITE.clientName}
                  <span className="block text-ink-3">{SITE.clientCity}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Von</dt>
                <dd className="mt-1.5 text-ink">
                  {SITE.senderName}
                  <span className="block text-ink-3">{SITE.senderCompany}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Gegenstand</dt>
                <dd className="mt-1.5 text-ink">
                  {SITE.proposalTitle}
                  <span className="block text-ink-3">Erstes Modul</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Stand</dt>
                <dd className="mt-1.5 text-ink">{SITE.proposalDate}</dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
