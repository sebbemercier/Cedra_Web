"use client";

import React from "react";
import { 
    ChevronRight, 
    Package, 
    BarChart3, 
    Zap, 
    Tag, 
    TrendingUp,
    Clock,
    Sparkles,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function PromoGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {/* Professional Card - Enhanced */}
            <motion.div variants={itemVariants}>
                <PromoCard
                    title="Trade Account"
                    subtitle="For Professionals"
                    cta="Join Network"
                    href="/register-pro"
                    badge="Exclusive"
                    badgeVariant="premium"
                    gradient="from-cedra-500/10 via-cedra-500/5 to-transparent"
                >
                    <div className="flex flex-col gap-4 h-full justify-between">
                        <ul className="text-zinc-400 text-sm space-y-3">
                            <BulletPoint icon="💰">VAT-exclusive pricing</BulletPoint>
                            <BulletPoint icon="📅">Net-30 payment terms</BulletPoint>
                            <BulletPoint icon="🔌">API access & bulk discounts</BulletPoint>
                            <BulletPoint icon="🎯">Dedicated account manager</BulletPoint>
                        </ul>
                        <div className="grid grid-cols-2 gap-2">
                            <IconBox icon={<Package size={18} />} label="Inventory" />
                            <IconBox icon={<BarChart3 size={18} />} label="Analytics" />
                        </div>
                        <div className="mt-2 p-3 bg-cedra-500/5 border border-cedra-500/20 rounded-lg">
                            <div className="flex items-center gap-2 text-cedra-400 text-xs font-bold">
                                <TrendingUp size={12} />
                                <span>Save up to 25% on average</span>
                            </div>
                        </div>
                    </div>
                </PromoCard>
            </motion.div>

            {/* Flash Deals - Enhanced */}
            <motion.div variants={itemVariants}>
                <PromoCard
                    title="Flash Deals"
                    subtitle="Limited Time"
                    cta="View Offers"
                    href="/products?filter=sale"
                    badge="🔥 Hot"
                    badgeVariant="hot"
                    gradient="from-red-500/10 via-red-500/5 to-transparent"
                >
                    <div className="h-full bg-gradient-to-br from-red-600/20 to-transparent rounded-xl flex flex-col items-center justify-center border border-red-500/20 relative overflow-hidden group/flash p-6">
                        {/* Animated glow */}
                        <motion.div
                            className="absolute inset-0 bg-red-500/10 blur-2xl"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        <div className="text-center relative z-10">
                            <div className="flex items-baseline justify-center gap-2 mb-2">
                                <span className="text-6xl font-black text-white italic">-40</span>
                                <span className="text-3xl font-black text-red-400">%</span>
                            </div>
                            <div className="text-xs uppercase tracking-widest text-red-400 font-bold flex items-center justify-center gap-1 mb-3">
                                <Zap size={12} className="animate-pulse" />
                                On Select Items
                            </div>
                            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                <Clock size={10} />
                                Ends in 2d 14h
                            </div>
                        </div>
                    </div>
                </PromoCard>
            </motion.div>

            {/* New Arrivals - Enhanced */}
            <motion.div variants={itemVariants}>
                <PromoCard
                    title="New Arrivals"
                    subtitle="Latest Stock"
                    cta="Browse Catalog"
                    href="/products?sort=newest"
                    badge="✨ New"
                    badgeVariant="new"
                >
                    <div className="flex flex-col gap-3 h-full">
                        <div className="grid grid-cols-2 gap-2 flex-1">
                            <ProductThumb 
                                name="Server Rack" 
                                img="https://images.unsplash.com/photo-1558494949-ef010dbae831?w=400&q=80"
                                newLabel 
                            />
                            <ProductThumb 
                                name="Network Switch" 
                                img="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80"
                                newLabel 
                            />
                            <ProductThumb 
                                name="Power Unit" 
                                img="https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80" 
                            />
                            <ProductThumb 
                                name="Fiber Cable" 
                                img="https://images.unsplash.com/photo-1542382257-80dedb725088?w=400&q=80" 
                            />
                        </div>
                        <div className="text-center text-[10px] text-zinc-500">
                            <Sparkles size={10} className="inline mr-1" />
                            156 items added this week
                        </div>
                    </div>
                </PromoCard>
            </motion.div>

            {/* Outlet - Enhanced */}
            <motion.div variants={itemVariants}>
                <PromoCard
                    title="Clearance"
                    subtitle="Outlet Sale"
                    cta="Shop Now"
                    href="/products?category=outlet"
                    badge="💎 Save Big"
                    badgeVariant="outlet"
                    gradient="from-amber-500/10 via-amber-500/5 to-transparent"
                >
                    <div className="h-full flex flex-col justify-center items-center text-center bg-zinc-900/50 border border-amber-500/10 rounded-xl p-6 relative overflow-hidden group/outlet">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/outlet:opacity-100 transition-opacity"></div>
                        
                        <div className="relative z-10">
                            <Tag size={48} className="text-amber-500/50 mb-4 mx-auto" />
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                End-of-line industrial components
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full">
                                <span className="text-amber-400 font-black text-lg">up to 70%</span>
                                <span className="text-amber-500/60 text-xs">OFF</span>
                            </div>
                        </div>
                    </div>
                </PromoCard>
            </motion.div>
        </motion.div>
    );
}

