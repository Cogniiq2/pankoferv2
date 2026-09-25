"use client";

import { Printer } from "./Icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex items-center gap-2 text-small text-ink-3 transition-colors duration-300 hover:text-ink"
    >
      <Printer size={16} />
      Vorschlag als PDF speichern
    </button>
  );
}
