import { getPagina } from "@/lib/paginas";

interface Props {
  slug: string;
  variant?: "manifiesto";
}

export default async function Pagina({ slug, variant }: Props) {
  const { titulo, actualizado, leadingPara, bodyHtml } = await getPagina(slug);

  const label = actualizado
    ? `${titulo.toLowerCase()} · ${actualizado}`
    : titulo.toLowerCase();
  const bodyClass = variant ? `p-body ${variant}` : "p-body";

  return (
    <div className="page">
      <div className="p-label">{label}</div>
      <div className="p-titulo">{leadingPara}</div>
      {bodyHtml && (
        <div
          className={bodyClass}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </div>
  );
}
