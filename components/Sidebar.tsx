"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "pensamientos" },
  { href: "/quien", label: "quién y por qué" },
  { href: "/manifiesto", label: "manifiesto" },
  { href: "/como", label: "cómo está hecho" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <div className="s-brand">
        <span className="sr-only">Pablo García Dacosta</span>
        <span aria-hidden="true" className="s-brand-line s-brand-first">
          pablo
        </span>
        <span aria-hidden="true" className="s-brand-line">
          garcía
        </span>
        <span aria-hidden="true" className="s-brand-line">
          dacosta
        </span>
      </div>
      <p className="s-slogan">
        pensando
        <br />
        en voz alta
      </p>
      <nav>
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`s-link${active ? " on" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="s-bottom">
        <span>
          a coruña
          <br />
          galicia
        </span>
        <a
          href="/feed.xml"
          className="s-rss"
          aria-label="suscríbete por RSS"
        >
          rss
        </a>
      </div>
    </aside>
  );
}
