"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy } from "lucide-react";

interface Competition {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  category: string;
  mode: string;
  competitionStart: string;
}

interface Registration {
  id: string;
  fullName: string;
  email: string;
  college: string | null;
  phone: string | null;
  status: string;
  registeredAt: string;
  competition: Competition;
}

function AttendButton({
  competition,
}: {
  competition: Competition;
}) {
  const competitionDate = new Date(competition.competitionStart);
  const now = new Date();

  const competitionYear = competitionDate.getFullYear();
  const competitionMonth = competitionDate.getMonth();
  const competitionDay = competitionDate.getDate();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const isCompetitionDay =
    competitionYear === currentYear &&
    competitionMonth === currentMonth &&
    competitionDay === currentDay;

  const isOnline =
    competition.mode === "ONLINE" ||
    competition.mode === "HYBRID";

  if (!isOnline) {
    return null;
  }

  if (!isCompetitionDay) {
    return (
      <div className="mt-3 flex w-full items-center justify-center rounded-full border border-[#DDE2F0] bg-[#EFF1F9] px-5 py-3 text-sm font-semibold text-[#7C849E]">
        Attend on{" "}
        {competitionDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    );
  }

  return (
    <Link
      href={`/competitions/${competition.slug}/attend`}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#2E58D7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C3FA8]"
    >
      Attend Competition
      <ArrowRight size={16} />
    </Link>
  );
}

export default function MyCompetitionsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/competitions/my", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid registration data");
        }

        setRegistrations(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load registered competitions.");
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, []);

  return (
    <main className="min-h-screen bg-[#EFF1F9]">
      <section className="border-b border-[#DDE2F0] bg-white">
        <div className="mx-auto max-w-[1380px] px-5 pb-12 pt-8 lg:px-8 lg:pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#5B6487] transition hover:text-[#2E58D7]"
          >
            ← Back to Competitions
          </Link>

          <div className="mt-7">
            <span className="rounded-full bg-[#E7EDFF] px-3 py-1.5 text-xs font-semibold text-[#2E58D7]">
              My Activity
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0B1E4A] sm:text-5xl">
              My Competitions
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5B6487]">
              Track the competitions you have registered for and manage your
              participation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8 lg:py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-[#2E58D7]">
              Your competitions
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#0B1E4A]">
              Registered Competitions
            </h2>
          </div>

          <span className="text-sm text-[#5B6487]">
            {registrations.length} registered
          </span>
        </div>

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-[20px] border border-[#DDE2F0] bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[20px] border border-[#DDE2F0] bg-white px-6 py-16 text-center shadow-[0_4px_18px_rgba(11,30,74,0.06)]">
            <h3 className="text-xl font-bold text-[#0B1E4A]">
              Unable to load registrations
            </h3>

            <p className="mt-2 text-sm text-[#5B6487]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-[#2E58D7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C3FA8]"
            >
              Try Again
            </button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="rounded-[20px] border border-[#DDE2F0] bg-white px-6 py-16 text-center shadow-[0_4px_18px_rgba(11,30,74,0.06)]">
            <Trophy
              className="mx-auto text-[#7AD9E8]"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold text-[#0B1E4A]">
              No registered competitions
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5B6487]">
              No registrations were found in the database.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2E58D7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C3FA8]"
            >
              Explore Competitions
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {registrations.map((registration) => {
              const competition = registration.competition;

              return (
                <article
                  key={registration.id}
                  className="rounded-[20px] border border-[#DDE2F0] bg-white p-6 shadow-[0_4px_18px_rgba(11,30,74,0.06)] transition hover:-translate-y-1 hover:border-[#7AD9E8] hover:shadow-[0_8px_28px_rgba(11,30,74,0.10)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#E7EDFF] text-[#2E58D7]">
                      <Trophy size={22} />
                    </div>

                    <span className="rounded-full bg-[#E8F9FC] px-3 py-1.5 text-xs font-semibold text-[#0B1E4A]">
                      {registration.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E7EDFF] px-3 py-1 text-xs font-semibold text-[#2E58D7]">
                        {competition.category}
                      </span>

                      <span className="rounded-full bg-[#EFF1F9] px-3 py-1 text-xs font-medium text-[#5B6487]">
                        {competition.mode}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-[#0B1E4A]">
                      {competition.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#5B6487]">
                      {competition.organizer}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-[14px] bg-[#EFF1F9] p-4">
                      <p className="text-xs text-[#7C849E]">
                        Competition Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#0B1E4A]">
                        {new Date(
                          competition.competitionStart
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="rounded-[14px] bg-[#EFF1F9] p-4">
                      <p className="text-xs text-[#7C849E]">
                        Registered On
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#0B1E4A]">
                        {new Date(
                          registration.registeredAt
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[14px] bg-[#EFF1F9] p-4">
                    <p className="text-xs text-[#7C849E]">
                      Registered By
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0B1E4A]">
                      {registration.fullName}
                    </p>

                    <p className="mt-1 text-sm text-[#5B6487]">
                      {registration.email}
                    </p>
                  </div>

                  <Link
                    href={`/competitions/${competition.slug}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#DDE2F0] px-5 py-3 text-sm font-semibold text-[#0B1E4A] transition hover:border-[#2E58D7] hover:bg-[#E7EDFF]"
                  >
                    View Competition
                    <ArrowRight size={16} />
                  </Link>

                  <AttendButton competition={competition} />
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}