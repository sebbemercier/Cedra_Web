// components/home/HeroSection.tsx
"use client";

import React, { useState } from "react";
import { Search, Package, Clock, TrendingUp, MessageSquare, Truck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";

export default function HeroSection() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-start pt-8 pb-12 md:py-20 lg:min-h-[600px] bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background"></div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] md:h-[600px] bg-cedra-500/10 blur-[100px] md:blur-[200px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl w-full px-4 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <StatBadge icon={<Package size={12} />} value="55K+" label={t.hero.products} />
          <StatBadge icon={<Clock size={12} />} value="24h" label={t.hero.dispatch} highlight />
          <StatBadge icon={<TrendingUp size={12} />} value="98%" label={t.hero.inStock} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 md:mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.9] mb-3 md:mb-4">
            {t.hero.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-red-500 to-cedra-600 animate-gradient">{t.hero.title2}</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed px-4 font-medium">
            {t.hero.subtitle} <span className="text-cedra-500 font-semibold block sm:inline">{t.hero.aiProcurement}</span> {t.hero.and} <span className="text-cedra-500 font-semibold">{t.hero.delivery24h}</span>
          </p>
        </motion.div>

        <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} onSubmit={handleSearch} className="relative max-w-3xl w-full group mb-8 z-30 hidden md:block">
          <div className="absolute -inset-1 bg-gradient-to-r from-cedra-500/20 via-red-500/20 to-cedra-500/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 flex items-center shadow-2xl hover:border-white/20">
            <div className="flex items-center pl-4 pr-2"><Search className="text-zinc-400 w-5 h-5" /></div>
            <input type="text" placeholder={t.hero.searchPlaceholder} className="flex-1 bg-transparent border-none text-white px-3 py-3 text-base focus:outline-none placeholder:text-zinc-500 font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="bg-gradient-to-r from-cedra-500 to-cedra-600 text-white h-10 px-6 rounded-xl font-bold uppercase tracking-wider text-sm hover:from-cedra-600 hover:to-cedra-700 transition-all shadow-lg shadow-cedra-500/25">{t.hero.searchButton}</button>
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full">
           <div className="flex md:justify-center overflow-x-auto snap-x snap-mandatory gap-3 pb-4 px-4 no-scrollbar -mx-4 md:mx-0">
              <QuickAction icon={<MessageSquare size={18} className="text-cedra-500" />} label={t.hero.requestQuote} href="/quotes" description={t.hero.bulkPricing} />
              <QuickAction icon={<Truck size={18} className="text-cedra-500" />} label={t.hero.trackOrder} href="/dashboard/orders" description={t.hero.realTimeTracking} />
              <QuickAction icon={<UserPlus size={18} className="text-cedra-500" />} label={t.hero.tradeAccount} href="/register-pro" description={t.hero.exclusiveBenefits} badge="Pro" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatBadge({ icon, value, label, highlight }: any) {
  return (
    <div className={`px-3 py-1.5 rounded-full border ${highlight ? "bg-cedra-500/10 border-cedra-500/30 text-cedra-400" : "bg-white/5 border-white/10 text-zinc-300"} backdrop-blur-sm flex items-center gap-1.5`}>
      <span className={highlight ? "text-cedra-500" : "text-zinc-400"}>{icon}</span>
      <span className="font-bold text-xs">{value}</span>
      <span className="text-[10px] opacity-70 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function QuickAction({ icon, label, href, description, badge }: any) {
  return (
    <a href={href} className="snap-center flex-shrink-0 min-w-[200px] group relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cedra-500/50 transition-all backdrop-blur-sm overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cedra-500/0 via-cedra-500/5 to-cedra-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-zinc-800/80 flex items-center justify-center border border-white/5">{icon}</div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white group-hover:text-cedra-400 transition-colors whitespace-nowrap">{label}</span>
            {badge && <Badge className="bg-cedra-500 text-white text-[8px] px-1.5 py-0 h-4">{badge}</Badge>}
          </div>
          <span className="text-[10px] text-zinc-400 whitespace-nowrap block mt-0.5 font-medium">{description}</span>
        </div>
      </div>
    </a>
  );
}
