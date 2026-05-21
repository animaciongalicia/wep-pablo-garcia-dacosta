import Link from "next/link";

export const metadata = {
  title: "no encontrado",
};

export default function NotFound() {
  return (
    <div className="page">
      <div className="p-label">404</div>
      <div className="p-titulo">No tengo esto.</div>
      <div className="p-body">
        <p>
          O nunca lo escribí, o ya no está, o quizá el enlace estaba mal.
        </p>
        <p>
          Puedes <Link href="/">volver al río</Link> y empezar otra vez.
        </p>
      </div>
    </div>
  );
}
