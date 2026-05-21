import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Pagina {
  slug: string;
  titulo: string;
  actualizado: string | null;
  leadingPara: string;
  bodyHtml: string;
}

const PAGINAS_DIR = join(process.cwd(), "content", "paginas");

export async function getPagina(slug: string): Promise<Pagina> {
  const raw = await readFile(join(PAGINAS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const trimmed = content.trim();
  const idx = trimmed.indexOf("\n\n");
  const leadingPara = idx === -1 ? trimmed : trimmed.slice(0, idx).trim();
  const rest = idx === -1 ? "" : trimmed.slice(idx + 2).trim();
  const bodyHtml = rest ? (marked.parse(rest, { async: false }) as string) : "";

  return {
    slug,
    titulo: String(data.titulo ?? ""),
    actualizado: data.actualizado ? String(data.actualizado) : null,
    leadingPara,
    bodyHtml,
  };
}
