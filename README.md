# Pankofer × Cogniiq – Persönlicher Vorschlag

Einseitige, personalisierte Angebotsseite für Pankofer Sicherheitstechnik GmbH
(„Pankofer Operations Automation“) von Cogniiq / Lazar Popovic.

## Stack

- Next.js 16 (App Router, statisch vorgerendert), React 19, TypeScript
- Tailwind CSS v4 (Design-Tokens in `app/globals.css`)
- Motion (`motion/react`) für Scroll-Reveals, Prozessgrafik und den Zahlungsplaner
- Schriften: Newsreader (Editorial-Headlines) und Inter (Fließtext) über `next/font`

## Struktur

| Pfad | Inhalt |
| --- | --- |
| `app/page.tsx` | Reihenfolge der Abschnitte |
| `components/sections/*` | Ein Abschnitt pro Datei (Hero, PersonalNote, PaymentPlanner, …) |
| `components/ui/*` | Wiederverwendbare Bausteine (Reveal, Button, Slider, Tooltip, …) |
| `lib/pricing.ts` | Alle Geschäftskonstanten, Zahlungsplan-Berechnung und Währungsformatierung |
| `lib/pricing.test.ts` | Tests der Berechnung (`pnpm test`) |
| `content/site.ts` | Absender, Empfänger, Datum, Kontakt-E-Mail |
| `content/navigation.ts` | Anker der Sticky-Navigation |

Preise, Grenzen des Zahlungsplans und die besprochenen Kennzahlen werden
ausschließlich in `lib/pricing.ts` gepflegt.

## Entwicklung

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # typecheck + lint + tests
pnpm build      # Produktions-Build (statisch)
```

Die Seite ist per `robots: noindex` und `X-Robots-Tag` von Suchmaschinen ausgeschlossen.
