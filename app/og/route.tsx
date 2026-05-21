import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "pablo — cuaderno").slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f7f4",
          color: "#131311",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "90px 100px",
          fontFamily: "serif",
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
    { width: 1200, height: 630 },
  );
}
