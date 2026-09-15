import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1380px] px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[#10295c]"
            >
              Intern<span className="text-blue-600">Atlas</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Discover internships, jobs, competitions, hackathons and
              opportunities built for your career journey.
            </p>

            <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-blue-600">
              <Star size={17} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#10295c]">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                href="#competitions"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Competitions
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Internships
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Jobs for Freshers
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Hackathons
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#10295c]">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                About Us
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Contact
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="text-sm text-slate-500 transition hover:text-blue-600"
              >
                Terms
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#10295c]">
              Stay updated
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Get the latest opportunities delivered to you.
            </p>

            <form className="mt-4 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#10295c] outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-11 shrink-0 items-center justify-center bg-[#10295c] text-white transition hover:bg-blue-700"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-5 text-center text-xs text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 InternAtlas. All rights reserved.</p>

          <p className="mt-2 sm:mt-0">
            Built for students. Built for opportunities.
          </p>
        </div>
      </div>
    </footer>
  );
}