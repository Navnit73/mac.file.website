export function HeroReconciliationIllustration() {
  return (
    <svg
      viewBox="0 16 600 388"
      className="h-auto w-full overflow-visible select-none"
      role="img"
      aria-label="Diagram illustrating bank statement and business ledger files flowing into ClearTie matching engine to produce a verified $0.00 variance report"
    >
      <defs>
        <linearGradient id="heroLimeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D7FF47" />
          <stop offset="100%" stopColor="#BDF71D" />
        </linearGradient>
        <filter id="cardShadow" x="-12%" y="-12%" width="124%" height="128%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="12"
            floodColor="#111214"
            floodOpacity="0.09"
          />
        </filter>
      </defs>

      {/* Subtle structural grid lines */}
      <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" opacity="0.55">
        <line x1="20" y1="70" x2="580" y2="70" />
        <line x1="20" y1="210" x2="580" y2="210" />
        <line x1="20" y1="350" x2="580" y2="350" />
        <line x1="215" y1="24" x2="215" y2="396" />
        <line x1="385" y1="24" x2="385" y2="396" />
      </g>

        {/* Connector paths from inputs to center node */}
        <path
          d="M 192 108 C 242 108, 250 202, 274 202"
          fill="none"
          stroke="#111214"
          strokeWidth="2.2"
        />
        <path
          d="M 192 296 C 242 296, 250 218, 274 218"
          fill="none"
          stroke="#111214"
          strokeWidth="2.2"
        />
        {/* Connector path from center node to verified output */}
        <path
          d="M 328 210 L 398 210"
          fill="none"
          stroke="#BDF71D"
          strokeWidth="3.5"
        />
        <circle cx="236" cy="142" r="4" fill="#BDF71D" stroke="#111214" strokeWidth="1.5" />
        <circle cx="236" cy="270" r="4" fill="#BDF71D" stroke="#111214" strokeWidth="1.5" />
        <circle cx="364" cy="210" r="4.5" fill="#10B981" />

        {/* Input 1: Bank Statement Card */}
        <g filter="url(#cardShadow)">
          <rect
            x="22"
            y="34"
            width="172"
            height="154"
            rx="18"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <rect x="34" y="46" width="84" height="20" rx="10" fill="#111214" />
          <text
            x="45"
            y="59.5"
            fill="#BDF71D"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            BANK PDF
          </text>
          <rect x="132" y="46" width="48" height="20" rx="10" fill="#F1F5F9" />
          <text
            x="143"
            y="59.5"
            fill="#5A5E67"
            fontSize="9"
            fontWeight="600"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            OCR
          </text>

          {/* Statement Lines */}
          <rect x="34" y="80" width="148" height="24" rx="7" fill="#F7F8F9" />
          <circle cx="45" cy="92" r="3.5" fill="#10B981" />
          <rect x="54" y="89" width="52" height="6" rx="3" fill="#CBD5E1" />
          <text
            x="174"
            y="95.5"
            textAnchor="end"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            +$4,200
          </text>

          <rect x="34" y="111" width="148" height="24" rx="7" fill="#F7F8F9" />
          <circle cx="45" cy="123" r="3.5" fill="#10B981" />
          <rect x="54" y="120" width="60" height="6" rx="3" fill="#CBD5E1" />
          <text
            x="174"
            y="126.5"
            textAnchor="end"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            -$450
          </text>

          <rect
            x="34"
            y="142"
            width="148"
            height="24"
            rx="7"
            fill="#FFFBEB"
            stroke="#FDE68A"
            strokeWidth="1"
          />
          <circle cx="45" cy="154" r="3.5" fill="#F59E0B" />
          <rect x="54" y="151" width="56" height="6" rx="3" fill="#FCD34D" />
          <text
            x="174"
            y="157.5"
            textAnchor="end"
            fill="#92400E"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            -$35 Fee
          </text>
        </g>

        {/* Input 2: Business Ledger Card */}
        <g filter="url(#cardShadow)">
          <rect
            x="22"
            y="224"
            width="172"
            height="154"
            rx="18"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.2"
          />
          <rect x="34" y="236" width="92" height="20" rx="10" fill="#F1F5F9" />
          <text
            x="43"
            y="249.5"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            LEDGER XLSX
          </text>
          <rect x="132" y="236" width="48" height="20" rx="10" fill="#ECFDF5" />
          <text
            x="141"
            y="249.5"
            fill="#047857"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            ±2d
          </text>

          <rect x="34" y="270" width="148" height="24" rx="7" fill="#F7F8F9" />
          <circle cx="45" cy="282" r="3.5" fill="#10B981" />
          <rect x="54" y="279" width="52" height="6" rx="3" fill="#CBD5E1" />
          <text
            x="174"
            y="285.5"
            textAnchor="end"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            +$4,200
          </text>

          <rect x="34" y="301" width="148" height="24" rx="7" fill="#F7F8F9" />
          <circle cx="45" cy="313" r="3.5" fill="#10B981" />
          <rect x="54" y="310" width="60" height="6" rx="3" fill="#CBD5E1" />
          <text
            x="174"
            y="316.5"
            textAnchor="end"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            -$450
          </text>

          <rect
            x="34"
            y="332"
            width="148"
            height="24"
            rx="7"
            fill="#EFF6FF"
            stroke="#BFDBFE"
            strokeWidth="1"
          />
          <circle cx="45" cy="344" r="3.5" fill="#3B82F6" />
          <rect x="54" y="341" width="50" height="6" rx="3" fill="#93C5FD" />
          <text
            x="174"
            y="347.5"
            textAnchor="end"
            fill="#1E40AF"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            Chk #2084
          </text>
        </g>

        {/* Center Engine Node */}
        <g filter="url(#cardShadow)">
          <circle cx="300" cy="210" r="44" fill="#111214" />
          <circle
            cx="300"
            cy="210"
            r="34"
            fill="none"
            stroke="#BDF71D"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <circle cx="300" cy="210" r="22" fill="url(#heroLimeGrad)" />
          <path
            d="M291 210.5 L297 216.5 L310 203.5"
            fill="none"
            stroke="#111214"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <rect x="256" y="264" width="88" height="22" rx="11" fill="#111214" />
        <text
          x="300"
          y="278.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          Match Engine
        </text>

        {/* Right Output: Verified Report Card */}
        <g filter="url(#cardShadow)">
          <rect
            x="396"
            y="62"
            width="184"
            height="296"
            rx="22"
            fill="#111214"
          />
          <rect
            x="412"
            y="80"
            width="112"
            height="22"
            rx="11"
            fill="#BDF71D"
          />
          <text
            x="468"
            y="94.5"
            textAnchor="middle"
            fill="#111214"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            TIE-OUT VERIFIED
          </text>

          <text
            x="414"
            y="128"
            fill="#94A3B8"
            fontSize="10"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Unexplained Variance
          </text>
          <text
            x="414"
            y="158"
            fill="#FFFFFF"
            fontSize="26"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            $0.00
          </text>

          {/* Breakdown Rows inside Report */}
          <rect x="412" y="178" width="152" height="32" rx="10" fill="#1E2024" />
          <text x="424" y="198" fill="#E2E8F0" fontSize="10" fontWeight="600">
            Matched Pairs
          </text>
          <text
            x="552"
            y="198"
            textAnchor="end"
            fill="#BDF71D"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            98.2%
          </text>

          <rect x="412" y="218" width="152" height="32" rx="10" fill="#1E2024" />
          <text x="424" y="238" fill="#E2E8F0" fontSize="10" fontWeight="600">
            Bank Gaps
          </text>
          <text
            x="552"
            y="238"
            textAnchor="end"
            fill="#FBBF24"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            -$35.00
          </text>

          <rect x="412" y="258" width="152" height="32" rx="10" fill="#1E2024" />
          <text x="424" y="278" fill="#E2E8F0" fontSize="10" fontWeight="600">
            Running Balance
          </text>
          <text
            x="552"
            y="278"
            textAnchor="end"
            fill="#34D399"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            PASSED
          </text>

          {/* Export Badges */}
          <rect x="412" y="308" width="72" height="28" rx="14" fill="#BDF71D" />
          <text
            x="448"
            y="325.5"
            textAnchor="middle"
            fill="#111214"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            .XLSX
          </text>
          <rect
            x="492"
            y="308"
            width="72"
            height="28"
            rx="14"
            fill="#1E2024"
            stroke="#334155"
            strokeWidth="1"
          />
          <text
            x="528"
            y="325.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            .CSV
          </text>
        </g>
    </svg>
  );
}

