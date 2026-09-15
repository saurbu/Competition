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
  { label: "All Competitions", value: "All", icon: Trophy },
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
    <section className="sticky top-[72px] z-20 mx-4 rounded-2xl border border-gray-300 bg-white/15 backdrop-blur-md md:mx-18">
      <div className="mx-auto max-w-[1380px] px-2 lg:px-8">
        <div className="flex h-[62px] items-center gap-1">
          <div className="grid min-w-0 flex-1 grid-cols-6 gap-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => onCategoryChange(category.value)}
                  title={category.label}
                  aria-label={category.label}
                  className={`flex h-10 w-full items-center justify-center rounded-xl transition sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3 ${
                    active
                      ? "bg-[#10295c] text-white shadow-sm"
                      : "text-slate-500 hover:bg-blue-50 hover:text-[#10295c]"
                  }`}
                >
                  <Icon size={16} />

                  <span className="hidden text-sm sm:inline">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onCategoryChange("Saved")}
            title="Saved Competitions"
            aria-label="Saved Competitions"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3 ${
              activeCategory === "Saved"
                ? "bg-[#10295c] text-white shadow-sm"
                : "text-slate-500 hover:bg-blue-50 hover:text-[#10295c]"
            }`}
          >
            <Bookmark
              size={17}
              fill={
                activeCategory === "Saved"
                  ? "currentColor"
                  : "none"
              }
            />

            <span className="hidden text-sm sm:inline">
              Saved
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}