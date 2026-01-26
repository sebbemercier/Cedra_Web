"use client";

import React, { useRef, useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Star,
  TrendingUp,
  ShoppingCart,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { Skeleton } from "@/components/ui/skeleton";

// Hoist products array outside component to prevent recreation on every render (rendering-hoist-jsx)
const getProducts = (t: any) => [
  {
    id: 1,
    name: "Disjoncteur MCB 32A",
    series: "Type B • Rail Din",
    price: 24.99,
    oldPrice: 32.99,
    stock: t.bestSellers.inStock,
    stockCount: 156,
    badge: t.bestSellers.bestSeller,
    badgeVariant: "bestseller" as const,
    rating: 4.8,
    reviews: 243,
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",
  },
  {
    id: 2,
    name: "Panneau LED 60x60 40W",
    series: "6500K • Commercial",
    price: 45.5,
    stock: t.bestSellers.lowStock,
    stockCount: 8,
    badge: null,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80",
  },
  {
    id: 3,
    name: "Câble Cat6 UTP 305m",
    series: "Cuivre massif • Bleu",
    price: 89.99,
    stock: t.bestSellers.inStock,
    stockCount: 45,
    badge: t.bestSellers.popular,
    badgeVariant: "hot" as const,
    rating: 4.9,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010dbae831?w=400&q=80",
  },
  {
    id: 4,
    name: "Différentiel 40A 30mA Type A",
    series: "2P • 10kA",
    price: 67.0,
    stock: t.bestSellers.inStock,
    stockCount: 92,
    badge: null,
    rating: 4.7,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
  },
  {
    id: 5,
    name: "Boîte de jonction IP65",
    series: "190x140x70mm • Gris",
    price: 12.75,
    stock: t.bestSellers.inStock,
    stockCount: 234,
    badge: null,
    rating: 4.5,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
  },
  {
    id: 6,
    name: "Prise modulaire 2P+T",
    series: "16A • Blanc",
    price: 8.99,
    stock: t.bestSellers.inStock,
    stockCount: 412,
    badge: t.promo.new,
    badgeVariant: "new" as const,
    rating: 4.4,
    reviews: 34,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
];

const ProductCard = memo(function ProductCard({
  product,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
  t,
}: {
  product: any;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  t: any;
}) {
  const badgeStyles = {
    bestseller:
      "bg-gradient-to-r from-cedra-500 to-cedra-600 text-white shadow-lg shadow-cedra-500/25",
    hot: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25",
    new: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25",
  };

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="min-w-[320px] bg-linear-to-brr from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-cedra-500/50 hover:shadow-2xl hover:shadow-cedra-500/10 transition-all cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-linear-to-brr from-cedra-500/0 via-cedra-500/0 to-cedra-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        {product.badge && (
          <Badge
            className={cn(
              "text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider",
              badgeStyles[product.badgeVariant as keyof typeof badgeStyles] ||
                "bg-zinc-700 text-white",
            )}
          >
            {product.badge}
          </Badge>
        )}
        {discountPercentage && (
          <Badge className="bg-red-500 text-white text-[9px] px-2 py-0.5 font-black">
            -{discountPercentage}%
          </Badge>
        )}
      </div>
      <div className="aspect-4/3 bg-black rounded-xl mb-4 relative overflow-hidden group/image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover opacity-70 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-500"
          unoptimized
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:border-white/40 transition-all">
                <Eye size={18} />
              </div>
              <div className="w-12 h-12 rounded-full bg-cedra-500 hover:bg-cedra-600 flex items-center justify-center text-white shadow-lg shadow-cedra-500/50 transition-all">
                <ShoppingCart size={18} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative z-10">
        <h4 className="font-bold text-white mb-1 group-hover:text-cedra-400 transition-colors line-clamp-1">
          {product.name}
        </h4>
        <p className="text-zinc-400 text-xs mb-3 line-clamp-1">
          {product.series}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={cn(
                  "transition-colors",
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-700",
                )}
              />
            ))}
          </div>
          <span className="text-zinc-400 text-[10px]">
            {product.rating} ({product.reviews} {t.bestSellers.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between mb-4 p-2 bg-zinc-900/50 rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                product.stock === t.bestSellers.inStock
                  ? "bg-green-500 animate-pulse"
                  : "bg-amber-500",
              )}
            ></div>
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                product.stock === t.bestSellers.inStock
                  ? "text-green-500"
                  : "text-amber-500",
              )}
            >
              {product.stock}
            </span>
          </div>
          <span className="text-zinc-500 text-[10px]">
            {product.stockCount} {t.bestSellers.units}
          </span>
        </div>
        <div className="flex items-end justify-between pt-4 border-t border-white/5">
          <div>
            <div className="text-zinc-400 text-[10px] uppercase tracking-wider mb-0.5">
              {t.bestSellers.price}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-mono font-bold text-xl">
                {product.price}€
              </span>
              {product.oldPrice && (
                <span className="text-zinc-500 font-mono text-sm line-through">
                  {product.oldPrice}€
                </span>
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-cedra-500 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-lg">
            <Plus size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function BestSellersCarousel() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const products = getProducts(t);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Logic for active index if needed
    };

    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={20} className="text-cedra-500" />
              <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                {t.bestSellers.title}
              </h3>
            </div>
            <p className="text-zinc-400 text-sm flex items-center gap-2">
              {t.bestSellers.subtitle}
              <Badge className="bg-zinc-800 text-zinc-300 text-[9px] px-2 py-0.5">
                6 {t.bestSellers.products}
              </Badge>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="bg-zinc-900 border-white/10 hover:bg-zinc-800 hover:border-cedra-500/50 hover:scale-110 transition-all"
              aria-label={t.bestSellers.scrollLeft}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="bg-zinc-900 border-white/10 hover:bg-zinc-800 hover:border-cedra-500/50 hover:scale-110 transition-all"
              aria-label={t.bestSellers.scrollRight}
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          <Link
            href="/products"
            className="text-cedra-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 group"
          >
            {t.bestSellers.viewAll}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-6 scrollbar-hide scroll-smooth px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isHovered={hoveredId === product.id}
                  onHover={() => setHoveredId(product.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => router.push(`/products/${product.id}`)}
                  t={t}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="min-w-[320px] bg-white/2 border border-white/5 rounded-2xl p-5 space-y-4">
      <Skeleton className="aspect-4/3 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2 opacity-50" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-4" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="flex justify-between items-end pt-2">
        <div className="space-y-1">
          <Skeleton className="h-2 w-8" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-11 w-11 rounded-full" />
      </div>
    </div>
  );
}