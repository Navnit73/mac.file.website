# reconcilebankstatement — Bank Statement & Business Ledger Reconciliation Utility

Compare a bank statement against a business ledger (cash book / general ledger export) to identify matched transactions, bank-only and book-only gaps, possible duplicates, amount or direction mismatches, opening/closing & running-balance checks, and downloadable XLSX or CSV reports.

## Getting Started

1. Configure server environment variables in `.env.local` (see `.env.example`):

```bash
OCR_API_BASE_URL=https://api.example.com/api/v1
OCR_API_KEY=your_api_key_here
```

2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the reconciliation utility.

## Reusable Architecture

- `app/api/reconciliation/*`: Next.js BFF Route Handlers injecting `X-API-Key` server-side (supporting guest `X-Reconciliation-Token` fallback as well).
- `lib/reconciliation/*`: TypeScript contracts, client wrapper, validation helpers, and server utilities.
- `hooks/use-reconciliation.ts`: Headless React hook managing upload, polling, `sessionStorage` resume, category filtering, pagination, and XLSX/CSV downloads.
- `components/reconciliation/*`: Reusable `ReconciliationDropzone`, `ReconciliationUploadForm`, `ReconciliationProgressCard`, `ReconciliationReportView`, and `BankReconciliationWorkbench` components.
