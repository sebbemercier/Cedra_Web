"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import PromoGrid from "@/components/home/PromoGrid";
import BestSellersCarousel from "@/components/home/BestSellersCarousel";

export default function Home() {
    return (
        <div className="min-h-screen bg-black flex flex-col pt-[80px]">
            <HeroSection />

            <main className="max-w-[1600px] mx-auto px-6 w-full -mt-20 relative z-20 pb-20 space-y-16">
                <PromoGrid />
                <BestSellersCarousel />
            </main>
        </div>
    );
}
