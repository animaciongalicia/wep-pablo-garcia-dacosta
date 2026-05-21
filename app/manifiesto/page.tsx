import Pagina from "@/components/Pagina";

const TITLE = "manifiesto";

export const metadata = {
  title: TITLE,
  openGraph: {
    title: TITLE,
    images: [`/og?title=${encodeURIComponent(TITLE)}`],
  },
};

export default async function ManifiestoPage() {
  return <Pagina slug="manifiesto" variant="manifiesto" />;
}
