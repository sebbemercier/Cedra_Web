"use client";

import React, { useEffect, useState, Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Search, LayoutGrid, List, Loader2, PackageX } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { useTranslation } from "@/lib/i18n";

export default function ProductsPage() {
    const { t } = useTranslation();
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-cedra-500"><Loader2 className="animate-spin" /></div>}>
            <ProductList t={t} />
        </Suspense>
    );
}

function ProductList({ t }: { t: any }) {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    useEffect(() => {
        fetchProducts(searchQuery);
    }, [searchQuery]);

    const fetchProducts = async (query: string) => {
        setIsLoading(true);
        try {
            const data = await api.products.search(query);
            setProducts(data || []);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts(searchQuery);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
                            {t.catalog.title} <span className="text-cedra-500">{t.catalog.titleAccent}</span>
                        </h1>
                        <p className="text-white/50 text-sm mt-2 font-medium">{t.catalog.subtitle}</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white"}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </header>

                {/* Inventory Control Bar */}
                <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 mb-10">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cedra-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={t.catalog.searchPlaceholder}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-cedra-500/50 transition-all font-medium placeholder:text-white/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="px-8 bg-cedra-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cedra-600 transition-colors">
                        {t.hero.searchButton}
                    </button>
                </form>

                {/* Results Counter */}
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest">
                        {isLoading ? t.catalog.syncing : `${t.bestSellers.popular} ${products.length} ${t.catalog.found}`}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-wider">
                        <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                        {t.promo.inventory} Status
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="py-40 flex justify-center">
                        <Loader2 className="text-cedra-500 animate-spin" size={48} />
                    </div>
                ) : products.length > 0 ? (
                    <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    category={product.category_id || "General"}
                                    sku={product.sku}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                        <PackageX className="mx-auto mb-6 text-white/10" size={64} />
                        <h3 className="text-2xl font-bold mb-2 text-white">{t.catalog.noInventory}</h3>
                        <p className="text-white/40 max-w-sm mx-auto text-sm">{t.catalog.trySearch} "{searchQuery}".</p>
                    </div>
                )}
            </div>
        </div>
    );
}