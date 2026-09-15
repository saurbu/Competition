import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function CompetitionHero() {
  return (
    <section className="relative overflow-hidden  bg-[#f4f8ff]">
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="absolute right-10 top-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-200/25 blur-3xl" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1380px] h-screen items-center px-5 pb-12 pt-20 sm:pb-16 sm:pt-2 lg:min-h-[535px] lg:px-8 lg:pb-20 lg:pt-2">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="relative z-10 max-w-[620px]">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 sm:text-xs">
              For India's next generation
            </p>

            <h1 className="max-w-[600px] font-serif text-[48px] font-bold leading-[0.94] tracking-[-0.035em] text-[#10295c] sm:text-[62px] lg:text-[76px]">
              Competitions
              <span className="block italic font-normal text-blue-600">
                that build
              </span>
              <span className="block italic font-normal text-blue-500">
                your tomorrow.
              </span>
            </h1>

            <p className="mt-6 max-w-[500px] text-sm leading-6 text-slate-500 sm:text-[15px]">
              Showcase your skills, solve real-world problems and win exciting
              rewards. Discover competitions that match your interests and
              take the next step in your journey.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#competitions"
                className="inline-flex items-center gap-2 rounded-full bg-[#10295c] px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(16,41,92,0.18)] transition hover:bg-blue-700"
              >
                Explore Competitions
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/competitions/my"
                className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-3 text-xs font-semibold text-[#10295c] transition hover:bg-blue-50"
              >
                My Competitions
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[360px] w-full max-w-[570px] lg:block">
            <div className="absolute left-[5%] top-[38px] h-[270px] w-[170px] -rotate-[10deg] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-b from-[#eaf4ff] via-[#d7eaff] to-[#bdd7fa] shadow-[0_20px_45px_rgba(46,91,160,0.18)]">
              <div className="absolute -bottom-10 left-1/2 h-36 w-36 -translate-x-1/2 rotate-45 bg-white/50 blur-xl" />

              <div className="relative flex h-full flex-col justify-between p-5">
                <div>
                  <p className="font-serif text-xl font-bold leading-[0.95] text-[#10295c]">
                    Think
                    <br />
                    Create
                    <br />
                    Compete.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Lightbulb
                    size={62}
                    strokeWidth={1.2}
                    className="text-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-[12px] z-20 h-[300px] w-[190px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/40 bg-gradient-to-b from-[#2639d9] via-[#202bb7] to-[#10196f] shadow-[0_25px_60px_rgba(35,50,170,0.3)]">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-300/30 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-purple-400/30 blur-2xl" />

              <div className="relative flex h-full flex-col items-center justify-between p-6 text-center text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Trophy size={30} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="font-serif text-[26px] font-bold leading-[0.95]">
                    Build
                    <br />
                    Solve
                    <br />
                    Win.
                  </p>

                  <div className="mt-5 h-px w-14 bg-white/30" />

                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                    Competitions
                  </p>
                </div>

                <Sparkles size={18} className="text-blue-200" />
              </div>
            </div>

            <div className="absolute right-[3%] top-[38px] h-[270px] w-[170px] rotate-[10deg] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-b from-[#f4edff] via-[#e4dcff] to-[#c7d8f8] shadow-[0_20px_45px_rgba(46,91,160,0.18)]">
              <div className="absolute -bottom-10 right-[-20px] h-40 w-40 rounded-full bg-white/50 blur-2xl" />

              <div className="relative flex h-full flex-col justify-between p-5">
                <div className="text-right">
                  <p className="font-serif text-xl font-bold leading-[0.95] text-[#10295c]">
                    Your
                    <br />
                    Skills
                    <br />
                    Matter.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Code2
                    size={58}
                    strokeWidth={1.2}
                    className="text-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[5px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 shadow-[0_10px_30px_rgba(45,75,130,0.12)] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-[10px] font-semibold text-[#10295c]">
                Discover. Compete. Grow.
              </span>
            </div>
          </div>

          <div className="relative mx-auto flex h-[270px] w-full max-w-[390px] items-center justify-center lg:hidden">
            <div className="absolute left-[2%] h-[200px] w-[125px] -rotate-[9deg] rounded-[18px] bg-gradient-to-b from-[#eaf4ff] to-[#c4dcfa] p-4 shadow-xl">
              <p className="font-serif text-[17px] font-bold leading-[0.95] text-[#10295c]">
                Think
                <br />
                Create
                <br />
                Compete.
              </p>

              <Lightbulb
                size={42}
                strokeWidth={1.2}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-blue-500"
              />
            </div>

            <div className="relative z-20 h-[225px] w-[145px] rounded-[20px] bg-gradient-to-b from-[#2639d9] to-[#11196e] p-5 text-center text-white shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 mx-auto">
                <Trophy size={22} />
              </div>

              <p className="mt-8 font-serif text-[21px] font-bold leading-[0.95]">
                Build
                <br />
                Solve
                <br />
                Win.
              </p>

              <p className="mt-5 text-[8px] font-semibold uppercase tracking-[0.15em] text-blue-100">
                Competitions
              </p>
            </div>

            <div className="absolute right-[2%] h-[200px] w-[125px] rotate-[9deg] rounded-[18px] bg-gradient-to-b from-[#f4edff] to-[#cbd9f6] p-4 shadow-xl">
              <p className="text-right font-serif text-[17px] font-bold leading-[0.95] text-[#10295c]">
                Your
                <br />
                Skills
                <br />
                Matter.
              </p>

              <Code2
                size={40}
                strokeWidth={1.2}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}