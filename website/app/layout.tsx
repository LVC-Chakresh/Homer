import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Homer — search web pages by meaning, not keywords",
    template: "%s — Homer",
  },
  description:
    "Homer is a browser extension that finds text on web pages by meaning rather than exact string matches. Press Ctrl+F, ask a question in plain English, and it marks the one passage on the page that answers it.",
  applicationName: "Homer",
  openGraph: {
    type: "website",
    siteName: "Homer",
    title: "Homer — search web pages by meaning, not keywords",
    description:
      "Press Ctrl+F, ask a question in plain English, and Homer marks the one passage on the page that answers it.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homer — search web pages by meaning, not keywords",
    description:
      "Press Ctrl+F, ask a question in plain English, and Homer marks the one passage on the page that answers it.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
