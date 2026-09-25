import { LinkButton } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";
import { Reveal } from "@/components/ui/Reveal";
import { MAILTO, SITE } from "@/content/site";

export function FinalCTA() {
  return (
    <section id="gespraech" aria-labelledby="cta-title" className="scroll-mt-24 py-28 sm:py-40">
      <div className="container-proposal">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Nächster Schritt</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="cta-title" className="serif-display text-h2 text-balance mt-6 text-ink">
              Wenn dieser Ansatz für Sie grundsätzlich sinnvoll klingt, gehen wir ihn
              gemeinsam in Ruhe durch.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lead text-pretty mx-auto mt-8 max-w-2xl text-ink-2">
              Gerne passe ich den Zahlungsplan und die genaue Umsetzung gemeinsam mit Ihnen
              an Ihre Abläufe an. Sie können auch einfach direkt auf meine E-Mail antworten.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center gap-5">
              <LinkButton href={MAILTO}>Vorschlag gemeinsam besprechen</LinkButton>
              <p className="text-small text-ink-3">
                {SITE.senderName} ·{" "}
                <a
                  href={`mailto:${SITE.senderEmail}`}
                  className="underline decoration-ink/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink/60"
                >
                  {SITE.senderEmail}
                </a>
              </p>
              <PrintButton />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
