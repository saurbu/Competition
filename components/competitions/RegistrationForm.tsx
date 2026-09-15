"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Competition } from "@/types/competition";

interface RegistrationFormProps {
  competition: Competition;
}

export default function RegistrationForm({
  competition,
}: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      college: String(formData.get("college") || "").trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.college
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/competitions/${competition.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Registration failed.");
        return;
      }

      setSuccess(true);
      form.reset();
    } catch {
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#f7faff] px-5 py-24">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#10295c]">
              Registration Successful!
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              You’re all set for{" "}
              <span className="font-semibold text-[#10295c]">
                {competition.title}
              </span>
              .
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Date
                </p>
                <p className="mt-1 text-sm font-semibold text-[#10295c]">
                  {new Date(
                    competition.competitionStart
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Mode
                </p>
                <p className="mt-1 text-sm font-semibold text-[#10295c]">
                  {competition.mode}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Organizer
                </p>
                <p className="mt-1 text-sm font-semibold text-[#10295c]">
                  {competition.organizer}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/competitions/${competition.slug}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#10295c] px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                View Competition
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-[#10295c] hover:bg-slate-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faff] px-4 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/competitions/${competition.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Competition
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            Registration
          </span>

          <h1 className="mt-4 text-3xl font-bold text-[#10295c]">
            Register for {competition.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organized by {competition.organizer}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="text-sm font-semibold text-[#10295c]">
                Full Name
              </label>

              <input
                required
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-[#10295c] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#10295c]">
                Email Address
              </label>

              <input
                required
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-[#10295c] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#10295c]">
                Phone Number
              </label>

              <input
                required
                name="phone"
                type="tel"
                placeholder="+91 Enter your phone number"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-[#10295c] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#10295c]">
                College / University
              </label>

              <input
                required
                name="college"
                type="text"
                placeholder="Enter your college or university"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-[#10295c] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#10295c] text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Complete Registration"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}