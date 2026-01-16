"use client";

import React, { useEffect, useState, Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Search, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List, Loader2, PackageX } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-red-600"><Loader2 className="animate-spin" /></div>}>
            <ProductList />
        </Suspense>
    );
}

function ProductList() {
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
            // Using the new API endpoint: GET /products/search?q=...
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
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
                            Master <span className="text-red-600">Catalog</span>
                        </h1>
                        <p className="text-white/50 text-sm mt-2 font-medium">Real-time inventory via Cedra Backend API.</p>
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
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by SKU, Name, or Description (e.g. 'Server Rack')"
                            className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all font-medium placeholder:text-white/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="px-8 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-colors">
                        Search
                    </button>
                </form>

                {/* Results Counter */}
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="text-xs text-white/40 font-bold uppercase tracking-widest">
                        {isLoading ? "Syncing with API..." : `Found ${products.length} units available`}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-wider">
                        <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                        Inventory Status
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="py-40 flex justify-center">
                        <Loader2 className="text-red-600 animate-spin" size={48} />
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
                                    category={product.category_id || "General"} // Fallback as category is just ID in type for now
                                    sku={product.sku}
                                // Assuming Card component might need update to handle new Image array, or just take the first one
                                // passing basic props that match existing component for now to avoid breaking UI component
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <PackageX className="mx-auto mb-6 text-white/10" size={64} />
                        <h3 className="text-2xl font-bold mb-2 text-white">No Inventory Found</h3>
                        <p className="text-white/40 max-w-sm mx-auto text-sm">We couldn't locate any items matching "{searchQuery}". Try searching for 'Server', 'Cable', or 'Switch'.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
