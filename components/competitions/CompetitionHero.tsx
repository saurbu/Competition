import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export default function CompetitionHero() {
  return (
    <section className="relative overflow-hidden bg-[#f7faff]">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1380px] gap-12 px-5 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            <Sparkles size={16} />
            Discover. Compete. Grow.
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-[#10295c] sm:text-6xl lg:text-7xl">
            Competitions that
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              build your tomorrow.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover challenges, showcase your skills, win exciting rewards,
            and connect with opportunities that move your career forward.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#competitions"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#10295c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Competitions
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/competitions/my"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-[#10295c] transition hover:border-blue-200 hover:bg-blue-50"
            >
              My Competitions
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-[#10295c]">500+</p>
              <p className="mt-1 text-sm text-slate-500">
                Competitions
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#10295c]">100+</p>
              <p className="mt-1 text-sm text-slate-500">
                Organizers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#10295c]">₹1Cr+</p>
              <p className="mt-1 text-sm text-slate-500">
                Prize Pool
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-blue-200/40 via-purple-200/30 to-pink-200/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-white bg-white p-6 shadow-[0_25px_70px_rgba(37,70,130,0.14)]">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Trophy size={24} />
              </div>

              <span className="rounded-full bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                Trending
              </span>
            </div>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                Featured Competition
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#10295c]">
                CodeSprint Challenge 2026
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                TechNova
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <Trophy size={18} className="text-blue-600" />
                <p className="mt-3 text-xs text-slate-500">
                  Prize Pool
                </p>
                <p className="mt-1 font-bold text-[#10295c]">
                  ₹1,00,000
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <CalendarDays size={18} className="text-purple-600" />
                <p className="mt-3 text-xs text-slate-500">
                  Registration
                </p>
                <p className="mt-1 font-bold text-[#10295c]">
                  10 days left
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-blue-50/70 p-4">
              <Users size={19} className="text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-[#10295c]">
                  2.4k+ participants
                </p>
                <p className="text-xs text-slate-500">
                  Already competing
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                <span>Registration progress</span>
                <span>72%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-600 to-purple-500" />
              </div>
            </div>

            <Link
              href="/competitions/codesprint-india-2026"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10295c] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Competition
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}