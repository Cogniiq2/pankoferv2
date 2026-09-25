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
                Weil ein sinnvoller Schritt nicht an der Zahlungsweise scheitern sollte.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.12}>
              <div className="prose-measure space-y-6 text-pretty text-ink-2">
                <p>
                  Sie haben in München einen sehr positiven Eindruck bei mir hinterlassen.
                  Und Sie sind mit der Finanzierungsfrage offen umgegangen, statt das Thema
                  einfach ruhen zu lassen. Beides schätze ich.
                </p>
                <p>
                  Ich möchte nicht, dass ein Projekt, das Ihrem Team im Alltag spürbar
                  hilft, allein daran scheitert, dass der Betrag auf einmal fällig wäre.
                  Deshalb gestalte ich die erste Phase für Sie bewusst flexibler, als ich
                  es üblicherweise tue.
                </p>
                <p className="text-ink">
                  Am Umfang, an der Sorgfalt und an der Qualität der Umsetzung ändert das
                  nichts.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
