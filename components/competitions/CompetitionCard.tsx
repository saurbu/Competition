"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
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
  });
}

const categoryImages: Record<string, string> = {
  CODING:
    "linear-gradient(135deg, #dcecff 0%, #b9d5ff 100%)",
  DESIGN:
    "linear-gradient(135deg, #f2e5ff 0%, #d9c4ff 100%)",
  BUSINESS:
    "linear-gradient(135deg, #fff0dc 0%, #ffd8ad 100%)",
  INNOVATION:
    "linear-gradient(135deg, #dffaf4 0%, #b8eee2 100%)",
  ACADEMIC:
    "linear-gradient(135deg, #e9edff 0%, #cbd5ff 100%)",
};

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

    const updated = stored.includes(competition.id)
      ? stored.filter((id) => id !== competition.id)
      : [...stored, competition.id];

    setSaved(updated.includes(competition.id));

    localStorage.setItem(
      "savedCompetitions",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("savedCompetitionsUpdated"));
  }

  const daysLeft = getDaysLeft(
    competition.registrationDeadline
  );

  const category =
    competition.category?.toUpperCase() || "COMPETITION";

  const imageBackground =
    categoryImages[category] ||
    "linear-gradient(135deg, #e8f0ff 0%, #d4def7 100%)";

  return (
    <article className="group overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_4px_18px_rgba(37,70,130,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(37,70,130,0.12)]">
      <div
        className="relative h-[145px] overflow-hidden"
        style={{ background: imageBackground }}
      >
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />

        <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/35 blur-2xl" />

        <div className="relative flex h-full items-center justify-center">
          <div className="flex h-16 w-16 rotate-[-5deg] items-center justify-center rounded-[18px] border border-white/70 bg-white/50 text-[#10295c] shadow-sm backdrop-blur-sm transition duration-300 group-hover:rotate-0 group-hover:scale-105">
            <Trophy size={30} strokeWidth={1.5} />
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSave}
          aria-label={
            saved
              ? "Remove from saved competitions"
              : "Save competition"
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition ${
            saved
              ? "border-blue-200 bg-white text-blue-600"
              : "border-white/70 bg-white/75 text-slate-500 hover:text-blue-600"
          }`}
        >
          <Bookmark
            size={16}
            fill={saved ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {competition.category}
          </span>

          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-500">
            {competition.mode}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-[17px] font-bold leading-[1.25] text-[#10295c]">
          {competition.title}
        </h3>

        <p className="mt-1 truncate text-xs font-medium text-slate-400">
          {competition.organizer}
        </p>

        <p className="mt-3 line-clamp-2 min-h-[36px] text-xs leading-[18px] text-slate-500">
          {competition.shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Prize Pool
            </p>

            <p className="mt-0.5 text-sm font-bold text-[#10295c]">
              {formatPrize(competition.prizePool)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Deadline
            </p>

            <div className="mt-0.5 flex items-center justify-end gap-1 text-sm font-semibold text-[#10295c]">
              <CalendarDays size={13} />
              {formatDate(competition.registrationDeadline)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            {daysLeft} days left
          </span>

          <Link
            href={`/competitions/${competition.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#10295c] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-blue-700"
          >
            View
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}