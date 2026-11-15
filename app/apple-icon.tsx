import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111214",
          borderRadius: "42px",
        }}
      >
        <svg
          width="118"
          height="118"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M5 11H22"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M5 18H13.5"
            stroke="#94A3B8"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M16.5 20.5L20.2 24.2L27 15.8"
            stroke="#BDF71D"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
