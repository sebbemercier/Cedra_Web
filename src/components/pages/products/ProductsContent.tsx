"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/pages/products/ProductCard";
import {
  Search,
  LayoutGrid,
  List,
  Zap,
  PackageX,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function ProductsContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await api.recommendations.getTrending();
        if (Array.isArray(data)) {
          setTrendingProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setTrendingProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch trending products", error);
      }
    };
    fetchTrending();
  }, []);

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
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-cedra-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">
              <span className="w-8 h-[1px] bg-cedra-500"></span>
              <span>Professional Inventory</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-display tracking-tighter italic uppercase text-white leading-[0.85]">
              {t.catalog.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-white to-cedra-600 animate-gradient">
                {t.catalog.titleAccent}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex bg-zinc-900/40 backdrop-blur-3xl p-1.5 rounded-2xl border border-white/5"
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"}`}
            >
              <List size={20} />
            </button>
          </motion.div>
        </header>

        {/* Search & Stats Bar */}
        <div className="mb-16 space-y-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearchSubmit}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cedra-500/20 via-red-500/20 to-cedra-500/20 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-700"></div>
            <div className="relative flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cedra-500 transition-colors"
                  size={24}
                />
                <input
                  type="text"
                  placeholder={t.catalog.searchPlaceholder}
                  className="w-full bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] py-6 pl-16 pr-14 text-white focus:outline-none focus:border-cedra-500/50 transition-all font-bold text-lg placeholder:text-zinc-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-white text-black hover:bg-cedra-500 hover:text-white h-18 md:h-auto px-12 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl"
              >
                Filtrer le stock
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 px-4"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-cedra-500 animate-pulse"></div>
                {isLoading
                  ? "Synchronisation en cours..."
                  : "Réseau Stock : Connecté"}
              </div>
              <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                {products.length} ARTICLES DISPONIBLES
              </div>
            </div>

            <div className="flex gap-2">
              {["Protection", "Câbles", "Outillage"].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-cedra-500"
            >
              <Zap size={64} className="fill-current" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 animate-pulse">
              Chargement de l&apos;inventaire
            </span>
          </div>
        ) : products.length > 0 ? (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard
                  id={product.id}
                  name={
                    typeof product.name === "string"
                      ? product.name
                      : (product.name as any)?.en || "Product"
                  }
                  price={product.price}
                  category={product.category_id || "Général"}
                  sku={product.sku}
                  image={product.images?.[0]}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center bg-zinc-950/40 rounded-[4rem] border border-white/5 backdrop-blur-3xl shadow-2xl flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 text-zinc-800">
              <PackageX size={48} />
            </div>
            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4 font-display">
              Aucun résultat
            </h3>
            <p className="text-zinc-500 max-w-sm mx-auto font-medium text-lg leading-tight">
              L&apos;article &quot;{searchQuery}&quot; n&apos;est pas dans notre inventaire actuel.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-8 rounded-2xl border-white/10 text-[10px] font-black uppercase tracking-widest px-10 h-14"
            >
              Réinitialiser
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
