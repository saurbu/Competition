import Link from "next/link";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";

export default function CompetitionCTA() {
  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[32px] bg-[#10295c] px-6 py-12 sm:px-10 lg:px-16 lg:py-14">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
              <Sparkles size={14} />
              Your next opportunity starts here
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ready to showcase
              <span className="block text-blue-200">
                what you can do?
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">
              Take part in competitions, build your portfolio, and turn your
              skills into meaningful opportunities.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="#competitions"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-[#10295c] transition hover:bg-blue-50"
            >
              Explore Competitions
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/competitions/my"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <Trophy size={17} />
              My Competitions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}