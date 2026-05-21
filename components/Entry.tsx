import type { Entry as EntryT } from "@/lib/entries";
import Permalink from "@/components/Permalink";

const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function formatFecha(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return "—";
  const [, year, month, day] = m;
  return `${parseInt(day, 10)} ${MESES[parseInt(month, 10) - 1]} ${year}`;
}

export default function Entry({ entry }: { entry: EntryT }) {
  const { slug, titulo, estilo, fecha, lang, contenido } = entry;

  return (
    <article id={slug} className="entry">
      {lang === "gl" && <span className="gl-mark">galego</span>}

      {estilo === "quote" ? (
        <div className="e-quote">
          <div className="e-titulo">{titulo}</div>
          {contenido[0] && (
            <div className="e-quote-src">{contenido[0]}</div>
          )}
        </div>
      ) : (
        <div
          className={estilo === "normal" ? "e-body" : `e-body ${estilo}`}
        >
          <div className="e-titulo">{titulo}</div>
          {contenido.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      <div className="e-fecha">
        <span>{formatFecha(fecha)}</span>
        <Permalink slug={slug} />
      </div>
    </article>
  );
}
