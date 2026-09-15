"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Search, UserRound } from "lucide-react";

const navItems = [
  {
    label: "Opportunities",
    dropdown: true,
    items: [
      { label: "Internships", href: "#" },
      { label: "Jobs for Freshers", href: "#" },
      { label: "Competitions", href: "/competitions" },
      { label: "Hackathons", href: "#" },
    ],
  },
  {
    label: "Events",
    dropdown: true,
    items: [
      { label: "Workshops", href: "#" },
      { label: "College Events", href: "#" },
      { label: "Fests", href: "#" },
    ],
  },
  {
    label: "Resources",
    dropdown: true,
    items: [
      { label: "Career Guides", href: "#" },
      { label: "Interview Prep", href: "#" },
      { label: "Skill Resources", href: "#" },
    ],
  },
  {
    label: "For Colleges",
    dropdown: false,
    href: "#",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-[999] border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-5 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10295c] text-lg font-bold text-white">
            A
          </div>

          <span className="text-[20px] font-bold text-[#10295c]">
            Intern<span className="text-blue-600">Atlas</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center gap-1 text-[13px] font-medium text-slate-600 transition hover:text-blue-600"
                  >
                    {item.label}

                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-9 z-[1000] w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      {(item.items ?? []).map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="text-[13px] font-medium text-slate-600 transition hover:text-blue-600"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex h-10 w-[220px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4">
            <Search size={15} className="shrink-0 text-slate-400" />

            <input
              type="text"
              placeholder="Search opportunities"
              className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-full border border-slate-200 px-4 text-xs font-semibold text-[#10295c] transition hover:border-blue-200 hover:bg-blue-50"
          >
            <UserRound size={14} />
            Log in
          </button>

          <button
            type="button"
            className="h-10 rounded-full bg-[#10295c] px-5 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Sign up
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#10295c] transition hover:bg-slate-50 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg md:hidden">
          <div className="mx-auto max-w-[1380px] px-5 py-4">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-slate-100 last:border-0"
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-[#10295c]"
                    >
                      {item.label}

                      <ChevronDown
                        size={17}
                        className={`transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === item.label && (
                      <div className="mb-3 rounded-xl bg-slate-50 p-2">
                        {(item.items ?? []).map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={closeMenu}
                            className="block rounded-lg px-3 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-4 text-sm font-semibold text-[#10295c]"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 text-xs font-semibold text-[#10295c] transition hover:bg-slate-50"
              >
                <UserRound size={14} />
                Log in
              </button>

              <button
                type="button"
                className="h-10 flex-1 rounded-full bg-[#10295c] text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}