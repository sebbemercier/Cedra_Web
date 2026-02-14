"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { ContactInfoCard } from "@/components/pages/contact/ContactInfoCard";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const StoreMap = dynamic(() => import("@/components/ui/StoreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-900 animate-pulse rounded-[2.5rem]" />
  ),
});

export default function ContactContent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.contact.title}
        titleAccent={t.contact.titleAccent}
        subtitle={t.contact.subtitle}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactInfoCard
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                value="support@cedra.be"
                desc="Assistance technique 24/7"
              />
              <ContactInfoCard
                icon={<Phone className="w-6 h-6" />}
                title="Téléphone"
                value="+32 2 123 45 67"
                desc="Lun-Ven: 8h - 18h"
              />
              <ContactInfoCard
                icon={<MapPin className="w-6 h-6" />}
                title="Siège Social"
                value="Bruxelles, Belgique"
                desc="Rue de l'Électricité 42"
              />
              <ContactInfoCard
                icon={<Globe className="w-6 h-6" />}
                title="Réseau"
                value="25 Magasins"
                desc="Partout au Benelux"
              />
            </div>

            <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/10 blur-3xl -z-10 group-hover:bg-cedra-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
                  Support B2B Dédié
                </h3>
                <p className="text-zinc-500 font-medium mb-8 leading-relaxed">
                  Vous avez un projet complexe ? Nos ingénieurs vous accompagnent
                  pour définir vos besoins techniques et optimiser votre
                  approvisionnement.
                </p>
                <div className="flex items-center gap-4 text-cedra-500 font-black italic uppercase tracking-widest text-[10px]">
                  <Clock size={16} />
                  Réponse en moins de 2 heures
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cedra-500 to-red-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full -mb-10 -mr-10 group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 relative z-10">
                Demander la visite d&apos;un agent
              </h3>
              <p className="text-white/80 font-medium mb-8 relative z-10 max-w-sm">
                Un expert Cedra se déplace sur votre chantier ou dans vos bureaux pour une étude personnalisée.
              </p>
              <Button className="bg-white text-cedra-600 hover:bg-zinc-100 h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs relative z-10 shadow-xl active:scale-95 transition-all">
                Prendre Rendez-vous
              </Button>
            </div>
          </div>

          {/* Form Side */}
          <div className="sticky top-32">
            <ContactForm t={t} />
          </div>
        </div>

        {/* Map Section */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
              Localisez nos points de vente
            </h2>
            <p className="text-zinc-500 font-medium italic">
              Trouvez le magasin Cedra le plus proche de votre chantier pour un retrait express.
            </p>
          </div>
          
          <div className="h-[600px] w-full rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl shadow-cedra-500/5">
            <StoreMap />
          </div>
        </section>
      </div>
    </div>
  );
}
