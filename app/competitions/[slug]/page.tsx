import { notFound } from "next/navigation";
import CompetitionDetail from "@/components/competitions/CompetitionDetail";
import type { Competition } from "@/types/competition";

interface CompetitionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompetitionPage({
  params,
}: CompetitionPageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/competitions`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const competition = (data.competitions || []).find(
    (item: Competition) => item.slug === slug
  );

  if (!competition) {
    notFound();
  }

  return <CompetitionDetail competition={competition} />;
}