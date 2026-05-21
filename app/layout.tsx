import type { Metadata } from "next";
import { Fraunces, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BackToTop from "@/components/BackToTop";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const SITE_URL = "https://www.pablogarciadacosta.com";
const SITE_TITLE = "pablo — cuaderno";
const SITE_DESC = "cuaderno público de pablo garcía dacosta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — pablo",
  },
  description: SITE_DESC,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `/og?title=${encodeURIComponent(SITE_TITLE)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": "/feed.xml" },
  },
  verification: {
    google: "RcnSs35uM3qC6GSIbBQrPJqR0OHokqxZl5ZwJm4Lrxw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: SITE_TITLE,
                url: SITE_URL,
                description: SITE_DESC,
                inLanguage: "es-ES",
                author: {
                  "@type": "Person",
                  name: "Pablo García Dacosta",
                  url: SITE_URL,
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Pablo García Dacosta",
                url: SITE_URL,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "A Coruña",
                  addressRegion: "Galicia",
                  addressCountry: "ES",
                },
              },
            ]),
          }}
        />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          ir al contenido
        </a>
        <Sidebar />
        <main id="contenido">{children}</main>
        <BackToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
