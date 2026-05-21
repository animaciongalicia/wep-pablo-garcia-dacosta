"use client";

import { useState } from "react";

export default function Permalink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    e.preventDefault();
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <a
      href={`/p/${slug}`}
      className="e-perma"
      aria-label="copiar enlace a esta entrada"
      onClick={handleCopy}
    >
      {copied ? "copiado" : "↗"}
    </a>
  );
}
