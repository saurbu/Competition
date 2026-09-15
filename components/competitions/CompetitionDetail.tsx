import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Trophy,
} from "lucide-react";
import type { Competition } from "@/types/competition";

interface CompetitionDetailProps {
  competition: Competition;
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
    month: "long",
    year: "numeric",
  });
}

export default function CompetitionDetail({
  competition,
}: CompetitionDetailProps) {
  return (
    <main className="min-h-screen bg-[#f7faff]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1380px] px-5 pb-12 pt-8 lg:px-8 lg:pt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Competitions
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                  {competition.category}
                </span>

                <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                  {competition.mode}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#10295c] sm:text-5xl">
                {competition.title}
              </h1>

              <p className="mt-4 text-base text-slate-500">
                Organized by{" "}
                <span className="font-semibold text-[#10295c]">
                  {competition.organizer}
                </span>
              </p>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
                {competition.shortDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Trophy size={23} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Total Prize Pool
                  </p>

                  <p className="text-2xl font-bold text-[#10295c]">
                    {formatPrize(competition.prizePool)}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 text-blue-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Registration Deadline
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#10295c]">
                      {formatDate(
                        competition.registrationDeadline
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 text-purple-600"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Competition Mode
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#10295c]">
                      {competition.mode}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/competitions/register/${competition.slug}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10295c] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                Register Now
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1380px] gap-8 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#10295c]">
              About the Competition
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {competition.about}
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#10295c]">
              Description
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {competition.description}
            </p>
          </section>

          {competition.eligibility.length > 0 && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#10295c]">
                Eligibility
              </h2>

              <div className="mt-5 space-y-3">
                {competition.eligibility.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"
                  >
                    {item.criteria}
                  </div>
                ))}
              </div>
            </section>
          )}

          {competition.rules.length > 0 && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#10295c]">
                Rules
              </h2>

              <div className="mt-5 space-y-3">
                {competition.rules.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl bg-slate-50 p-4"
                  >
                    <span className="font-bold text-blue-600">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-600">
                      {item.rule}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-[#10295c]">
            Important Dates
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs text-slate-500">
                Registration Deadline
              </p>

              <p className="mt-1 text-sm font-semibold text-[#10295c]">
                {formatDate(competition.registrationDeadline)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Competition Starts
              </p>

              <p className="mt-1 text-sm font-semibold text-[#10295c]">
                {formatDate(competition.competitionStart)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Competition Ends
              </p>

              <p className="mt-1 text-sm font-semibold text-[#10295c]">
                {formatDate(competition.competitionEnd)}
              </p>
            </div>
          </div>

          {competition.prizes.length > 0 && (
            <div className="mt-7 border-t border-slate-100 pt-6">
              <h3 className="font-bold text-[#10295c]">
                Prizes
              </h3>

              <div className="mt-4 space-y-3">
                {competition.prizes.map((prize) => (
                  <div
                    key={prize.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-3"
                  >
                    <span className="text-sm font-medium text-slate-600">
                      {prize.position === 1
                        ? "1st Prize"
                        : prize.position === 2
                          ? "2nd Prize"
                          : prize.position === 3
                            ? "3rd Prize"
                            : `${prize.position}th Prize`}
                    </span>

                    <span className="text-sm font-bold text-[#10295c]">
                      {formatPrize(prize.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}