"use client";

import { useState } from "react";

export default function Permalink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const url = `${window.location.origin}/#${slug}`;
      navigator.clipboard.writeText(url).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <a
      href={`#${slug}`}
      className="e-perma"
      aria-label="copiar enlace a esta entrada"
      onClick={handleClick}
    >
      {copied ? "copiado" : "#"}
    </a>
  );
}
