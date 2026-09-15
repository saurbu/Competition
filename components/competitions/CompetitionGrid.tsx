"use client";

import CompetitionCard from "./CompetitionCard";
import type { Competition } from "@/types/competition";

interface CompetitionGridProps {
  competitions: Competition[];
  loading: boolean;
  error: string;
}

export default function CompetitionGrid({
  competitions,
  loading,
  error,
}: CompetitionGridProps) {
  if (loading) {
    return (
      <section className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8">
        <div className="mb-7">
          <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-3 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[410px] animate-pulse rounded-[20px] bg-white"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section
      id="competition-list"
      className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8 lg:py-12"
    >
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Explore
          </p>

          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#10295c] sm:text-3xl">
            Popular Competitions
          </h2>
        </div>

        <p className="text-xs font-medium text-slate-400 sm:text-sm">
          {competitions.length} competitions
        </p>
      </div>

      {competitions.length === 0 ? (
        <div className="rounded-[20px] border border-slate-200 bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-[#10295c]">
            No competitions found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
            />
          ))}
        </div>
      )}
    </section>
  );
}