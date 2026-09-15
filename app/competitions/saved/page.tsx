"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Bookmark, Trophy } from "lucide-react";
import type { Competition } from "@/types/competition";

export default function SavedCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedCompetitions();

    window.addEventListener(
      "savedCompetitionsUpdated",
      loadSavedCompetitions
    );

    return () => {
      window.removeEventListener(
        "savedCompetitionsUpdated",
        loadSavedCompetitions
      );
    };
  }, []);

  async function loadSavedCompetitions() {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem("savedCompetitions") || "[]"
      );

      setSavedIds(stored);

      const response = await fetch("/api/competitions");
      const data = await response.json();

      if (data.success) {
        const saved = (data.competitions || []).filter(
          (competition: Competition) =>
            stored.includes(competition.id)
        );

        setCompetitions(saved);
      }
    } catch {
      setCompetitions([]);
    } finally {
      setLoading(false);
    }
  }

  function removeSaved(id: string) {
    const updated = savedIds.filter(
      (savedId) => savedId !== id
    );

    localStorage.setItem(
      "savedCompetitions",
      JSON.stringify(updated)
    );

    setSavedIds(updated);
    setCompetitions((current) =>
      current.filter((competition) => competition.id !== id)
    );

    window.dispatchEvent(new Event("savedCompetitionsUpdated"));
  }

  return (
    <main className="min-h-screen bg-[#f7faff]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 pb-12 pt-28 lg:px-8 lg:pt-32">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            ← Back to Competitions
          </Link>

          <div className="mt-7">
            <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
              Saved
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#10295c] sm:text-5xl">
              Saved Competitions
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Keep track of competitions you want to explore or
              register for later.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8 lg:py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Your collection
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#10295c]">
              Saved for Later
            </h2>
          </div>

          {!loading && (
            <span className="text-sm text-slate-500">
              {competitions.length} saved
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[350px] animate-pulse rounded-3xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : competitions.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Bookmark size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#10295c]">
              No saved competitions
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Save a competition from the home page and it will
              appear here.
            </p>

            <Link
              href="/#competitions"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#10295c] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Competitions
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((competition) => (
              <article
                key={competition.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Trophy size={22} />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeSaved(competition.id)
                    }
                    aria-label="Remove saved competition"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Bookmark
                      size={18}
                      fill="currentColor"
                    />
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {competition.category}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {competition.mode}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-tight text-[#10295c]">
                    {competition.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {competition.organizer}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Prize Pool
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10295c]">
                      ₹
                      {competition.prizePool.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">
                      Deadline
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10295c]">
                      {new Date(
                        competition.registrationDeadline
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/competitions/${competition.slug}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10295c] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Competition
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}