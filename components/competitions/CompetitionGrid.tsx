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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[360px] animate-pulse rounded-3xl bg-white"
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
      className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8"
    >
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#10295c]">
            Popular Competitions
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          {competitions.length} competitions
        </p>
      </div>

      {competitions.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <h3 className="text-xl font-semibold text-[#10295c]">
            No competitions found
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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