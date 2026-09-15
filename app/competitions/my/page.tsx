"use client";

import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

const competitions = [
  {
    title: "CodeSprint India 2026",
    organizer: "TechNova",
    category: "Coding",
    mode: "Online",
    status: "Registered",
    date: "5 Oct 2026",
  },
  {
    title: "DesignSphere Challenge 2026",
    organizer: "Creative Minds",
    category: "Design",
    mode: "Online",
    status: "Registered",
    date: "12 Oct 2026",
  },
];

export default function MyCompetitionsPage() {
  return (
    <main className="min-h-screen bg-[#f7faff]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 pb-12 pt-8 lg:px-8 lg:pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            ← Back to Competitions
          </Link>

          <div className="mt-7">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              My Activity
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#10295c] sm:text-5xl">
              My Competitions
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Track the competitions you have registered for and manage your
              participation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8 lg:py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Your competitions
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#10295c]">
              Registered Competitions
            </h2>
          </div>

          <span className="text-sm text-slate-500">
            {competitions.length} registered
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {competitions.map((competition) => (
            <article
              key={competition.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Trophy size={22} />
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                  {competition.status}
                </span>
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

                <h3 className="mt-4 text-xl font-bold text-[#10295c]">
                  {competition.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {competition.organizer}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Competition Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10295c]">
                    {competition.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Mode
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#10295c]">
                    {competition.mode}
                  </p>
                </div>
              </div>

              <Link
                href={`/competitions/${competition.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#10295c] transition hover:border-blue-200 hover:bg-blue-50"
              >
                View Competition
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}