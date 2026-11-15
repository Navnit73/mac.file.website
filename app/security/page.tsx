import Link from "next/link";
import { createPageMetadata, SITE_CONFIG } from "@/lib/site-config";
import { TrustPageShell } from "@/components/trust/trust-page-shell";

export const metadata = createPageMetadata({
  path: "/security",
  title: `Security Practices & Architecture | ${SITE_CONFIG.brandName}`,
  description:
    "Verified security practices of reconcilebankstatement.online: no bank login credentials requested, proxy request safeguards, transient PDF unlock handling, and HMAC-SHA256 webhook verification.",
});

export default function SecurityPage() {
  return (
    <TrustPageShell
      path="/security"
      eyebrow="Security & Data Protection"
      title="Security Architecture &amp; Verified Safeguards"
      lead="Trustworthy financial tools state only what their codebase actually enforces. Below is a strictly factual summary of how reconcilebankstatement handles uploads, access tokens, and PDF unlock passwords—plus infrastructure items clearly noted for deployment verification."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Security" },
      ]}
      sections={[
        { id: "verified-controls", label: "Implemented Application Controls" },
        { id: "pdf-passwords", label: "Encrypted PDF Passwords" },
        { id: "api-proxy", label: "Proxy, Validation & Webhooks" },
        { id: "deployment-checks", label: "Verification Boundaries" },
      ]}
      notice={{
        title: "Compliance & Infrastructure Scope",
        body: "This application does not claim SOC 2, ISO 27001, PCI-DSS, or HIPAA certifications. Encryption in transit applies to HTTPS endpoints; upstream server storage and cleanup depend on the deployed reconciliation processing host.",
      }}
      relatedLinks={[
        {
          title: "Privacy Policy",
          description:
            "How uploaded financial documents, metadata, and emails are collected and used.",
          href: "/privacy",
        },
        {
          title: "Data Retention Policy",
          description:
            "Browser sessionStorage lifecycle and upstream run expiration details.",
          href: "/data-retention-policy",
        },
        {
          title: "Responsible Use",
          description:
            "Guidance for safely handling client statements and sensitive exports.",
          href: "/responsible-use",
        },
      ]}
    >
      <section
        id="verified-controls"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          1. Implemented Application Security Controls
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Zero Bank Login Credentials Collected
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              reconcilebankstatement never requests online banking usernames, passwords, MFA
              codes, or third-party bank-feed aggregator tokens. You retain full
              control by uploading exported statement files directly.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Server-Side API Key Isolation
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              In default proxy mode (<code>/api/reconciliation/*</code>),
              server-to-server requests attach authentication headers from
              server environment configuration without exposing secrets to
              client JavaScript.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              Input &amp; Route Validation
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              Reconciliation identifiers are validated against a strict pattern (
              <code>^[a-zA-Z0-9_-]&#123;3,128&#125;$</code>) before upstream
              requests; both client and API route upload handlers enforce file
              extension allowlists and the 100 MB limit prior to forwarding.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5">
            <h3 className="text-sm font-semibold text-[#111214] sm:text-base">
              No-Store API Caching &amp; Redirect Blocking
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
              API proxy calls set <code>cache: &quot;no-store&quot;</code> and{" "}
              <code>redirect: &quot;error&quot;</code>, and return{" "}
              <code>Cache-Control: no-store</code> headers on JSON responses so
              financial payloads are not cached by shared CDN edges.
            </p>
          </div>
        </div>
      </section>

      <section
        id="pdf-passwords"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          2. Encrypted PDF Password Handling
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          When reconciling a password-protected PDF statement, optional{" "}
          <code>bank_statement_password</code> or{" "}
          <code>business_ledger_password</code> inputs use masked{" "}
          <code>type=&quot;password&quot;</code> fields with{" "}
          <code>autoComplete=&quot;off&quot;</code> and are forwarded directly
          in the multipart upload request for transient in-memory decryption.
          Passwords are not saved in browser <code>sessionStorage</code>,{" "}
          <code>localStorage</code>, or cookies.
        </p>
      </section>

      <section
        id="api-proxy"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          3. Webhooks &amp; Transport Security
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          Optional completion webhooks enforce <code>https://</code> URL
          validation before submission and accept an optional{" "}
          <code>webhook_secret</code> for HMAC-SHA256 payload verification. All
          public traffic to <code>https://reconcilebankstatement.online</code>{" "}
          is served over HTTPS/TLS in production so uploads and reports are
          encrypted in transit.
        </p>
      </section>

      <section
        id="deployment-checks"
        className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-[#111214] sm:text-2xl">
          4. Processing Boundaries &amp; Vulnerability Reporting
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5A5E67]">
          While this web application enforces strict upload validation,
          non-persistent cache headers, and masked transient password handling,
          storage-at-rest and automated file purging are governed by the
          configured upstream reconciliation processor. To report a security
          concern, write directly to{" "}
          <a
            href={`mailto:${SITE_CONFIG.contacts.securityEmail}`}
            className="font-semibold text-[#111214] underline"
          >
            {SITE_CONFIG.contacts.securityEmail}
          </a>{" "}
          or read our{" "}
          <Link href="/privacy" className="font-semibold text-[#111214] underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/data-retention-policy"
            className="font-semibold text-[#111214] underline"
          >
            Data Retention Policy
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
