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

## Deployment (Cloudflare Workers via OpenNext)

Worker-Name: **`pankoferv2`**. Er ist in `wrangler.jsonc` festgelegt und muss
dort mit dem Self-Reference-Service-Binding `WORKER_SELF_REFERENCE`
übereinstimmen. `package.json` trägt denselben Namen.

| Datei | Zweck |
| --- | --- |
| `wrangler.jsonc` | Worker-Name, Einstiegspunkt, Assets, Bindings, Observability |
| `open-next.config.ts` | OpenNext-Adapter; Cache aus Workers Static Assets (keine R2/KV-Ressourcen nötig) |
| `public/_headers` | Caching für `/_next/static/*` und `X-Robots-Tag` für alle Assets |

Weil `wrangler.jsonc` und `open-next.config.ts` im Repository liegen, führt
Cloudflare keine automatische `opennextjs-cloudflare migrate` mehr aus.

Einstellungen in Cloudflare Workers Builds:

- Build command: `pnpm run cf:build`
- Deploy command: `pnpm exec opennextjs-cloudflare deploy`

Der Deploy-Befehl von OpenNext kopiert die vorgerenderten Seiten in die
Static Assets und ruft danach `wrangler deploy` auf. Ein direktes
`wrangler deploy` würde diesen Schritt überspringen.

```bash
pnpm run cf:build                                 # OpenNext-Build nach .open-next/
pnpm run preview                                  # lokal im Workers-Runtime testen
pnpm exec opennextjs-cloudflare deploy --dry-run  # Konfiguration prüfen, ohne zu deployen
pnpm run deploy                                   # Build + Deploy (nicht "pnpm deploy")
```
