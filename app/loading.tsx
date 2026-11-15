export default function RootLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col bg-white px-4 py-8 sm:px-6 lg:px-8"
    >
      <span className="sr-only">Loading page content...</span>
      <div className="mx-auto w-full max-w-[79.2rem] space-y-6">
        <div className="h-14 animate-pulse rounded-full bg-[#111214]/90" />
        <div className="rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-6 sm:p-10">
          <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-4 h-10 w-3/4 max-w-xl animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-3 h-4 w-2/3 max-w-lg animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="h-44 animate-pulse rounded-2xl bg-slate-200/70" />
            <div className="h-44 animate-pulse rounded-2xl bg-slate-200/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
