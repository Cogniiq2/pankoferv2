"use client";

import { useId } from "react";

type Props = {
  label: string;
  /** Rendered next to the label – usually an animated value. */
  valueDisplay: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  /** Human readable value for screen readers, e.g. "50 Prozent". */
  valueText: string;
  minLabel: string;
  maxLabel: string;
  disabled?: boolean;
  hint?: string;
};

/**
 * A native range input styled as a premium slider. The native element keeps
 * keyboard, screen-reader and touch behaviour intact; the fill is driven
 * through a CSS custom property so the track updates without re-layout.
 */
export function PlannerSlider({
  label,
  valueDisplay,
  value,
  min,
  max,
  step,
  onChange,
  valueText,
  minLabel,
  maxLabel,
  disabled = false,
  hint,
}: Props) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className={`transition-opacity duration-500 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-body font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="num shrink-0 whitespace-nowrap text-body text-ink" aria-live="off">
          {valueDisplay}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="slider mt-2"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
      <div className="num -mt-1 flex justify-between text-caption text-ink-4">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      {hint && <p className="mt-3 text-caption text-ink-3">{hint}</p>}
    </div>
  );
}
