import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/entries";

const BASE = "https://www.pablogarciadacosta.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = await getEntries();

  const fijas: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/quien`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE}/manifiesto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/como`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const posts: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE}/p/${e.slug}`,
    lastModified: e.fecha ? new Date(`${e.fecha}T00:00:00Z`) : now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...fijas, ...posts];
}
