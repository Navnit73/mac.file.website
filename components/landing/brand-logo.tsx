export function BrandLogoMark({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 9h14" />
      <path d="M5 15h8.5" />
      <path d="m16.5 13 2 2 3-3" />
    </svg>
  );
}