export function OcrPipelineIllustration() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_14px_35px_rgba(17,18,20,0.05)] sm:p-4">
      <svg
        viewBox="0 0 520 230"
        className="h-auto w-full select-none"
        role="img"
        aria-label="Multi-format pipeline showing scanned PDF OCR, locked PDF unlock, and CSV/XLSX normalization feeding into category buckets"
      >
        {/* Left column: Input formats */}
        <g>
          <rect x="10" y="18" width="144" height="52" rx="14" fill="#F7F8F9" stroke="#E2E8F0" />
          <rect x="22" y="30" width="28" height="28" rx="8" fill="#111214" />
          <path d="M29 44 L43 44" stroke="#BDF71D" strokeWidth="2.5" strokeLinecap="round" />
          <text x="58" y="42" fill="#111214" fontSize="10.5" fontWeight="700">
            Scanned PDF
          </text>
          <text x="58" y="56" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
            Multi-pass OCR
          </text>

          <rect x="10" y="88" width="144" height="52" rx="14" fill="#F7F8F9" stroke="#E2E8F0" />
          <rect x="22" y="100" width="28" height="28" rx="8" fill="#111214" />
          <rect x="30" y="112" width="12" height="9" rx="2" fill="none" stroke="#BDF71D" strokeWidth="1.8" />
          <path d="M33 112 V109 A3 3 0 0 1 39 109 V112" fill="none" stroke="#BDF71D" strokeWidth="1.8" />
          <text x="58" y="112" fill="#111214" fontSize="10.5" fontWeight="700">
            Locked PDF
          </text>
          <text x="58" y="126" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
            In-memory unlock
          </text>

          <rect x="10" y="158" width="144" height="52" rx="14" fill="#F7F8F9" stroke="#E2E8F0" />
          <rect x="22" y="170" width="28" height="28" rx="8" fill="#BDF71D" />
          <path d="M29 179 H43 M29 184 H43 M29 189 H38" stroke="#111214" strokeWidth="2" strokeLinecap="round" />
          <text x="58" y="182" fill="#111214" fontSize="10.5" fontWeight="700">
            CSV / XLSX
          </text>
          <text x="58" y="196" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
            UTF-16 &amp; HTML
          </text>
        </g>

        {/* Flow arrows into center */}
        <g stroke="#CBD5E1" strokeWidth="2" fill="none">
          <path d="M154 44 C180 44, 180 114, 206 114" />
          <path d="M154 114 L206 114" stroke="#111214" />
          <path d="M154 184 C180 184, 180 114, 206 114" />
        </g>

        {/* Center normalization engine */}
        <g>
          <rect x="206" y="42" width="118" height="146" rx="20" fill="#111214" />
          <rect x="220" y="58" width="90" height="20" rx="10" fill="#BDF71D" />
          <text
            x="265"
            y="71.5"
            textAnchor="middle"
            fill="#111214"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-monospace, monospace"
          >
            BYTE PARSER
          </text>
          <text x="222" y="102" fill="#E2E8F0" fontSize="9.5" fontWeight="600">
            • 6 Header Langs
          </text>
          <text x="222" y="122" fill="#E2E8F0" fontSize="9.5" fontWeight="600">
            • ISO 4217 Norm.
          </text>
          <text x="222" y="142" fill="#E2E8F0" fontSize="9.5" fontWeight="600">
            • ±0–31d Match
          </text>
          <text x="222" y="162" fill="#BDF71D" fontSize="9.5" fontWeight="600">
            • Math Verify
          </text>
        </g>

        {/* Flow arrows out */}
        <g stroke="#BDF71D" strokeWidth="2.5" fill="none">
          <path d="M324 114 C350 114, 344 46, 370 46" />
          <path d="M324 114 C350 114, 344 114, 370 114" />
          <path d="M324 114 C350 114, 344 182, 370 182" />
        </g>

        {/* Right column: Structured output buckets */}
        <g>
          <rect x="370" y="22" width="140" height="48" rx="14" fill="#ECFDF5" stroke="#A7F3D0" />
          <text x="384" y="43" fill="#065F46" fontSize="10.5" fontWeight="700">
            Matched Pairs
          </text>
          <text x="384" y="58" fill="#047857" fontSize="9" fontFamily="ui-monospace, monospace">
            Confidence + Reason
          </text>

          <rect x="370" y="90" width="140" height="48" rx="14" fill="#FFFBEB" stroke="#FDE68A" />
          <text x="384" y="111" fill="#92400E" fontSize="10.5" fontWeight="700">
            Gaps &amp; Dupes
          </text>
          <text x="384" y="126" fill="#B45309" fontSize="9" fontFamily="ui-monospace, monospace">
            Bank vs Book Split
          </text>

          <rect x="370" y="158" width="140" height="48" rx="14" fill="#F7F8F9" stroke="#CBD5E1" />
          <text x="384" y="179" fill="#111214" fontSize="10.5" fontWeight="700">
            XLSX &amp; CSV Proof
          </text>
          <text x="384" y="194" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
            Running Bal. Check
          </text>
        </g>
      </svg>
    </div>
  );
}

