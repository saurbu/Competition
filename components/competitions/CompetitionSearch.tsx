"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

interface CompetitionFilters {
  mode: string;
  prize: string;
}

interface CompetitionSearchProps {
  search: string;
  setSearch: (value: string) => void;
  filters: CompetitionFilters;
  setFilters: Dispatch<SetStateAction<CompetitionFilters>>;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function CompetitionSearch({
  search,
  setSearch,
  filters,
  setFilters,
  sortBy,
  setSortBy,
}: CompetitionSearchProps) {
  return (
    <section
      id="competitions"
      className="bg-white px-4 py-5 sm:px-5 lg:px-8"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#f9fbff] p-3 sm:p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competitions..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#10295c] outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
            <div className="relative">
              <SlidersHorizontal
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
              />

              <select
                value={filters.mode}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    mode: e.target.value,
                  }))
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs font-medium text-[#10295c] outline-none transition focus:border-blue-300 sm:text-sm lg:w-[140px]"
              >
                <option value="All">All Modes</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={filters.prize}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    prize: e.target.value,
                  }))
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-[#10295c] outline-none transition focus:border-blue-300 sm:text-sm lg:w-[140px]"
              >
                <option value="All">All Prizes</option>
                <option value="Any Prize">Any Prize</option>
                <option value="₹10K+">₹10K+</option>
                <option value="₹50K+">₹50K+</option>
                <option value="₹1L+">₹1L+</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative col-span-2 sm:col-span-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-[#10295c] outline-none transition focus:border-blue-300 sm:text-sm lg:w-[155px]"
              >
                <option value="Recommended">Recommended</option>
                <option value="Prize: High to Low">
                  Prize: High to Low
                </option>
                <option value="Deadline: Soonest">
                  Deadline: Soonest
                </option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}