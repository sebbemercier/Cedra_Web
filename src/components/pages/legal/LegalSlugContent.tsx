"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface LegalSlugContentProps {
  slug: string;
}

export default function LegalSlugContent({ slug }: LegalSlugContentProps) {
  const { t } = useTranslation();

  // Mapping slug to translation keys
  const slugMap: Record<string, string> = {
    mentions: "mentions",
    confidentialite: "privacy",
    cgv: "terms",
    cookies: "cookies",
  };

  const key = slugMap[slug];
  
  // @ts-expect-error - Accessing dynamic keys in translations
  const content = t.legalPages?.[key];

  if (!content) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={content.title}
        titleAccent={content.titleAccent}
        subtitle={content.subtitle}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-12 space-y-12 text-zinc-400">
        {content.sections.map((section: { title: string; content: string }, index: number) => (
          <section key={index}>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">
              {index + 1}. {section.title}
            </h2>
            <p className="leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
