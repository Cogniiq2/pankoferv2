import { Reveal } from "@/components/ui/Reveal";

export function PersonalReason() {
  return (
    <section aria-labelledby="reason-title" className="py-24 sm:py-32">
      <div className="container-proposal">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="num text-ink-4" aria-hidden>09</span>
                <span>Warum ich Ihnen das anbiete</span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="reason-title"
                className="serif-display text-h3 text-balance mt-5 text-ink"
              >
                Weil ein guter erster Schritt nicht an der Zahlungsstruktur scheitern
                sollte.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.12}>
              <div className="prose-measure space-y-6 text-pretty text-ink-2">
                <p>
                  Ich habe unseren Termin in München in sehr guter Erinnerung. Umso mehr
                  habe ich Ihre offene Rückmeldung zur Finanzierung geschätzt.
                </p>
                <p>
                  Wenn ein erster Digitalisierungsschritt fachlich überzeugt und Ihrem Team
                  jeden Tag Arbeit abnimmt, sollte die Zahlungsstruktur aus meiner Sicht
                  nicht der einzige Grund sein, ihn aufzuschieben. Deshalb biete ich Ihnen
                  für dieses erste Modul eine Zahlungsweise an, die sich an Ihrer
                  aktuellen Planung orientiert.
                </p>
                <p className="text-ink">
                  An Umfang, Sorgfalt und Qualität der Umsetzung ändert das nichts.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
