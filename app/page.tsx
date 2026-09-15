"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CompetitionHero from "@/components/competitions/CompetitionHero";
import CategoryNav from "@/components/competitions/CategoryNav";
import CompetitionSearch from "@/components/competitions/CompetitionSearch";
import CompetitionGrid from "@/components/competitions/CompetitionGrid";
import CompetitionCTA from "@/components/competitions/CompetitionCTA";
import type { Competition } from "@/types/competition";

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const [filters, setFilters] = useState({
    mode: "All",
    prize: "All",
  });

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const resultsRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef(1);

  useEffect(() => {
    async function fetchCompetitions() {
      try {
        const response = await fetch("/api/competitions");

        if (!response.ok) {
          throw new Error("Failed to fetch competitions");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch competitions"
          );
        }

        setCompetitions(data.competitions || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch competitions"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCompetitions();

    const stored = JSON.parse(
      localStorage.getItem("savedCompetitions") || "[]"
    );

    setSavedIds(stored);

    function updateSaved() {
      const updated = JSON.parse(
        localStorage.getItem("savedCompetitions") || "[]"
      );

      setSavedIds(updated);
    }

    window.addEventListener(
      "savedCompetitionsUpdated",
      updateSaved
    );

    return () => {
      window.removeEventListener(
        "savedCompetitionsUpdated",
        updateSaved
      );
    };
  }, []);

  const filteredCompetitions = useMemo(() => {
    let result = [...competitions];

    if (category === "Saved") {
      result = result.filter((competition) =>
        savedIds.includes(competition.id)
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (competition) =>
          competition.title.toLowerCase().includes(query) ||
          competition.organizer.toLowerCase().includes(query) ||
          competition.shortDescription
            .toLowerCase()
            .includes(query)
      );
    }

    if (category !== "All" && category !== "Saved") {
      result = result.filter(
        (competition) =>
          competition.category === category.toUpperCase()
      );
    }

    if (filters.mode !== "All") {
      result = result.filter(
        (competition) =>
          competition.mode === filters.mode.toUpperCase()
      );
    }

    if (filters.prize !== "All") {
      result = result.filter((competition) => {
        if (filters.prize === "Any Prize") {
          return competition.prizePool > 0;
        }

        if (filters.prize === "₹10K+") {
          return competition.prizePool >= 10000;
        }

        if (filters.prize === "₹50K+") {
          return competition.prizePool >= 50000;
        }

        if (filters.prize === "₹1L+") {
          return competition.prizePool >= 100000;
        }

        return true;
      });
    }

    if (sortBy === "Prize: High to Low") {
      result.sort((a, b) => b.prizePool - a.prizePool);
    }

    if (sortBy === "Deadline: Soonest") {
      result.sort(
        (a, b) =>
          new Date(a.registrationDeadline).getTime() -
          new Date(b.registrationDeadline).getTime()
      );
    }

    return result;
  }, [
    competitions,
    search,
    category,
    filters,
    sortBy,
    savedIds,
  ]);

  useEffect(() => {
    setPage(1);
  }, [search, category, filters, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompetitions.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedCompetitions = filteredCompetitions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (previousPageRef.current === page) {
      return;
    }

    const results = resultsRef.current;

    if (!results) {
      return;
    }

    const navbarOffset = 90;
    const top =
      results.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    previousPageRef.current = page;
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f7faff]">
      <main>
        <CompetitionHero />

        <CategoryNav
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <CompetitionSearch
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div ref={resultsRef}>
          <CompetitionGrid
            competitions={paginatedCompetitions}
            loading={loading}
            error={error}
          />
        </div>

        {!loading &&
          !error &&
          filteredCompetitions.length > 0 && (
            <div className="mx-auto flex max-w-[1380px] items-center justify-center gap-2 px-5 pb-12 lg:px-8">
              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#10295c] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                    page === pageNumber
                      ? "bg-[#10295c] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages, current + 1)
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#10295c] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}

        <CompetitionCTA />
      </main>
    </div>
  );
}