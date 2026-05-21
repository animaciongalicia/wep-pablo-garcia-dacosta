import { getEntries } from "@/lib/entries";

const BASE = "https://www.pablogarciadacosta.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const entries = await getEntries();

  const items = entries
    .map((e) => {
      const link = `${BASE}/#${e.slug}`;
      const pubDate = e.fecha
        ? new Date(`${e.fecha}T00:00:00Z`).toUTCString()
        : new Date().toUTCString();
      const description = e.contenido
        .map((p) => `<p>${escapeXml(p)}</p>`)
        .join("");

      return `    <item>
      <title>${escapeXml(e.titulo)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${e.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>pablo — cuaderno</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>cuaderno público de pablo garcía dacosta</description>
    <language>es-ES</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
