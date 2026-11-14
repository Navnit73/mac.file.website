export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  bestFor: string;
  includes: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SimulationFolder = {
  id: "desktop" | "downloads" | "projects";
  label: string;
  path: string;
  ruleSummary: string;
  files: {
    name: string;
    kind: "pdf" | "image" | "archive" | "sheet" | "dmg";
    size: string;
    destination: string;
    ruleMatched: string;
  }[];
};

export type QuickGuide = {
  id: "desktop" | "downloads";
  title: string;
  subtitle: string;
  steps: { title: string; detail: string }[];
};

export type ImplementedCapability = {
  id: "monitoring" | "safety" | "classifier" | "security";
  tabLabel: string;
  badge: string;
  title: string;
  summary: string;
  highlights: {
    label: string;
    detail: string;
  }[];
  codeChips?: string[];
};

export const BRAND = {
  name: "FolderFlow",
  tagline: "File Organizer for Mac",
  trialDays: 14,
  minMacOS: "macOS 13+ (Apple Silicon & Intel)",
  stackSummary: "Tauri 2 • Rust • SQLite (SQLx) • React + TypeScript",
  version: "v0.2",
};

export const BUILTIN_CATEGORIES = [
  "Documents",
  "Images",
  "Videos",
  "Audio",
  "Archives",
  "Spreadsheets",
  "Presentations",
  "Applications & Installers",
  "Design",
  "Development",
  "Fonts",
  "E-books",
  "Other",
] as const;

export const IMPLEMENTED_CAPABILITIES: ImplementedCapability[] = [
  {
    id: "monitoring",
    tabLabel: "Monitoring & Stability",
    badge: "Native macOS Engine",
    title: "Folder Registry, Live FSEvents & File Stability",
    summary:
      "FolderFlow watches standard macOS folders or custom directories via supervised per-folder FSEvents tasks, backed by SQLite reconciliation and file-stability verification.",
    highlights: [
      {
        label: "Folder Registry & Quick-Add",
        detail:
          "Quick-add Downloads, Desktop, Documents, Pictures, Movies, and Music or pick any custom folder via native dialog. Configure custom names, recursive watching, include/exclude extensions, excluded subfolders, and stability overrides.",
      },
      {
        label: "Global & Per-Folder Controls",
        detail:
          "Pause or resume monitoring globally, or pause, resume, rescan, restart, and remove individual folders without touching files on disk.",
      },
      {
        label: "Supervised FSEvents + Reconciliation",
        detail:
          "Debounced watcher tasks with bounded channels, overflow fallback to reconciliation, exponential error backoff, and periodic SQLite scans to catch missed events.",
      },
      {
        label: "Multi-Check File Stability",
        detail:
          "Waits until file size, mtime, device, and inode remain unchanged across consecutive checks before marking any new download or export ready.",
      },
    ],
  },
  {
    id: "safety",
    tabLabel: "Safety & macOS TCC",
    badge: "Strict Path Safety",
    title: "Ignore Filtering, Path Authority & TCC Permissions",
    summary:
      "Every path is validated, NFC-normalized, and checked against approved roots while active downloads, system metadata, and symlinks are automatically skipped.",
    highlights: [
      {
        label: "Smart Ignore & Safety Filtering",
        detail:
          "Automatically ignores macOS metadata (.DS_Store, ._*, .localized), partial browser downloads, editor swap/temp files, VCS/cache folders, symlinks (no following), and FolderFlow staging files.",
      },
      {
        label: "Strict Path Authority",
        detail:
          "Validates, normalizes (Unicode NFC), canonicalizes, and verifies approved folder roots on every backend command.",
      },
      {
        label: "macOS TCC Permission Handling",
        detail:
          "Probes access states (Granted, Denied, Missing, NotAFolder), reports folder health (Healthy, Paused, Unavailable, PermissionDenied, Error), surfaces recent errors, and deep-links straight to macOS System Settings.",
      },
    ],
    codeChips: [
      ".DS_Store",
      ".download / .crdownload / .part",
      ".tmp / .swp / ~$*",
      ".git / node_modules / .Trash",
      ".folderflow-*",
    ],
  },
  {
    id: "classifier",
    tabLabel: "Hybrid Classifier",
    badge: "8,192B Header Inspection",
    title: "Magic-Byte Inspection & 13 Built-in Categories",
    summary:
      "Combines extension matching with safe 8,192-byte magic-header inspection—without ever executing files—and breaks down folder counts and byte totals by category.",
    highlights: [
      {
        label: "Extension + Magic-Byte Inspection",
        detail:
          "Inspects up to 8,192 header bytes via infer to verify actual file types alongside extensions without executing untrusted files.",
      },
      {
        label: "Atomic .app Bundles & Spoof Detection",
        detail:
          "Treats macOS .app bundles as single atomic items and flags extension/signature mismatches (such as an executable disguised as .pdf) as Other with Low confidence.",
      },
      {
        label: "Category Analytics & Custom Model",
        detail:
          "Folder detail views show live file counts and byte totals across all 13 built-in categories, backed by a custom category priority data model in Rust and SQLite.",
      },
    ],
  },
  {
    id: "security",
    tabLabel: "Settings & Security",
    badge: "Offline SQLite Core",
    title: "Offline SQLite Storage, Redacted Logs & Hardened Rust",
    summary:
      "Built offline-first with type-safe Rust-to-TypeScript bindings, 6 persistent settings sections in SQLite, and compile-time bans on unsafe raw filesystem mutations.",
    highlights: [
      {
        label: "6 Typed SQLite Settings Sections",
        detail:
          "Persists and validates preferences across general, monitoring, organization, performance, appearance (Light/Dark/System + Comfortable/Compact density), and privacy.",
      },
      {
        label: "Redacted Rolling Logs",
        detail:
          "Rolling diagnostic log files with configurable path redaction and 1–90 day retention, plus an About view showing app version, SQLite schema version, and data/log paths.",
      },
      {
        label: "Hardened Rust Architecture",
        detail:
          "Type-safe Rust ↔ TypeScript bindings generated via tauri-specta, plus Clippy disallowed_methods banning raw mutating filesystem or shell calls outside safe_fs.",
      },
    ],
  },
];

