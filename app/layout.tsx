import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: `Persönlicher Vorschlag · ${SITE.clientShort} × ${SITE.senderCompany}`,
  description: `${SITE.proposalTitle} – ein erster Digitalisierungsschritt für ${SITE.clientName}. Persönlicher Vorschlag von ${SITE.senderName}, ${SITE.senderCompany}.`,
  robots: { index: false, follow: false, nocache: true },
  applicationName: SITE.proposalTitle,
  authors: [{ name: SITE.senderName }],
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`no-js ${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Removes the no-js class before first paint so reveal animations can run. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