export function ExceptionIsolationIllustration() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_14px_38px_rgba(17,18,20,0.06)] sm:p-5">
      <svg
        viewBox="0 0 540 280"
        className="h-auto w-full select-none"
        role="img"
        aria-label="Side-by-side schematic highlighting four reconciliation exceptions: timing offset, unrecorded fee, duplicate group, and amount or sign mismatch"
      >
        {/* Headers */}
        <rect x="12" y="10" width="220" height="32" rx="10" fill="#111214" />
        <text x="26" y="30" fill="#FFFFFF" fontSize="11" fontWeight="700">
          Bank Statement
        </text>
        <text
          x="218"
          y="30"
          textAnchor="end"
          fill="#BDF71D"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          EXTERNAL
        </text>

        <rect x="308" y="10" width="220" height="32" rx="10" fill="#F7F8F9" stroke="#E2E8F0" />
        <text x="322" y="30" fill="#111214" fontSize="11" fontWeight="700">
          Business Ledger
        </text>
        <text
          x="514"
          y="30"
          textAnchor="end"
          fill="#5A5E67"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          INTERNAL
        </text>

        {/* Row 1: Timing offset ±2d */}
        <rect x="12" y="54" width="220" height="44" rx="11" fill="#F7F8F9" stroke="#E2E8F0" />
        <text x="24" y="73" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
          Nov 04
        </text>
        <text x="24" y="88" fill="#111214" fontSize="10.5" fontWeight="600">
          ACH Deposit #1042
        </text>
        <text x="220" y="82" textAnchor="end" fill="#047857" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          +$4,200
        </text>

        <line x1="232" y1="76" x2="308" y2="76" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
        <rect x="246" y="65" width="48" height="22" rx="11" fill="#ECFDF5" stroke="#A7F3D0" />
        <text x="270" y="79.5" textAnchor="middle" fill="#065F46" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          ±2d
        </text>

        <rect x="308" y="54" width="220" height="44" rx="11" fill="#F7F8F9" stroke="#E2E8F0" />
        <text x="320" y="73" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
          Nov 02
        </text>
        <text x="320" y="88" fill="#111214" fontSize="10.5" fontWeight="600">
          Customer Receipt
        </text>
        <text x="516" y="82" textAnchor="end" fill="#047857" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          +$4,200
        </text>

        {/* Row 2: Bank-Only Fee */}
        <rect x="12" y="108" width="220" height="44" rx="11" fill="#FFFBEB" stroke="#FDE68A" />
        <text x="24" y="127" fill="#B45309" fontSize="9" fontFamily="ui-monospace, monospace">
          UNMATCHED BANK
        </text>
        <text x="24" y="142" fill="#78350F" fontSize="10.5" fontWeight="700">
          Outbound Wire Fee
        </text>
        <text x="220" y="136" textAnchor="end" fill="#B45309" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          -$35.00
        </text>

        <rect x="242" y="119" width="56" height="22" rx="11" fill="#FEF3C7" />
        <text x="270" y="133.5" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="700">
          Gap
        </text>

        <rect
          x="308"
          y="108"
          width="220"
          height="44"
          rx="11"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeDasharray="4 4"
        />
        <text x="418" y="134" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="500">
          Missing in Ledger — Post Entry
        </text>

        {/* Row 3: Duplicate Entry */}
        <rect x="12" y="162" width="220" height="44" rx="11" fill="#F7F8F9" stroke="#E2E8F0" />
        <text x="24" y="181" fill="#5A5E67" fontSize="9" fontFamily="ui-monospace, monospace">
          Nov 08
        </text>
        <text x="24" y="196" fill="#111214" fontSize="10.5" fontWeight="600">
          Payroll Batch #44
        </text>
        <text x="220" y="190" textAnchor="end" fill="#111214" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          -$2,400
        </text>

        <rect x="246" y="173" width="48" height="22" rx="11" fill="#FEF3C7" stroke="#FCD34D" />
        <text x="270" y="187.5" textAnchor="middle" fill="#92400E" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          2x
        </text>

        <rect x="308" y="162" width="220" height="44" rx="11" fill="#FFFBEB" stroke="#F59E0B" />
        <text x="320" y="181" fill="#B45309" fontSize="9" fontFamily="ui-monospace, monospace">
          POSSIBLE DUPLICATE
        </text>
        <text x="320" y="196" fill="#78350F" fontSize="10.5" fontWeight="700">
          Payroll #44 (Posted x2)
        </text>
        <text x="516" y="190" textAnchor="end" fill="#B45309" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          -$2,400
        </text>

        {/* Row 4: Amount / Sign Mismatch */}
        <rect x="12" y="216" width="220" height="44" rx="11" fill="#FEF2F2" stroke="#FECACA" />
        <text x="24" y="235" fill="#B91C1C" fontSize="9" fontFamily="ui-monospace, monospace">
          BANK DEBIT
        </text>
        <text x="24" y="250" fill="#7F1D1D" fontSize="10.5" fontWeight="600">
          Vendor Inv #1048
        </text>
        <text x="220" y="244" textAnchor="end" fill="#B91C1C" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          -$850.00
        </text>

        <line x1="232" y1="238" x2="308" y2="238" stroke="#EF4444" strokeWidth="2" />
        <rect x="244" y="227" width="52" height="22" rx="11" fill="#FEE2E2" stroke="#FCA5A5" />
        <text x="270" y="241.5" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace">
          ⇄ $10
        </text>

        <rect x="308" y="216" width="220" height="44" rx="11" fill="#FEF2F2" stroke="#FECACA" />
        <text x="320" y="235" fill="#B91C1C" fontSize="9" fontFamily="ui-monospace, monospace">
          TYPO DELTA
        </text>
        <text x="320" y="250" fill="#7F1D1D" fontSize="10.5" fontWeight="600">
          Vendor Inv #1048
        </text>
        <text x="516" y="244" textAnchor="end" fill="#B91C1C" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">
          -$840.00
        </text>
      </svg>
    </div>
  );
}
