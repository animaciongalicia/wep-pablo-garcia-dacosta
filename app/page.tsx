import Entry from "@/components/Entry";
import Reveal from "@/components/Reveal";
import { getEntries } from "@/lib/entries";

export default async function HomePage() {
  const entries = await getEntries();

  return (
    <div className="rio">
      <p className="rio-hero">
        cuaderno público. sin orden. en español, a veces en galego.
      </p>
      {entries.map((entry) => (
        <Entry key={entry.slug} entry={entry} />
      ))}
      <Reveal />
    </div>
  );
}
