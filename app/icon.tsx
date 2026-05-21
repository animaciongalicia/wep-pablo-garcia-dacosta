import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 46,
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1,
          paddingBottom: 6,
        }}
      >
        p
      </div>
    ),
    { ...size },
  );
}
