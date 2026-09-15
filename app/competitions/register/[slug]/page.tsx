import { notFound } from "next/navigation";
import RegistrationForm from "@/components/competitions/RegistrationForm";
import type { Competition } from "@/types/competition";

interface RegisterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RegisterPage({
  params,
}: RegisterPageProps) {
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

  return (
    <RegistrationForm competition={competition} />
  );
}