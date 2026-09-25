import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Use "h1" only in the hero. */
  level?: "h1" | "h2";
  /** Optional numeric index rendered next to the eyebrow, e.g. "03". */
  index?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
  level = "h2",
  index,
}: Props) {
  const Heading = level;
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          {index && (
            <span className="num text-ink-4" aria-hidden>
              {index}
            </span>
          )}
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <Heading
          className={`serif-display text-h2 text-balance mt-5 ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"}`}
        >
          {title}
        </Heading>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`text-lead text-pretty mt-6 text-ink-2 ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
