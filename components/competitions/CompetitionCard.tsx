"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";
import type { Competition } from "@/types/competition";

interface CompetitionCardProps {
  competition: Competition;
}

function getDaysLeft(deadline: string) {
  const diff =
    new Date(deadline).getTime() - new Date().getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatPrize(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CompetitionCard({
  competition,
}: CompetitionCardProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("savedCompetitions") || "[]"
    );

    setSaved(stored.includes(competition.id));
  }, [competition.id]);

  function toggleSave() {
    const stored: string[] = JSON.parse(
      localStorage.getItem("savedCompetitions") || "[]"
    );

    let updated: string[];

    if (stored.includes(competition.id)) {
      updated = stored.filter((id) => id !== competition.id);
      setSaved(false);
    } else {
      updated = [...stored, competition.id];
      setSaved(true);
    }

    localStorage.setItem(
      "savedCompetitions",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("savedCompetitionsUpdated"));
  }

  const daysLeft = getDaysLeft(
    competition.registrationDeadline
  );

  return (
    <article className="group relative flex h-[390px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[400px] sm:p-6">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative flex shrink-0 items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Trophy size={21} />
        </div>

        <button
          type="button"
          onClick={toggleSave}
          aria-label={
            saved
              ? "Remove from saved competitions"
              : "Save competition"
          }
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
            saved
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-600"
          }`}
        >
          <Bookmark
            size={17}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="relative mt-4 min-h-0 flex-1">
        <div className="mb-2 flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
            {competition.category}
          </span>

          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {competition.mode}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[#10295c]">
          {competition.title}
        </h3>

        <p className="mt-1.5 truncate text-xs font-medium text-slate-500">
          {competition.organizer}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-600">
          {competition.shortDescription}
        </p>
      </div>

      <div className="relative grid shrink-0 grid-cols-2 gap-2.5">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[11px] font-medium text-slate-500">
            Prize Pool
          </p>

          <p className="mt-1 truncate text-sm font-bold text-[#10295c]">
            {formatPrize(competition.prizePool)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[11px] font-medium text-slate-500">
            Deadline
          </p>

          <p className="mt-1 text-sm font-bold text-[#10295c]">
            {daysLeft} days
          </p>
        </div>
      </div>

      <div className="relative mt-3 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-slate-500">
          <CalendarDays size={13} />
          <span className="truncate">
            {formatDate(competition.registrationDeadline)}
          </span>
        </div>

        <div className="ml-2 flex shrink-0 items-center gap-1 text-[11px] font-medium text-slate-500">
          <MapPin size={13} />
          {competition.mode === "ONLINE"
            ? "Online"
            : competition.mode}
        </div>
      </div>

      <Link
        href={`/competitions/${competition.slug}`}
        className="relative mt-3 flex h-11 shrink-0 w-full items-center justify-center gap-2 rounded-xl bg-[#10295c] px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View Competition
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}