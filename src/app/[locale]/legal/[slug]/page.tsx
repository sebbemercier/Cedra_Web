import React from "react";
import LegalSlugContent from "@/components/pages/legal/LegalSlugContent";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function LegalSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <LegalSlugContent slug={slug} />;
}
