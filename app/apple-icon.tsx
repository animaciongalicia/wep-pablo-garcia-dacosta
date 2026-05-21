import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafaf8",
          color: "#131311",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontSize: 124,
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1,
          paddingBottom: 14,
        }}
      >
        p
      </div>
    ),
    { ...size },
  );
}
