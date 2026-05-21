import Pagina from "@/components/Pagina";

const TITLE = "cómo está hecho";

export const metadata = {
  title: TITLE,
  openGraph: {
    title: TITLE,
    images: [`/og?title=${encodeURIComponent(TITLE)}`],
  },
};

export default async function ComoPage() {
  return <Pagina slug="como" />;
}
