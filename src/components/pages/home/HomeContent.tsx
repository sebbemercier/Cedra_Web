"use client";

import React from "react";
import HeroSection from "@/components/pages/home/HeroSection";
import PromoGrid from "@/components/pages/home/PromoGrid";
import BestSellersCarousel from "@/components/pages/home/BestSellersCarousel";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-0">
      {/* Section Hero Massive (Includes actions now) */}
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-20 pb-32 space-y-32 -mt-10">
        
        {/* Contenu Dynamique */}
        <PromoGrid />

        <div className="py-10">
          <BestSellersCarousel />
        </div>
      </main>
    </div>
  );
}