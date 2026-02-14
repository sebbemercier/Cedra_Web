"use client";

import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { Search, Truck, CreditCard, PenTool, ChevronDown, Mail, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpPage() {
  const { t } = useTranslation();

  const faqItems = [
    { q: "q1", a: "a1" },
    { q: "q2", a: "a2" },
    { q: "q3", a: "a3" },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.help.title}
        titleAccent={t.help.titleAccent}
        subtitle={t.help.subtitle}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 relative z-20">
        {/* Search Bar */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl mb-16 flex items-center gap-4">
          <Search className="text-zinc-500 ml-4" />
          <Input 
            className="border-none bg-transparent text-white placeholder:text-zinc-500 text-lg h-12 focus-visible:ring-0" 
            placeholder={t.help.searchPlaceholder}
          />
          <Button className="bg-cedra-500 text-white hover:bg-cedra-600 rounded-xl px-8 font-bold uppercase tracking-widest text-xs h-12">
            Rechercher
          </Button>
        </div>

        {/* Quick Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <TopicCard 
            icon={<Truck size={24} />} 
            title={t.help.shipping} 
            description="Suivi, délais et zones de livraison."
          />
          <TopicCard 
            icon={<CreditCard size={24} />} 
            title={t.help.billing} 
            description="Factures, TVA et paiements différés."
          />
          <TopicCard 
            icon={<PenTool size={24} />} 
            title={t.help.technical} 
            description="Fiches techniques et conseils d'installation."
          />
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-cedra-500"></span>
              {t.help.faq}
            </h3>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-zinc-900/40 border border-white/5 rounded-2xl px-6 data-[state=open]:border-cedra-500/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-white hover:text-cedra-500 font-bold py-6 text-left">
                    {/* @ts-expect-error - Dynamic translation keys */}
                    {t.help[item.q]}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 leading-relaxed pb-6 text-base">
                    {/* @ts-expect-error - Dynamic translation keys */}
                    {t.help[item.a]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-cedra-500 to-red-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
              
              <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">{t.help.stillNeedHelp}</h4>
              <p className="text-white/80 text-sm font-medium mb-8">Nos experts sont disponibles de 8h à 18h.</p>
              
              <div className="space-y-4">
                <Button className="w-full bg-white text-cedra-600 hover:bg-zinc-100 font-black uppercase tracking-widest text-xs h-12 rounded-xl gap-2">
                  <Phone size={16} /> {t.help.callUs}
                </Button>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs h-12 rounded-xl gap-2">
                  <Mail size={16} /> {t.help.contactSupport}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-900/60 hover:border-cedra-500/30 transition-all cursor-pointer group">
      <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-cedra-500 group-hover:scale-110 transition-all border border-white/5 mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-black text-white italic uppercase tracking-tighter mb-2 group-hover:text-cedra-400 transition-colors">
        {title}
      </h4>
      <p className="text-zinc-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
