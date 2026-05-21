import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export type Estilo = "normal" | "xl" | "italic" | "mono" | "quote";
export type Lang = "es" | "gl";

export interface Entry {
  slug: string;
  titulo: string;
  estilo: Estilo;
  fecha: string;
  lang: Lang;
  contenido: string[];
}

const ENTRADAS_DIR = join(process.cwd(), "content", "entradas");

function toISODate(value: unknown): string {
  if (value instanceof Date) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, "0");
    const d = String(value.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(value ?? "");
}

export async function getEntries(): Promise<Entry[]> {
  const files = await readdir(ENTRADAS_DIR);

  const entries = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await readFile(join(ENTRADAS_DIR, file), "utf8");
        const { data, content } = matter(raw);

        const contenido = content
          .trim()
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean);

        return {
          slug: file.replace(/\.md$/, ""),
          titulo: String(data.titulo ?? ""),
          estilo: (data.estilo ?? "normal") as Estilo,
          fecha: toISODate(data.fecha),
          lang: (data.lang ?? "es") as Lang,
          contenido,
        } satisfies Entry;
      }),
  );

  return entries.sort((a, b) => b.fecha.localeCompare(a.fecha));
}
