import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-proposal flex flex-col gap-4 text-caption text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-2">
          {SITE.clientShort} <span className="text-ink-4">×</span> {SITE.senderCompany}
          <span className="text-ink-4"> · Persönlicher Vorschlag · {SITE.proposalDate}</span>
        </p>
        <p>
          Erstellt von {SITE.senderName} ·{" "}
          <a
            href={SITE.senderWebsite}
            className="transition-colors duration-300 hover:text-ink"
            rel="noopener"
          >
            cogniiq.de
          </a>
        </p>
      </div>
      <div className="container-proposal mt-4">
        <p className="text-caption text-ink-4">
          Dieser Vorschlag ist ausschließlich für {SITE.clientName} bestimmt. Alle Beträge
          netto zuzüglich der gesetzlichen Umsatzsteuer.
        </p>
      </div>
    </footer>
  );
}
