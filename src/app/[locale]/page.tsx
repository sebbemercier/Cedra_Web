import React from "react";
import HeroSection from "@/components/home/HeroSection";
import PromoGrid from "@/components/home/PromoGrid";
import BestSellersCarousel from "@/components/home/BestSellersCarousel";
import { Button } from "@heroui/react";
import { Zap, LayoutGrid } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16 md:pt-20">
      {/* Section Hero Massive */}
      <HeroSection />

      <main className="max-w-400 mx-auto px-4 md:px-6 w-full -mt-12 md:-mt-24 relative z-20 pb-32 space-y-32">
        {/* Actions Centrales (HeroUI) */}
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            color="danger"
            variant="shadow"
            className="font-black uppercase italic tracking-widest h-16 px-12 text-md shadow-[0_15px_40px_-10px_rgba(230,0,35,0.6)] rounded-4xl"
            startContent={<Zap size={20} fill="currentColor" />}
          >
            Espace Pro Express
          </Button>
          <Button
            variant="bordered"
            className="font-black uppercase italic tracking-widest h-16 px-12 text-md border-white/10 text-white hover:bg-white/5 rounded-4xl"
            startContent={<LayoutGrid size={20} />}
          >
            Parcourir le Stock
          </Button>
        </div>

        {/* Contenu Dynamique */}
        <PromoGrid />

        <div className="py-10">
          <BestSellersCarousel />
        </div>
      </main>
    </div>
  );
}
