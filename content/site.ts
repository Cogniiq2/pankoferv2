/** Sender / contact details used in the header, CTA and footer. */
export const SITE = {
  clientName: "Pankofer Sicherheitstechnik GmbH",
  clientShort: "Pankofer",
  clientCity: "München",
  senderCompany: "Cogniiq",
  senderName: "Lazar Popovic",
  senderEmail: "info@cogniiq.de",
  senderWebsite: "https://cogniiq.de",
  proposalTitle: "Pankofer Operations Automation",
  proposalSubtitle: "E-Mail, Dokumente & Statusprozesse",
  /** Month shown in the header and footer. */
  proposalDate: "September 2026",
} as const;

export const MAILTO = `mailto:${SITE.senderEmail}?subject=${encodeURIComponent(
  "Rückfrage zum Vorschlag: Pankofer Operations Automation",
)}`;
