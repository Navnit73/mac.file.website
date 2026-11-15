export default function ReconcileLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col bg-white px-4 py-8 sm:px-6 lg:px-8"
    >
      <span className="sr-only">Loading reconciliation workbench...</span>
      <div className="mx-auto w-full max-w-[79.2rem] space-y-6">
        <div className="h-14 animate-pulse rounded-full bg-[#111214]/90" />
        <div className="rounded-[28px] border border-slate-200 bg-[#F7F8F9] p-6 sm:p-8">
          <div className="mx-auto h-8 w-80 max-w-full animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="h-48 animate-pulse rounded-2xl bg-white" />
            <div className="h-48 animate-pulse rounded-2xl bg-white" />
          </div>
          <div className="mt-5 h-20 animate-pulse rounded-2xl bg-[#111214]/85" />
        </div>
      </div>
    </div>
  );
}
