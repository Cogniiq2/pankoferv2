import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export function PersonalNote() {
  return (
    <section
      id="vorschlag"
      aria-labelledby="note-title"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <div className="container-proposal">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Persönliche Notiz</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="note-title"
                className="serif-display text-h3 text-balance mt-5 text-ink lg:max-w-xs"
              >
                Nach unserem Termin in München
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.12}>
              <article className="relative rounded-3xl border border-line bg-surface px-7 py-9 shadow-card sm:px-12 sm:py-12">
                <div className="prose-measure space-y-6 text-pretty text-ink-2">
                  <p className="serif-display text-[1.35rem] leading-[1.45] text-ink sm:text-[1.5rem]">
                    Unser Termin bei Ihnen in München ist mir sehr positiv in
                    Erinnerung geblieben.
                  </p>
                  <p>
                    Die Offenheit, mit der Sie Ihre Abläufe beschrieben haben, und der
                    professionelle, zugleich sehr angenehme Umgang in Ihrem Team haben
                    bei mir einen bleibenden Eindruck hinterlassen.
                  </p>
                  <p>
                    Ebenso schätze ich, dass Sie mir offen mitgeteilt haben, wie es
                    derzeit um die Finanzierung steht. Mit dieser Rückmeldung wollte
                    ich nicht einfach noch einmal mit demselben Gesamtprojekt auf Sie
                    zukommen.
                  </p>
                  <p>
                    Stattdessen habe ich mir noch einmal konkret angesehen, welche der
                    von Ihnen geschilderten Prozesse Ihrem Team im Alltag am schnellsten
                    und spürbarsten Arbeit abnehmen können. Und was davon sich als
                    eigenständiger erster Schritt sinnvoll umsetzen lässt.
                  </p>
                  <p>
                    Daraus ist dieser Vorschlag entstanden. Er ist kein verkleinertes
                    Gesamtprojekt und keine Notlösung, sondern ein erster Schritt, der
                    für sich genommen sinnvoll ist. Und auf dem sich später aufbauen
                    lässt, wenn Sie das möchten.
                  </p>
                </div>

                <footer className="mt-10 flex items-end justify-between gap-6 border-t border-line-2 pt-7">
                  <div>
                    <p className="serif-display text-[1.75rem] italic leading-none text-ink">
                      {SITE.senderName}
                    </p>
                    <p className="mt-2 text-caption text-ink-3">
                      {SITE.senderCompany} · {SITE.proposalDate}
                    </p>
                  </div>
                  <p className="hidden text-caption text-ink-4 sm:block">
                    Persönlich für {SITE.clientName}
                  </p>
                </footer>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
