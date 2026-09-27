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
                    Das liegt vor allem an der Offenheit, mit der Sie Ihre Abläufe
                    geschildert haben, und an dem ebenso professionellen wie angenehmen
                    Umgang in Ihrem Team.
                  </p>
                  <p>
                    Ebenso habe ich Ihre ehrliche Rückmeldung zur Finanzierung des
                    Gesamtprojekts geschätzt. Darauf wollte ich nicht antworten, indem
                    ich Ihnen dasselbe Projekt noch einmal vorlege.
                  </p>
                  <p>
                    Stattdessen habe ich mir genau angesehen, bei welchen
                    der geschilderten Abläufe eine Automatisierung Ihrem Team am
                    schnellsten Arbeit abnimmt – und welche davon sich als
                    eigenständiger erster Schritt umsetzen lassen.
                  </p>
                  <p>
                    Daraus ist dieser Vorschlag entstanden. Er ist kein verkleinertes
                    Gesamtprojekt und keine Notlösung, sondern ein Schritt, der für sich
                    genommen Sinn ergibt – und auf dem sich später aufbauen lässt, wenn
                    Sie das möchten.
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
