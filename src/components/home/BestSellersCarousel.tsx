"use client";

import React, { useRef, useState } from "react";
import { 
    ArrowRight, 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Star,
    TrendingUp,
    ShoppingCart,
    Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BestSellersCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // Mock products with enhanced data
    const products = [
        { 
            id: 1, 
            name: "MCB Circuit Breaker 32A", 
            series: "Type B • Din Rail", 
            price: 24.99, 
            oldPrice: 32.99,
            stock: "In Stock", 
            stockCount: 156,
            badge: "Best Seller",
            badgeVariant: "bestseller" as const,
            rating: 4.8,
            reviews: 243,
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80"
        },
        { 
            id: 2, 
            name: "LED Panel 60x60 40W", 
            series: "6500K • Commercial", 
            price: 45.50, 
            stock: "Low Stock", 
            stockCount: 8,
            badge: null,
            rating: 4.6,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80"
        },
        { 
            id: 3, 
            name: "Cat6 UTP Cable 305m", 
            series: "Solid Copper • Blue", 
            price: 89.99, 
            stock: "In Stock", 
            stockCount: 45,
            badge: "🔥 Hot",
            badgeVariant: "hot" as const,
            rating: 4.9,
            reviews: 512,
            image: "https://images.unsplash.com/photo-1558494949-ef010dbae831?w=400&q=80"
        },
        { 
            id: 4, 
            name: "RCD 40A 30mA Type A", 
            series: "2P • 10kA", 
            price: 67.00, 
            stock: "In Stock", 
            stockCount: 92,
            badge: null,
            rating: 4.7,
            reviews: 167,
            image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80"
        },
        { 
            id: 5, 
            name: "Junction Box IP65", 
            series: "190x140x70mm • Grey", 
            price: 12.75, 
            stock: "In Stock", 
            stockCount: 234,
            badge: null,
            rating: 4.5,
            reviews: 78,
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80"
        },
        { 
            id: 6, 
            name: "Modular Socket 2P+E", 
            series: "16A • White", 
            price: 8.99, 
            stock: "In Stock", 
            stockCount: 412,
            badge: "✨ New",
            badgeVariant: "new" as const,
            rating: 4.4,
            reviews: 34,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
        }
    ];

    return (
        <div className="relative">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={20} className="text-cedra-500" />
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                                Best Sellers
                            </h3>
                        </div>
                        <p className="text-zinc-500 text-sm flex items-center gap-2">
                            Top-rated products from professional contractors
                            <Badge className="bg-zinc-800 text-zinc-400 text-[9px] px-2 py-0.5">
                                6 Products
                            </Badge>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="bg-zinc-900 border-white/10 hover:bg-zinc-800 hover:border-cedra-500/50 hover:scale-110 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="bg-zinc-900 border-white/10 hover:bg-zinc-800 hover:border-cedra-500/50 hover:scale-110 transition-all"
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>

                    <Link
                        href="/products"
                        className="text-cedra-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 group"
                    >
                        View All
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Enhanced Carousel */}
            <div className="relative">
                {/* Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide scroll-smooth px-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            isHovered={hoveredId === product.id}
                            onHover={() => setHoveredId(product.id)}
                            onLeave={() => setHoveredId(null)}
                            onClick={() => router.push(`/products/${product.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Enhanced Product Card Component
function ProductCard({
    product,
    index,
    isHovered,
    onHover,
    onLeave,
    onClick
}: {
    product: any;
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    onClick: () => void;
}) {
    const badgeStyles = {
        bestseller: "bg-gradient-to-r from-cedra-500 to-cedra-600 text-white shadow-lg shadow-cedra-500/25",
        hot: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25",
        new: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
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
            className="min-w-[320px] bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-5 hover:border-cedra-500/50 hover:shadow-2xl hover:shadow-cedra-500/10 transition-all cursor-pointer group relative overflow-hidden"
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cedra-500/0 via-cedra-500/0 to-cedra-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Badges Container */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                {product.badge && (
                    <Badge className={cn(
                        "text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider",
                        badgeStyles[product.badgeVariant as keyof typeof badgeStyles] || "bg-zinc-700 text-white"
                    )}>
                        {product.badge}
                    </Badge>
                )}
                {discountPercentage && (
                    <Badge className="bg-red-500 text-white text-[9px] px-2 py-0.5 font-black">
                        -{discountPercentage}%
                    </Badge>
                )}
            </div>

            {/* Image with overlay actions */}
            <div className="aspect-[4/3] bg-black rounded-xl mb-4 relative overflow-hidden group/image">
                {product.image ? (
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover opacity-70 group-hover/image:opacity-100 group-hover/image:scale-110 transition-all duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 group-hover/image:from-cedra-500/10 transition-all"></div>
                )}
                
                {/* Quick Action Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                        >
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ delay: 0.1 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:border-white/40 transition-all"
                            >
                                <Eye size={18} />
                            </motion.button>
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ delay: 0.15 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Add to cart logic
                                }}
                                className="w-12 h-12 rounded-full bg-cedra-500 hover:bg-cedra-600 flex items-center justify-center text-white shadow-lg shadow-cedra-500/50 transition-all"
                            >
                                <ShoppingCart size={18} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Product Info */}
            <div className="relative z-10">
                <h4 className="font-bold text-white mb-1 group-hover:text-cedra-400 transition-colors line-clamp-1">
                    {product.name}
                </h4>
                <p className="text-zinc-500 text-xs mb-3 line-clamp-1">{product.series}</p>

                {/* Rating */}
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
                                        : "text-zinc-700"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-zinc-500 text-[10px]">
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-between mb-4 p-2 bg-zinc-900/50 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            product.stock === "In Stock" ? "bg-green-500 animate-pulse" : "bg-amber-500"
                        )}></div>
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-wider",
                            product.stock === "In Stock" ? "text-green-500" : "text-amber-500"
                        )}>
                            {product.stock}
                        </span>
                    </div>
                    <span className="text-zinc-600 text-[10px]">
                        {product.stockCount} units
                    </span>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between pt-4 border-t border-white/5">
                    <div>
                        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-0.5">Price</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white font-mono font-bold text-xl">€{product.price}</span>
                            {product.oldPrice && (
                                <span className="text-zinc-600 font-mono text-sm line-through">€{product.oldPrice}</span>
                            )}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic
                        }}
                        className="w-11 h-11 rounded-full bg-zinc-800 hover:bg-cedra-500 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-lg"
                    >
                        <Plus size={20} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
