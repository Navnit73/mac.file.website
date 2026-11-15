import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, FileText, Info, UserCheck } from "lucide-react";
import type { AuthorProfile, ReviewerProfile } from "@/lib/site-config";

export function AuthorProfileCard({ author }: { author: AuthorProfile }) {
  return (
    <article
      id={author.id}
      className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {author.photoUrl ? (
          <Image
            src={author.photoUrl}
            alt={author.fullName}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-2xl border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#111214] text-[#BDF71D]">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F4F6F8] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#5A5E67]">
              Author Profile
            </span>
            {!author.isNamedIndividual && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-[#5A5E67]">
                <Info className="h-3 w-3" />
                Editorial Team
              </span>
            )}
          </div>

          <h3 className="mt-2 text-lg font-semibold text-[#111214]">
            {author.fullName}
          </h3>
          <p className="text-xs font-medium text-[#5A5E67] sm:text-sm">
            {author.title}
          </p>

          <p className="mt-3 text-xs leading-relaxed text-[#5A5E67] sm:text-sm">
            {author.biography}
          </p>

          <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-3 text-xs text-[#5A5E67]">
            <span className="font-semibold text-[#111214]">Experience: </span>
            {author.experience}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {author.areasOfExpertise.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#111214]"
              >
                {area}
              </span>
            ))}
          </div>

          {author.placeholderNotice && (
            <p className="mt-3 text-[11px] text-amber-900">
              {author.placeholderNotice}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ReviewerProfileCard({
  reviewer,
}: {
  reviewer: ReviewerProfile;
}) {
  return (
    <article
      id={reviewer.id}
      className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xs"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-[#F4F6F8] text-[#111214]">
          <Award className="h-6 w-6" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-900">
              Reviewer Profile
            </span>
            {!reviewer.isNamedIndividual && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-[#5A5E67]">
                <Info className="h-3 w-3" />
                Verification Scope
              </span>
            )}
          </div>

          <h3 className="mt-2 text-lg font-semibold text-[#111214]">
            {reviewer.fullName}
          </h3>
          <p className="text-xs font-medium text-[#5A5E67] sm:text-sm">
            {reviewer.credentials}
          </p>

          <div className="mt-3 rounded-xl border border-slate-200/80 bg-[#F8FAFC] p-3 text-xs leading-relaxed text-[#5A5E67]">
            <span className="font-semibold text-[#111214]">Review Scope: </span>
            {reviewer.experience}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {reviewer.areasOfExpertise.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#111214]"
              >
                {area}
              </span>
            ))}
          </div>

          {reviewer.placeholderNotice && (
            <p className="mt-3 text-[11px] text-amber-900">
              {reviewer.placeholderNotice}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function EditorialAttributionBar({
  author,
  reviewer,
  updatedLabel,
}: {
  author: AuthorProfile;
  reviewer?: ReviewerProfile;
  updatedLabel: string;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-xs text-[#5A5E67]">
      <div className="flex items-center gap-1.5">
        <UserCheck className="h-3.5 w-3.5 text-[#111214]" aria-hidden="true" />
        <span>Author:</span>
        <Link
          href={author.profilePath}
          className="font-semibold text-[#111214] underline decoration-slate-300 underline-offset-2 hover:decoration-[#111214]"
        >
          {author.fullName}
        </Link>
      </div>

      {reviewer && (
        <div className="flex items-center gap-1.5">
          <CheckCircle2
            className="h-3.5 w-3.5 text-emerald-700"
            aria-hidden="true"
          />
          <span>Review:</span>
          <Link
            href="/editorial-policy"
            className="font-medium text-[#111214] underline decoration-slate-300 underline-offset-2 hover:decoration-[#111214]"
          >
            {reviewer.isNamedIndividual
              ? reviewer.fullName
              : "Technical Verification (Accounting Review Slot Open)"}
          </Link>
        </div>
      )}

      <div className="font-mono text-[11px] text-[#5A5E67]">
        Last reviewed: {updatedLabel}
      </div>
    </div>
  );
}