// Enhanced Sub-components

function PromoCard({
    title,
    subtitle,
    cta,
    href,
    children,
    badge,
    badgeVariant = "default",
    gradient = "from-zinc-800/50 to-transparent"
}: {
    title: string;
    subtitle?: string;
    cta: string;
    href: string;
    children: React.ReactNode;
    badge?: string;
    badgeVariant?: "default" | "premium" | "hot" | "new" | "outlet";
    gradient?: string;
}) {
    const badgeStyles = {
        default: "bg-zinc-700 text-white",
        premium: "bg-gradient-to-r from-cedra-500 to-cedra-600 text-white shadow-lg shadow-cedra-500/25",
        hot: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25 animate-pulse",
        new: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25",
        outlet: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/25"
    };

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col gap-4 min-h-[400px] hover:border-cedra-500/30 hover:shadow-2xl hover:shadow-cedra-500/10 transition-all group relative overflow-hidden`}
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cedra-500/0 via-cedra-500/0 to-cedra-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-start justify-between relative z-10">
                <div>
                    {subtitle && (
                        <div className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] font-bold mb-1.5 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-cedra-500 animate-pulse"></div>
                            {subtitle}
                        </div>
                    )}
                    <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
                </div>
                {badge && (
                    <Badge className={`${badgeStyles[badgeVariant]} text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider`}>
                        {badge}
                    </Badge>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative z-10">
                {children}
            </div>

            {/* CTA with arrow animation */}
            <Link
                href={href}
                className="relative z-10 text-cedra-400 text-xs font-bold uppercase tracking-[0.15em] hover:text-white transition-colors flex items-center gap-2 group/link"
            >
                <span className="group-hover/link:translate-x-1 transition-transform inline-block">
                    {cta}
                </span>
                <ArrowUpRight 
                    size={14} 
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" 
                />
            </Link>
        </motion.div>
    );
}

function IconBox({ icon, label }: { icon: React.ReactNode; label?: string }) {
    return (
        <div className="aspect-square bg-zinc-900/80 rounded-xl border border-white/5 flex flex-col items-center justify-center text-zinc-600 hover:text-cedra-500 hover:bg-zinc-900 hover:border-cedra-500/30 transition-all cursor-pointer group/icon relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cedra-500/0 to-cedra-500/10 opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
            <div className="relative z-10 transform group-hover/icon:scale-110 transition-transform">
                {icon}
            </div>
            {label && (
                <span className="relative z-10 text-[9px] font-bold uppercase tracking-wider mt-1.5 opacity-0 group-hover/icon:opacity-60 transition-opacity">
                    {label}
                </span>
            )}
        </div>
    );
}

function ProductThumb({ 
    name, 
    img, 
    newLabel 
}: { 
    name: string; 
    img: string; 
    newLabel?: boolean;
}) {
    return (
        <div className="bg-black rounded-lg overflow-hidden border border-white/5 group/thumb cursor-pointer relative transform hover:scale-105 transition-all duration-300">
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover aspect-square opacity-60 group-hover/thumb:opacity-100 group-hover/thumb:scale-110 transition-all duration-500"
            />
            {newLabel && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg">
                    New
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 flex items-end p-3">
                <div className="transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-[11px] font-bold block mb-0.5">{name}</span>
                    <span className="text-cedra-400 text-[9px] uppercase tracking-wider flex items-center gap-1">
                        View <ChevronRight size={10} />
                    </span>
                </div>
            </div>
        </div>
    );
}

function BulletPoint({ icon, children }: { icon: string; children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-2.5 group/bullet">
            <span className="text-base group-hover/bullet:scale-110 transition-transform">{icon}</span>
            <span className="group-hover/bullet:text-zinc-300 transition-colors">{children}</span>
        </li>
    );
}
