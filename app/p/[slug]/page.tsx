import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Entry from "@/components/Entry";
import { getEntries } from "@/lib/entries";

const SITE_URL = "https://www.pablogarciadacosta.com";

function buildDescription(parrafos: string[]): string {
  const text = parrafos.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : 152).trim()}…`;
}

export async function generateStaticParams() {
  const entries = await getEntries();
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entries = await getEntries();
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return {};

  const description = buildDescription(entry.contenido);
  const url = `/p/${slug}`;
  const ogImage = `/og?title=${encodeURIComponent(entry.titulo)}`;

  return {
    title: entry.titulo,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.titulo,
      description,
      url,
      type: "article",
      publishedTime: entry.fecha ? `${entry.fecha}T00:00:00Z` : undefined,
      locale: entry.lang === "gl" ? "gl_ES" : "es_ES",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.titulo,
      description,
      images: [ogImage],
    },
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entries = await getEntries();
  const idx = entries.findIndex((e) => e.slug === slug);
  if (idx === -1) notFound();

  const entry = entries[idx];
  const masNuevo = entries[idx - 1] ?? null;
  const masAntiguo = entries[idx + 1] ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.titulo,
    description: buildDescription(entry.contenido),
    datePublished: entry.fecha || undefined,
    inLanguage: entry.lang === "gl" ? "gl-ES" : "es-ES",
    author: {
      "@type": "Person",
      name: "Pablo García Dacosta",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Pablo García Dacosta",
    },
    url: `${SITE_URL}/p/${entry.slug}`,
    image: `${SITE_URL}/og?title=${encodeURIComponent(entry.titulo)}`,
  };

  return (
    <div className="rio rio-single">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Entry entry={entry} />
      <nav className="entry-nav" aria-label="navegación entre entradas">
        <div className="entry-nav-side">
          {masAntiguo && (
            <Link href={`/p/${masAntiguo.slug}`} className="entry-nav-link">
              <span className="entry-nav-dir">← más antiguo</span>
              <span className="entry-nav-title">{masAntiguo.titulo}</span>
            </Link>
          )}
        </div>
        <Link href="/" className="entry-nav-home">
          río
        </Link>
        <div className="entry-nav-side entry-nav-side-right">
          {masNuevo && (
            <Link href={`/p/${masNuevo.slug}`} className="entry-nav-link">
              <span className="entry-nav-dir">más nuevo →</span>
              <span className="entry-nav-title">{masNuevo.titulo}</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
