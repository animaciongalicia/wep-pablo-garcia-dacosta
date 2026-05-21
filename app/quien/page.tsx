import Pagina from "@/components/Pagina";

const TITLE = "quién y por qué";

export const metadata = {
  title: TITLE,
  openGraph: {
    title: TITLE,
    images: [`/og?title=${encodeURIComponent(TITLE)}`],
  },
};

export default async function QuienPage() {
  return <Pagina slug="quien" />;
}
