"use client";

import React, { useState } from "react";
import { Search, Package, Clock, TrendingUp, MessageSquare, Truck, UserPlus, ArrowRight, Zap, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@heroui/react";
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
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-start pt-16 pb-24 md:pt-32 md:pb-40 lg:min-h-[850px] bg-background selection:bg-cedra-500 selection:text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mask-fade-bottom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        {/* Abstract Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cedra-500/5 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-4 flex flex-col items-center text-center">
        {/* Top Badges */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <StatBadge icon={<Package size={14} />} value="55K+" label={t.hero.products} />
          <StatBadge icon={<Clock size={14} />} value="24h" label={t.hero.dispatch} highlight />
          <StatBadge icon={<TrendingUp size={14} />} value="98%" label={t.hero.inStock} />
        </motion.div>

        {/* Main Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
          className="mb-10 md:mb-14 relative"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-6 drop-shadow-2xl">
            {t.hero.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-white to-cedra-600 animate-gradient pb-2 block">
              {t.hero.title2}
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed px-4 font-medium tracking-wide">
            {t.hero.subtitle} <span className="text-cedra-500 font-bold">{t.hero.aiProcurement}</span> {t.hero.and} <span className="text-white font-bold underline decoration-cedra-500 underline-offset-4">{t.hero.delivery24h}</span>
          </p>
        </motion.div>

        {/* Search Bar - Enhanced */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          onSubmit={handleSearch} 
          className="relative max-w-3xl w-full group mb-12 z-30 px-4 md:px-0"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cedra-500/20 via-cedra-500/10 to-cedra-500/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-700"></div>
          <div className="relative bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-2 flex flex-col md:flex-row items-center shadow-2xl hover:border-white/20 transition-all duration-300 ring-1 ring-white/5 group-focus-within:ring-cedra-500/30">
            <div className="flex items-center w-full md:w-auto px-4 py-3 md:py-0">
              <Search className="text-cedra-500 w-6 h-6 shrink-0" />
              <input 
                type="text" 
                placeholder={t.hero.searchPlaceholder} 
                className="flex-1 bg-transparent border-none text-white px-4 py-3 text-lg focus:outline-none placeholder:text-zinc-500 font-medium w-full" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10 mx-2"></div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-white text-black h-12 md:h-14 px-8 rounded-xl md:rounded-2xl font-black uppercase tracking-tighter text-sm hover:bg-cedra-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg"
            >
              {t.hero.searchButton}
              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.form>

        {/* Primary CTAs */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.5 }}
           className="flex flex-wrap justify-center gap-4 mb-16"
        >
            <Button
                color="danger"
                variant="shadow"
                className="font-black uppercase italic tracking-widest h-14 px-8 text-sm shadow-[0_10px_30px_-5px_rgba(230,0,35,0.4)] rounded-2xl border border-cedra-500/50"
                startContent={<Zap size={18} fill="currentColor" />}
            >
                Espace Pro Express
            </Button>
            <Button
                variant="bordered"
                className="font-black uppercase italic tracking-widest h-14 px-8 text-sm border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 rounded-2xl hover:border-white/20 bg-black/20 backdrop-blur-md"
                startContent={<LayoutGrid size={18} />}
            >
                Parcourir le Stock
            </Button>
        </motion.div>

        {/* Quick Actions Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
              <QuickAction 
                icon={<MessageSquare size={20} className="text-white" />} 
                label={t.hero.requestQuote} 
                href="/quotes" 
                description={t.hero.bulkPricing} 
                delay={0.7}
              />
              <QuickAction 
                icon={<Truck size={20} className="text-white" />} 
                label={t.hero.trackOrder} 
                href="/orders" 
                description={t.hero.realTimeTracking} 
                delay={0.8}
              />
              <QuickAction 
                icon={<UserPlus size={20} className="text-white" />} 
                label={t.hero.tradeAccount} 
                href="/register-pro" 
                description={t.hero.exclusiveBenefits} 
                badge="Pro" 
                delay={0.9}
              />
           </div>
        </motion.div>
      </div>
    </section>
  );
}

interface StatBadgeProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    highlight?: boolean;
}

function StatBadge({ icon, value, label, highlight }: StatBadgeProps) {
  return (
    <div className={`px-4 py-2 rounded-full border transition-all duration-300 ${highlight ? "bg-cedra-500/10 border-cedra-500/30 text-cedra-400 shadow-[0_0_20px_rgba(230,0,35,0.1)]" : "bg-white/5 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/10"} backdrop-blur-md flex items-center gap-2 group cursor-default`}>
      <span className={`${highlight ? "text-cedra-500" : "text-zinc-500 group-hover:text-white"} transition-colors`}>{icon}</span>
      <span className="font-bold text-sm tracking-tight text-zinc-200">{value}</span>
      <span className="text-[10px] opacity-60 uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}

interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    description: string;
    badge?: string;
    delay: number;
}

function QuickAction({ icon, label, href, description, badge, delay }: QuickActionProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a 
      href={href} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      className="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300 h-full"
    >
      {/* Spotlight Effect - Fixed */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(230, 0, 35, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full px-6 py-5 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-white/5 group-hover:border-cedra-500/30 group-hover:bg-zinc-900/60 transition-all duration-500 flex flex-col items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-cedra-500/20 group-hover:border-cedra-500/20 transition-all duration-500 shadow-lg">
          {icon}
        </div>
        
        <div className="text-left w-full">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-cedra-400 transition-colors">{label}</span>
            {badge && <Badge className="bg-cedra-500 text-white text-[9px] font-bold px-1.5 py-0 h-4 rounded-md border-none uppercase tracking-wider">{badge}</Badge>}
          </div>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium leading-relaxed block">{description}</span>
        </div>
        
        <div className="mt-auto pt-2 flex items-center text-cedra-500 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
          Access <ArrowRight size={12} className="ml-1" />
        </div>
      </div>
    </motion.a>
  );
}