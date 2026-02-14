"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Zap, Loader2, Package, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Product, ForecastResponse } from "@/types";
import { useTranslation } from "@/lib/i18n";

interface ProductContentProps {
    initialProduct: Product | null;
}

export default function ProductContent({ initialProduct }: ProductContentProps) {
    const { t } = useTranslation();
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(initialProduct);
    const [loading, setLoading] = useState(!initialProduct);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShared, setIsShared] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            try {
                // If we don't have initialProduct, fetch it (fallback)
                let currentProduct = product;
                if (!currentProduct) {
                    const results = await api.products.search(id as string);
                    currentProduct = results.find(p => p.id === id) || results[0] || null;
                    setProduct(currentProduct);
                }

                if (currentProduct) {
                    const token = localStorage.getItem("token");
                    if (token) {
                        try {
                            // Parallelize auth and forecast fetches (async-parallel)
                            const userPromise = api.auth.me(token);
                            const forecastPromise = api.ai.getForecast(token, currentProduct.id);
                            
                            const [user, forecastData] = await Promise.all([
                                userPromise.catch(() => null),
                                forecastPromise.catch(() => null)
                            ]);

                            if (user && (user.role === 'admin' || user.role === 'company_admin')) {
                                setIsAdmin(true);
                                setForecast(forecastData);
                            }
                        } catch (e) { 
                            console.log("Secondary data fetch failed", e); 
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, product]);

    const handleShare = () => {
        if (typeof window === 'undefined') return;
        navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
    };

    if (loading) return <div className="min-h-screen bg-background flex justify-center items-center text-cedra-500"><Loader2 className="animate-spin" /></div>;
    if (!product) return <div className="min-h-screen bg-background flex justify-center items-center text-white">Product not found</div>;

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/products/" + product.id);
            return;
        }
        try {
            await api.cart.addItem(token, {
                product_id: product.id,
                quantity: 1
            });
            alert("Added to cart!");
        } catch (e) {
            alert("Failed to add to cart");
        }
    };

        return (

            <div className="min-h-screen pt-32 pb-24 bg-background overflow-hidden relative">

                {/* Background elements */}

                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none -mr-64 -mt-32 animate-pulse"></div>

                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -ml-64 -mb-32 animate-pulse" style={{ animationDelay: '2s' }}></div>

    

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                    {/* Breadcrumb style top info */}

                    <motion.div 

                        initial={{ opacity: 0, x: -20 }}

                        animate={{ opacity: 1, x: 0 }}

                        className="flex items-center justify-between mb-8"

                    >

                        <div className="flex items-center gap-4">

                            <Link href="/products" className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">

                                Catalogue

                            </Link>

                            <span className="text-white/10">/</span>

                            <span className="text-cedra-500 text-[10px] font-black uppercase tracking-[0.2em]">

                                {product.category_id || "Industrial"}

                            </span>

                        </div>

                        

                        <Button 

                            variant="ghost" 

                            size="sm" 

                            onClick={handleShare}

                            className="text-zinc-500 hover:text-white border border-white/5 hover:border-white/10 rounded-xl px-4 flex items-center gap-2 transition-all"

                        >

                            {isShared ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}

                            <span className="text-[9px] font-black uppercase tracking-widest">{isShared ? "Copié !" : "Partager"}</span>

                        </Button>

                    </motion.div>

    

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">

                        {/* Image Section */}

                        <motion.div 

                            initial={{ opacity: 0, scale: 0.95 }}

                            animate={{ opacity: 1, scale: 1 }}

                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}

                            className="space-y-6"

                        >

                            <div className="aspect-square bg-zinc-900/40 rounded-[3rem] border border-white/5 flex items-center justify-center p-12 md:p-20 group relative overflow-hidden backdrop-blur-3xl shadow-2xl">

                                <div className="absolute inset-0 bg-gradient-to-br from-cedra-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {product.images && product.images.length > 0 ? (

                                    <Image 

                                        src={product.images[0]} 

                                        alt={product.name} 

                                        fill

                                        className="object-contain p-12 md:p-20 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105" 

                                    />

                                ) : (

                                    <div className="text-white/5 uppercase font-black text-4xl tracking-tighter opacity-10 select-none">No Image</div>

                                )}

                            </div>

                            

                            <div className="grid grid-cols-4 gap-4">

                               {[1,2,3,4].map((i) => (

                                 <div key={i} className="aspect-square rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-cedra-500/50 transition-all cursor-pointer opacity-40 hover:opacity-100 flex items-center justify-center p-4">

                                   <Package className="text-zinc-700" size={24} />

                                 </div>

                               ))}

                            </div>

                        </motion.div>

    

                        {/* Info Section */}

                        <div className="flex flex-col pt-4">

                            <motion.div 

                                initial={{ opacity: 0, y: 20 }}

                                animate={{ opacity: 1, y: 0 }}

                                transition={{ delay: 0.2 }}

                                className="mb-8"

                            >

                                <div className="flex items-center justify-between mb-4">

                                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md">

                                        REF: {product.sku}

                                    </span>

                                    <Badge className="bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-widest px-3">

                                        En Stock

                                    </Badge>

                                </div>

                                <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none font-display">

                                    {product.name}

                                </h1>

                                <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-xl">

                                    {product.description?.substring(0, 150)}...

                                </p>

                            </motion.div>

    

                            <motion.div 

                                initial={{ opacity: 0, y: 20 }}

                                animate={{ opacity: 1, y: 0 }}

                                transition={{ delay: 0.3 }}

                                className="bg-zinc-900/30 p-8 md:p-10 rounded-[2.5rem] border border-white/10 mb-10 relative overflow-hidden group backdrop-blur-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]"

                            >

                                <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                                

                                <div className="flex flex-col md:flex-row items-baseline md:items-end justify-between gap-6 mb-10">

                                    <div>

                                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">{t.productDetail.unitPrice}</div>

                                        <div className="flex items-baseline gap-2">

                                            <span className="text-6xl font-black text-white tracking-tighter">

                                                {product.price}

                                            </span>

                                            <span className="text-2xl font-black text-cedra-500 italic uppercase">

                                                {product.currency} <span className="text-xs text-zinc-500 not-italic ml-1">HTVA</span>

                                            </span>

                                        </div>

                                    </div>

    

                                    {isAdmin && forecast && (

                                        <div className="bg-cedra-500/10 border border-cedra-500/30 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-1000">

                                            <div className="w-10 h-10 bg-cedra-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(230,0,35,0.4)]">

                                                <Zap size={20} className="text-white fill-white" />

                                            </div>

                                            <div>

                                                <div className="text-[9px] font-black text-cedra-500 uppercase tracking-widest">IA CEDRA PREDICT</div>

                                                <div className="text-white font-bold text-sm">

                                                    {forecast.forecast_next_30_days} <span className="opacity-60">{t.bestSellers.units} demandées</span>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                </div>

    

                                <div className="flex flex-col md:flex-row gap-4">

                                    <Button

                                        size="lg"

                                        className="flex-1 rounded-2xl bg-white text-black hover:bg-cedra-500 hover:text-white font-black uppercase tracking-widest text-xs h-16 shadow-xl transition-all duration-300"

                                        onClick={handleAddToCart}

                                        disabled={product.inventory_count <= 0}

                                    >

                                        {t.productDetail.addToProject}

                                    </Button>

                                    <Button variant="outline" size="lg" className="h-16 w-16 md:w-20 rounded-2xl border-white/10 hover:bg-white/5 text-white flex-shrink-0">

                                        <ShieldCheck size={24} />

                                    </Button>

                                </div>

                            </motion.div>

    

                            <motion.div 

                                initial={{ opacity: 0, y: 20 }}

                                animate={{ opacity: 1, y: 0 }}

                                transition={{ delay: 0.4 }}

                                className="grid grid-cols-2 gap-4 mb-12"

                            >

                                <Benefit icon={<Truck size={18} />} text={t.productDetail.secureShipping} />

                                <Benefit icon={<RotateCcw size={18} />} text={t.productDetail.warrantyIncluded} />

                            </motion.div>

                        </div>

                    </div>

    

                    {/* Technical Tabs / Description */}

                    <motion.div 

                        initial={{ opacity: 0, y: 40 }}

                        whileInView={{ opacity: 1, y: 0 }}

                        viewport={{ once: true }}

                        className="max-w-4xl bg-zinc-900/20 p-10 md:p-16 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden"

                    >

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cedra-500 via-transparent to-transparent"></div>

                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8 font-display">{t.productDetail.description}</h3>

                        <div className="text-zinc-400 text-lg leading-relaxed font-medium space-y-6">

                            <p>{product.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">

                                <TechSpec label="Tension nominale" value="230V / 400V" />

                                <TechSpec label="Fréquence" value="50/60 Hz" />

                                <TechSpec label="Protection" value="IP65" />

                                <TechSpec label="Matériau" value="Thermoplastique haute résistance" />

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        );

    }

    

    function Benefit({ icon, text }: { icon: React.ReactNode, text: string }) {

        return (

            <div className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-[1.25rem] border border-white/5 group hover:bg-white/[0.05] transition-all">

                <div className="text-cedra-500 group-hover:scale-110 transition-transform">{icon}</div>

                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors">{text}</span>

            </div>

        );

    }

    

    function TechSpec({ label, value }: { label: string, value: string }) {

        return (

            <div className="flex flex-col gap-1 border-l-2 border-cedra-500 pl-4 py-1">

                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>

                <span className="text-white font-bold">{value}</span>

            </div>

        );

    }

    

    function TechSpecOld({ label, value }: { label: string, value: string }) {

        return (

            <div className="flex flex-col gap-1 border-l-2 border-cedra-500 pl-4 py-1">

                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>

                <span className="text-white font-bold">{value}</span>

            </div>

        );

    }

    