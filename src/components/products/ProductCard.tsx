"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Star, Box, CheckCircle2, ShoppingBag, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    sku?: string;
    stock?: number;
    image?: string;
}

import React, { memo } from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Star, Box, CheckCircle2, ShoppingBag, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    sku?: string;
    stock?: number;
    image?: string;
}

const ProductCard = memo(function ProductCard({ id, name, price, category, sku, stock, image }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id,
            name,
            price,
            description: "",
            sku: sku || `SKU-CD-${id}`,
            currency: "EUR",
            category_id: category,
            inventory_count: stock || 100,
            images: image ? [image] : []
        });
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group relative bg-[#0a0a0a] rounded border border-white/5 hover:border-red-600/50 transition-all duration-300"
        >
            {/* Category & Status */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded border border-white/10">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">{category}</span>
                </div>
            </div>

            {/* Product Image Area */}
            <div className="aspect-square bg-zinc-950 relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-zinc-900 transition-colors">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/5 gap-2">
                        <ShoppingBag size={64} strokeWidth={1} />
                    </div>
                )}

                {/* Quick view button (subtle) */}
                <button className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded border border-white/10 text-white/20 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                    <Eye size={14} />
                </button>
            </div>

            {/* Product Info - Red/Black High Contrast */}
            <div className="p-4 border-t border-white/5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-mono font-bold text-white/20 uppercase tracking-tighter">{sku || `SKU-CD-${id}`}</span>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">In Stock</span>
                    </div>
                </div>

                <h3 className="text-sm font-bold text-white/90 line-clamp-2 hover:text-red-500 transition-colors min-h-[40px] leading-snug">
                    {name}
                </h3>

                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-white tracking-tighter">
                                €{price.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-white/30 font-bold uppercase ml-1">Ex. VAT</span>
                        </div>

                        {/* Dynamic Pricing Tag */}
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 rounded border border-green-500/20">
                            <TrendingDown size={10} className="text-green-500" />
                            <span className="text-[8px] font-black text-green-500 uppercase">AI Best</span>
                        </div>
                    </div>
                </div>

                <button
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-red-600/10 transition-all border border-red-500/20"
                    onClick={handleAddToCart}
                >
                    Dispatch Now
                </button>
            </div>
        </motion.div>
    );
});

export default ProductCard;
