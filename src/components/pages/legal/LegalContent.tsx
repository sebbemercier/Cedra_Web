"use client";

import React from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { Scale, ShieldCheck, FileText, Cookie, ArrowRight } from "lucide-react";

export default function LegalContent() {
  const { t } = useTranslation();

  const legalLinks = [
    {
      href: "/legal/mentions",
      title: t.footer.legalNotice,
      icon: <Scale className="text-cedra-500" size={32} />,
      description: "Informations légales sur l'entreprise et l'éditeur du site."
    },
    {
      href: "/legal/confidentialite",
      title: t.footer.privacy,
      icon: <ShieldCheck className="text-cedra-500" size={32} />,
      description: "Notre politique de protection de vos données personnelles et professionnelles."
    },
    {
      href: "/legal/cgv",
      title: t.footer.terms,
      icon: <FileText className="text-cedra-500" size={32} />,
      description: "Les conditions générales qui régissent nos relations commerciales B2B."
    },
    {
      href: "/legal/cookies",
      title: t.footer.cookies,
      icon: <Cookie className="text-cedra-500" size={32} />,
      description: "Comment nous utilisons les cookies pour améliorer votre expérience."
    },
    {
      href: "/legal/retractation",
      title: "Droit de Rétractation",
      icon: <RotateCcw className="text-cedra-500" size={32} />,
      description: "Conditions de retour et d'annulation pour les professionnels."
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.footer.legalNotice || "Mentions"}
        titleAccent="Légales"
        subtitle="Consultez nos engagements juridiques et politiques de confidentialité."
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="group bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-cedra-500/30 transition-all duration-500 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-zinc-950/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                {link.icon}
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-3 group-hover:text-cedra-400 transition-colors">
                {link.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                {link.description}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cedra-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Consulter <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
