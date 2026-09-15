"use client";

import {
  Trophy,
  Code2,
  Palette,
  BriefcaseBusiness,
  Lightbulb,
  GraduationCap,
  Bookmark,
} from "lucide-react";

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { label: "All", value: "All", icon: Trophy },
  { label: "Coding", value: "Coding", icon: Code2 },
  { label: "Design", value: "Design", icon: Palette },
  { label: "Business", value: "Business", icon: BriefcaseBusiness },
  { label: "Innovation", value: "Innovation", icon: Lightbulb },
  { label: "Academic", value: "Academic", icon: GraduationCap },
];

export default function CategoryNav({
  activeCategory,
  onCategoryChange,
}: CategoryNavProps) {
  return (
    <section className="relative z-10 border-y border-blue-100/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1380px] px-4 sm:px-5 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex min-w-max items-center gap-1.5 sm:gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => onCategoryChange(category.value)}
                  aria-label={category.label}
                  className={`group flex h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 sm:px-4 sm:text-sm ${
                    active
                      ? "bg-[#10295c] text-white shadow-sm"
                      : "text-slate-500 hover:bg-blue-50 hover:text-[#10295c]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-blue-50 text-blue-600 group-hover:bg-white"
                    }`}
                  >
                    <Icon size={13} strokeWidth={2} />
                  </span>

                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="ml-2 shrink-0 border-l border-blue-100 pl-2 sm:pl-3">
            <button
              type="button"
              onClick={() => onCategoryChange("Saved")}
              aria-label="Saved Competitions"
              className={`flex h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 sm:px-4 sm:text-sm ${
                activeCategory === "Saved"
                  ? "bg-[#10295c] text-white shadow-sm"
                  : "text-slate-500 hover:bg-blue-50 hover:text-[#10295c]"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  activeCategory === "Saved"
                    ? "bg-white/15 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <Bookmark
                  size={13}
                  fill={
                    activeCategory === "Saved"
                      ? "currentColor"
                      : "none"
                  }
                />
              </span>

              <span className="hidden sm:inline">Saved</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}