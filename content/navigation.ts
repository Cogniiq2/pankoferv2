/** Anchor navigation shown in the sticky header. Ids must match section ids. */
export const NAV = [
  { id: "vorschlag", label: "Vorschlag" },
  { id: "modul", label: "Modul" },
  { id: "wirkung", label: "Wirkung" },
  { id: "investition", label: "Investition" },
  { id: "zahlungsplan", label: "Zahlungsplan" },
  { id: "gespraech", label: "Gespräch" },
] as const;

export type NavId = (typeof NAV)[number]["id"];
