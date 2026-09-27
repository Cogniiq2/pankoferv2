import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    title: "Persönlich statt anonym",
    text: "Sie haben einen festen Ansprechpartner, der Ihre Abläufe aus dem Gespräch vor Ort kennt – vom ersten Termin bis in den laufenden Betrieb.",
  },
  {
    title: "Alltagstauglich statt beeindruckend",
    text: "Technik ist nur dann gut, wenn sie den Arbeitsalltag einfacher macht. Daran orientiert sich jede Entscheidung im Projekt.",
  },
  {
    title: "Ehrlich statt vollmundig",
    text: "Grenzen des Systems werden vorher benannt, nicht hinterher entdeckt. Was es nicht sicher beherrscht, landet bei einem Menschen.",
  },
] as const;

export function WorkingPrinciples() {
  return (
    <section aria-labelledby="principles-title" className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="container-proposal">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="num text-ink-4" aria-hidden>10</span>
            <span>Wie ich arbeite</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="principles-title"
            className="serif-display text-balance mt-8 max-w-4xl text-[clamp(1.6rem,1.15rem+1.7vw,2.6rem)] leading-[1.22] text-ink"
          >
            Für mich endet ein Projekt nicht mit der technischen Übergabe. Entscheidend
            ist, dass die Lösung im Alltag funktioniert, Ihr Team tatsächlich entlastet
            und Sie mit der Zusammenarbeit langfristig zufrieden sind.
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-3" stagger={0.1}>
          {PRINCIPLES.map((p) => (
            <RevealItem as="li" key={p.title}>
              <h3 className="text-body font-medium text-ink">{p.title}</h3>
              <p className="mt-2.5 text-small text-pretty text-ink-3">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
