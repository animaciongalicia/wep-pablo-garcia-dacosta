import { ImageResponse } from "next/og";

let fontCache: ArrayBuffer | null | undefined;

async function loadFraunces(): Promise<ArrayBuffer | null> {
  if (fontCache !== undefined) return fontCache;
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        cache: "force-cache",
      },
    );
    if (!cssRes.ok) {
      fontCache = null;
      return null;
    }
    const css = await cssRes.text();
    const match = /src:\s*url\((https?:\/\/[^)]+)\)/.exec(css);
    if (!match) {
      fontCache = null;
      return null;
    }
    const fontRes = await fetch(match[1], { cache: "force-cache" });
    if (!fontRes.ok) {
      fontCache = null;
      return null;
    }
    fontCache = await fontRes.arrayBuffer();
    return fontCache;
  } catch {
    fontCache = null;
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "pablo — cuaderno").slice(0, 140);

  const font = await loadFraunces();
  const fonts = font
    ? [
        {
          name: "Fraunces",
          data: font,
          weight: 300 as const,
          style: "normal" as const,
        },
      ]
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafaf8",
          color: "#131311",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "90px 100px",
          fontFamily: "Fraunces, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(19,19,17,0.4)",
            fontFamily: "monospace",
          }}
        >
          pablo
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            maxWidth: 900,
            fontFamily: "Fraunces, serif",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(19,19,17,0.4)",
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
        >
          pablogarciadacosta.com
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
