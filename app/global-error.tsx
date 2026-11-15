"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("Global error boundary triggered:", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#ffffff",
          color: "#111214",
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <title>Application Error | reconcilebankstatement</title>
        <main
          id="main-content"
          style={{
            width: "100%",
            maxWidth: "520px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5a5e67",
            }}
          >
            Application Recovery
          </p>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "26px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            We ran into a critical error
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#5a5e67",
            }}
          >
            Please try reloading the application or returning to the homepage.
          </p>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                minHeight: "42px",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: "#111214",
                color: "#ffffff",
                padding: "0 24px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              style={{
                minHeight: "42px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "9999px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#111214",
                padding: "0 24px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to Homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
