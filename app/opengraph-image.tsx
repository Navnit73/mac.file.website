import { ImageResponse } from "next/og";

export const alt =
  "ClearTie — Bank Statement and Business Ledger Reconciliation Utility";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111214",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "999px",
                backgroundColor: "#BDF71D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111214"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              CLEARTIE
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#BDF71D",
              color: "#111214",
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            $0.00 Variance Tie-Out
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Reconcile Bank Statement Records Automatically
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#CBD5E1",
              lineHeight: 1.4,
            }}
          >
            Automated bank statement vs. business ledger comparison with PDF
            OCR, duplicate detection, and XLSX/CSV export.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "20px",
            color: "#BDF71D",
            fontWeight: 600,
          }}
        >
          <span>PDF OCR, Images, CSV &amp; XLSX</span>
          <span>|</span>
          <span>Matches, Gaps &amp; Duplicates</span>
          <span>|</span>
          <span>Balance Check &amp; Export</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
