import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { Zap, Shield, Rocket, Target, Users } from "lucide-react";
import { StatCard } from "@/components/pages/about/StatCard";
import { ValueCard } from "@/components/pages/about/ValueCard";

export default function AboutContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.about.title}
        titleAccent={t.about.titleAccent}
        subtitle={t.about.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Core Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 mb-32">
          <div className="bg-zinc-900/50 p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cedra-500/5 blur-3xl -z-10 group-hover:bg-cedra-500/10 transition-colors" />
            <Target className="w-12 h-12 text-cedra-500 mb-6" />
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">
              {t.about.mission}
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed italic">
              &quot;{t.about.missionDesc}&quot;
            </p>
          </div>

          <div className="bg-zinc-900/50 p-12 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cedra-600/5 blur-3xl -z-10 group-hover:bg-cedra-600/10 transition-colors" />
            <Rocket className="w-12 h-12 text-cedra-500 mb-6" />
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">
              {t.about.vision}
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed italic">
              &quot;{t.about.visionDesc}&quot;
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          <StatCard value="25+" label="Magasins" />
          <StatCard value="50k+" label="Références" />
          <StatCard value="15k+" label="Clients Pro" />
          <StatCard value="24h" label="Livraison" />
        </div>

        {/* Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-zinc-500 font-medium italic">
              L&apos;excellence technique et l&apos;innovation au service des professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Zap />}
              title="Innovation IA"
              desc="Nous intégrons les dernières technologies d'IA pour simplifier l'approvisionnement électrique."
            />
            <ValueCard
              icon={<Shield />}
              title="Fiabilité Pro"
              desc="Nos produits répondent aux normes les plus strictes de l'industrie pour une sécurité maximale."
            />
            <ValueCard
              icon={<Users />}
              title="Proximité"
              desc="Avec 25 magasins au Benelux, nous sommes toujours proches de vos chantiers."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
