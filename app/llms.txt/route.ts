import { getEntries } from "@/lib/entries";

const BASE = "https://www.pablogarciadacosta.com";

export async function GET() {
  const entries = await getEntries();

  const intro = `# pablo — cuaderno

> Cuaderno público personal de Pablo García Dacosta. Pensamientos, citas, reflexiones, momentos. En español. A veces en gallego. Sin orden declarado. Sin portfolio, sin servicios, sin consultoría.`;

  const paginas = `## páginas
- [quién y por qué](${BASE}/quien): sobre quién escribe y por qué
- [manifiesto](${BASE}/manifiesto): lo que creo ahora mismo
- [cómo está hecho](${BASE}/como): el stack y el flujo`;

  const entradas = `## entradas
${entries.map((e) => `- [${e.titulo}](${BASE}/p/${e.slug})`).join("\n")}`;

  const feeds = `## otros
- [RSS](${BASE}/feed.xml)
- [sitemap](${BASE}/sitemap.xml)`;

  const body = `${intro}\n\n${paginas}\n\n${entradas}\n\n${feeds}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