export const SIMULATION_FOLDERS: SimulationFolder[] = [
  {
    id: "desktop",
    label: "Desktop",
    path: "~/Desktop",
    ruleSummary:
      "Screenshots -> ~/Pictures/Screenshots/YYYY-MM • PDFs -> ~/Documents/Inbox",
    files: [
      {
        name: "Screenshot 2026-11-14 at 9.12 AM.png",
        kind: "image",
        size: "2.4 MB",
        destination: "~/Pictures/Screenshots/2026-11/",
        ruleMatched: "Screenshots by Date",
      },
      {
        name: "ACME-Q4-Invoice-1042.pdf",
        kind: "pdf",
        size: "418 KB",
        destination: "~/Documents/Invoices/2026/",
        ruleMatched: "PDF Invoices by Year",
      },
      {
        name: "Budget-Forecast-Draft.xlsx",
        kind: "sheet",
        size: "1.1 MB",
        destination: "~/Documents/Spreadsheets/",
        ruleMatched: "Group Loose Files by Type",
      },
      {
        name: "Design-Review-Notes.png",
        kind: "image",
        size: "3.8 MB",
        destination: "~/Desktop/Review Holding/",
        ruleMatched: "Temporary Weekly Holding",
      },
    ],
  },
  {
    id: "downloads",
    label: "Downloads",
    path: "~/Downloads",
    ruleSummary:
      "Installers -> ~/Downloads/Installers • Archives -> ~/Downloads/Archives • PDFs -> ~/Documents/PDFs",
    files: [
      {
        name: "Figma-Desktop-macOS.dmg",
        kind: "dmg",
        size: "142 MB",
        destination: "~/Downloads/Installers/",
        ruleMatched: "Mac Installers (.dmg, .pkg)",
      },
      {
        name: "Q3-Tax-Receipt-Stripe.pdf",
        kind: "pdf",
        size: "290 KB",
        destination: "~/Documents/Receipts/2026/",
        ruleMatched: "Receipts by Date",
      },
      {
        name: "Brand-Assets-Pack.zip",
        kind: "archive",
        size: "68.5 MB",
        destination: "~/Downloads/Archives/",
        ruleMatched: "Compressed Archives",
      },
      {
        name: "Vendor-Pricing-2026.csv",
        kind: "sheet",
        size: "94 KB",
        destination: "~/Documents/Spreadsheets/",
        ruleMatched: "Spreadsheets & Data",
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    path: "~/Projects/ACME-Launch",
    ruleSummary:
      "Drafts -> /Drafts • Final -> /Final Files • Old builds -> /Archives",
    files: [
      {
        name: "ACME-Deck-v2-DRAFT.pdf",
        kind: "pdf",
        size: "6.2 MB",
        destination: "~/Projects/ACME-Launch/Drafts/",
        ruleMatched: "Pattern: *-DRAFT*",
      },
      {
        name: "ACME-Launch-Final-PressKit.zip",
        kind: "archive",
        size: "34.1 MB",
        destination: "~/Projects/ACME-Launch/Final Files/",
        ruleMatched: "Pattern: *Final*",
      },
      {
        name: "ACME-Hero-Render.png",
        kind: "image",
        size: "8.7 MB",
        destination: "~/Projects/ACME-Launch/Final Files/Media/",
        ruleMatched: "Client Prefix + Image",
      },
      {
        name: "ACME-2025-Archive-Sheet.xlsx",
        kind: "sheet",
        size: "740 KB",
        destination: "~/Projects/ACME-Launch/Archives/",
        ruleMatched: "Pattern: *Archive*",
      },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "Free forever",
    bestFor: "Trying FolderFlow on your Mac",
    includes: "2 watched folders, 5 active rules",
    features: [
      "Up to 2 watched folders (e.g., Desktop & Downloads)",
      "Hybrid magic-byte classifier & 13 categories",
      "File stability checks & smart ignore safety filters",
      "Dry-run preview & undo (as rule execution rolls out)",
    ],
    ctaLabel: "Download Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    cadence: "One-time license (offline Ed25519)",
    bestFor: "Daily use across several folders",
    includes: "Unlimited folders, advanced rules, priority updates",
    features: [
      "Unlimited watched folders & subfolder exclusions",
      "Full nested ALL/ANY/NOT rule engine & presets",
      "Transactional safe_fs ledger, undo & duplicate finder",
      "Offline Keychain license—no subscription required",
    ],
    ctaLabel: "Buy Pro — $29",
    featured: true,
  },
  {
    id: "team",
    name: "Team or Family",
    price: "$59",
    cadence: "One-time up to 5 Macs",
    bestFor: "Shared or multi-user setups",
    includes: "5 Mac seats, shared JSON rule configs & priority support",
    features: [
      "Up to 5 Macs for family or creative teams",
      "Versioned JSON rule config import/export",
      "Consistent project folder structures across seats",
      "Priority email support & all Pro features",
    ],
    ctaLabel: "Buy Team — $59",
  },
];

export const GETTING_STARTED_STEPS = [
  {
    step: "01",
    title: "Download and install FolderFlow on your Mac.",
    detail:
      "Open the signed .dmg installer on macOS 13+ and drag FolderFlow into your Applications folder.",
  },
  {
    step: "02",
    title: "Grant the access it needs to your chosen folders when macOS asks.",
    detail:
      "FolderFlow probes TCC permissions and deep-links to macOS System Settings if any folder needs authorization.",
  },
  {
    step: "03",
    title: "Pick your watched folders, such as Desktop and Downloads.",
    detail:
      "Quick-add standard macOS folders or any custom directory, and exclude subfolders or extensions you manage by hand.",
  },
  {
    step: "04",
    title: "Start with one or two rules, preview the changes, and apply them.",
    detail:
      "Inspect file stability, category classification, and exact planned destination paths before moving a single file.",
  },
  {
    step: "05",
    title: "Add more rules as you see what works.",
    detail:
      "Layer type, date, and project naming templates once your core folders stay consistently tidy.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "app-or-software",
    question: "Is this a mac file organizer app or file organizer software for Mac?",
    answer:
      "It is both, in the sense people usually mean. FolderFlow is a native Mac app built with Tauri 2, Rust, and SQLite that works as offline-first file organizer software—monitoring the folders you choose and classifying files locally on your Mac.",
  },
  {
    id: "delete-files",
    question: "Will the file organizer for Mac delete my files?",
    answer:
      "No. FolderFlow's core job is to classify and move files safely according to your rules—never silent deletion. In-progress downloads, .DS_Store metadata, VCS directories, and symlinks are automatically ignored, and upcoming rule execution uses atomic same-volume renames, BLAKE3 verification, dry-run previews, and multi-level undo.",
  },
  {
    id: "icloud-drive",
    question: "Does it work with iCloud Drive and other cloud folders?",
    answer:
      "If your watched folders live inside iCloud Drive or another cloud sync directory, FolderFlow can monitor and organize files there once macOS grants folder access. File stability checks wait until size, mtime, device, and inode settle, and you can pause monitoring globally or per folder during large cloud syncs to avoid sync conflicts.",
  },
  {
    id: "existing-files",
    question: "Can I organize files that are already on my Mac?",
    answer:
      "Yes. FolderFlow runs periodic SQLite reconciliation scans alongside live FSEvents monitoring so existing files are discovered and categorized right away. You can trigger a manual folder rescan anytime and preview planned moves before applying rules to large folders.",
  },
  {
    id: "finder-difference",
    question: "How is this different from using Finder or Smart Folders?",
    answer:
      "Finder and Smart Folders are useful for searching and viewing files. FolderFlow inspects file headers (magic bytes), tracks stability across downloads, and automates organization into structured folders as new files arrive. Smart Folders complement FolderFlow cleanly.",
  },
  {
    id: "supported-macs",
    question: "Which Macs are supported?",
    answer:
      "Both Apple silicon (M1, M2, M3, M4 series) and Intel Macs running macOS 13 Ventura or later are supported.",
  },
  {
    id: "stop-paying",
    question: "What happens to my rules if I stop paying?",
    answer:
      "One-time Pro and Team licenses are verified offline via Ed25519 and stored in your macOS Keychain—they never expire for your licensed version. Your SQLite database, folder configurations, and rules stay local on your Mac and can always be exported without losing data.",
  },
];

export const QUICK_GUIDES: Record<"desktop" | "downloads", QuickGuide> = {
  desktop: {
    id: "desktop",
    title: "Guide to Organizing Your MacBook Desktop",
    subtitle:
      "Keep your Desktop reserved for active work instead of screenshots and stray downloads.",
    steps: [
      {
        title: "1. Clear the backlog into a dated Review folder",
        detail:
          "Move old desktop items into ~/Documents/Desktop Review/YYYY-MM so you start fresh without deleting anything.",
      },
      {
        title: "2. Route screenshots off the Desktop automatically",
        detail:
          "Send any file matching 'Screenshot*' straight to ~/Pictures/Screenshots/YYYY-MM once stability checks confirm the capture is complete.",
      },
      {
        title: "3. Group loose documents and spreadsheets by type",
        detail:
          "Keep PDFs, docs, and sheets organized in dedicated subfolders while leaving your current active project files visible.",
      },
    ],
  },
  downloads: {
    id: "downloads",
    title: "Guide to Organizing Your Downloads Folder on Mac",
    subtitle:
      "Stop scrolling through hundreds of browser downloads every time you need a recent file.",
    steps: [
      {
        title: "1. Wait for active browser downloads to finish",
        detail:
          "FolderFlow automatically ignores .download, .crdownload, and .part files and verifies file stability before touching any new item.",
      },
      {
        title: "2. Separate installers from documents",
        detail:
          "Move .dmg, .pkg, and .app bundles into ~/Downloads/Installers and archives into ~/Downloads/Archives.",
      },
      {
        title: "3. Sort receipts and invoices by year and month",
        detail:
          "Match invoice or receipt PDFs by name and file them into ~/Documents/Invoices/YYYY/ automatically after dry-run preview.",
      },
    ],
  },
};
