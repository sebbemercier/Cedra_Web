// components/home/HeroSection.tsx
"use client";

import React, { useState } from "react";
import { Search, Zap, Package, Clock, TrendingUp, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const trendingSearches = ["MCB 32A", "Cat6 Cable", "LED Panel", "RCD 30mA"];

    return (
        <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black">
            {/* Background avec meilleur overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-15"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
            </div>
            
            {/* Glow ambiant amélioré */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cedra-500/8 blur-[200px] rounded-full"></div>

            <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center text-center">
                {/* Stats améliorés avec animations */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-wrap items-center justify-center gap-3"
                >
                    <StatBadge icon={<Package size={14} />} value="55K+" label="Products" />
                    <StatBadge icon={<Clock size={14} />} value="24h" label="Dispatch" highlight />
                    <StatBadge icon={<TrendingUp size={14} />} value="98%" label="In Stock" />
                </motion.div>

                {/* Titre avec meilleure hiérarchie */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-4">
                        Power Your
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-red-500 to-cedra-600 animate-gradient">
                            Projects
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Industrial-grade electrical components with{" "}
                        <span className="text-cedra-500 font-semibold">AI-powered</span> procurement and{" "}
                        <span className="text-cedra-500 font-semibold">24h delivery</span>
                    </p>
                </motion.div>

                {/* Search amélioré */}
                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSearch}
                    className="relative max-w-4xl w-full group mb-10"
                >
                    {/* Glow effect animé */}
                    <div className={`absolute -inset-1 bg-gradient-to-r from-cedra-500/20 via-red-500/20 to-cedra-500/20 blur-2xl rounded-3xl transition-all duration-700 ${isFocused ? 'opacity-100 scale-105' : 'opacity-0'}`}></div>

                    <div className="relative bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 flex items-center shadow-2xl transition-all hover:border-white/20 focus-within:border-cedra-500/50">
                        <div className="flex items-center pl-5 pr-3">
                            <Search className="text-zinc-500 w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by SKU, brand, category, or product type..."
                            className="flex-1 bg-transparent border-none text-white px-3 py-4 text-base focus:outline-none placeholder:text-zinc-600 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-cedra-500 to-cedra-600 text-white h-12 px-10 rounded-xl font-bold uppercase tracking-wider text-sm hover:from-cedra-600 hover:to-cedra-700 transition-all shadow-lg shadow-cedra-500/25 hover:shadow-cedra-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Search
                        </button>
                    </div>

                    {/* Trending avec meilleur design */}
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full mt-3 left-0 right-0 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp size={14} className="text-cedra-500" />
                                    <span className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Trending Searches</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {trendingSearches.map((term) => (
                                        <button
                                            key={term}
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery(term);
                                                router.push(`/products?q=${encodeURIComponent(term)}`);
                                            }}
                                            className="px-4 py-2.5 bg-zinc-800/80 hover:bg-cedra-500/20 hover:text-cedra-400 hover:border-cedra-500/50 text-zinc-400 rounded-xl text-sm transition-all border border-white/5 font-medium"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>

                {/* Quick Actions améliorés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    <QuickAction 
                        icon="💬" 
                        label="Request Quote" 
                        href="/quotes"
                        description="Get bulk pricing"
                    />
                    <QuickAction 
                        icon="📦" 
                        label="Track Order" 
                        href="/dashboard/orders"
                        description="Real-time updates"
                    />
                    <QuickAction 
                        icon="⚡" 
                        label="Trade Account" 
                        href="/register-pro"
                        description="Exclusive benefits"
                        badge="Pro"
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
                >
                    <span className="text-xs uppercase tracking-widest font-bold">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Composants améliorés
function StatBadge({ 
    icon, 
    value, 
    label, 
    highlight 
}: { 
    icon: React.ReactNode; 
    value: string; 
    label: string; 
    highlight?: boolean;
}) {
    return (
        <div className={`px-4 py-2 rounded-full border ${
            highlight 
                ? 'bg-cedra-500/10 border-cedra-500/30 text-cedra-400' 
                : 'bg-zinc-900/50 border-white/10 text-zinc-400'
        } backdrop-blur-sm flex items-center gap-2`}>
            <span className={highlight ? 'text-cedra-500' : 'text-zinc-500'}>{icon}</span>
            <span className="font-bold text-sm">{value}</span>
            <span className="text-xs opacity-60">{label}</span>
        </div>
    );
}

function QuickAction({ 
    icon, 
    label, 
    href, 
    description,
    badge 
}: { 
    icon: string; 
    label: string; 
    href: string; 
    description: string;
    badge?: string;
}) {
    return (
        <a
            href={href}
            className="group relative px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:bg-zinc-900 hover:border-cedra-500/50 transition-all backdrop-blur-sm overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cedra-500/0 via-cedra-500/5 to-cedra-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-cedra-400 transition-colors">{label}</span>
                        {badge && (
                            <Badge className="bg-cedra-500 text-white text-[9px] px-1.5 py-0">
                                {badge}
                            </Badge>
                        )}
                    </div>
                    <span className="text-xs text-zinc-500">{description}</span>
                </div>
            </div>
        </a>
    );
}
