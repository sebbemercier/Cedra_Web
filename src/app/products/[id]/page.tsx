"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Zap, TrendingDown } from "lucide-react";
// import { useCart } from "@/hooks/useCart"; // Replaced by direct API
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Product, ForecastResponse } from "@/types";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter(); // For push to cart/etc
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState<ForecastResponse | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Fetch product via Search API since strict API has no GET /id
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Product
                const results = await api.products.search(id as string);
                const found = results.find(p => p.id === id) || results[0];
                setProduct(found || null);

                if (found) {
                    const token = localStorage.getItem("token");
                    if (token) {
                        try {
                            // 2. Check User Role (Parallel with Forecast if needed, but role is critical for visibility)
                            const user = await api.auth.me(token);
                            if (user.role === 'admin') {
                                setIsAdmin(true);
                                // 3. Fetch Forecast ONLY if Admin
                                const f = await api.ai.getForecast(token, found.id);
                                setForecast(f);
                            }
                        } catch (e) { console.log("Auth/AI check failed", e); }
                    }
                }

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex justify-center items-center text-red-600"><Zap className="animate-spin" /></div>;
    if (!product) return <div className="min-h-screen bg-black flex justify-center items-center text-white">Product not found</div>;

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            await api.cart.addItem(token, {
                product_id: product.id,
                quantity: 1
            });
            alert("Added to cart!"); // Simple feedback for now
        } catch (e) {
            alert("Failed to add to cart");
        }
    };

    return (
        <div className="min-h-screen pt-40 pb-20 bg-black">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-950 rounded-[3rem] border border-white/5 flex items-center justify-center p-20 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            {product.images && product.images.length > 0 ? (
                                <img src={product.images[0]} alt={product.name} className="object-contain w-full h-full" />
                            ) : (
                                <div className="text-white/5 uppercase font-black text-4xl tracking-tighter opacity-10 select-none">No Image</div>
                            )}
                        </div>
                    </div>

                    {/* Product Actions */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600">
                                {product.category_id || "Industrial"}
                            </span>
                            <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
                                {product.sku}
                            </span>
                        </div>

                        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.9]">
                            {product.name}
                        </h1>

                        <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-white/5 mb-8 relative overflow-hidden group">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Unit Price</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-white tracking-tighter">
                                            {product.price} {product.currency}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {isAdmin && forecast && forecast.forecast_next_30_days !== undefined && (
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Demand Prediction</h3>
                                            <p className="text-white/50 text-sm max-w-sm">
                                                Cedra AI predicts <span className="text-white font-bold">{forecast.forecast_next_30_days} units</span> will be sold in the next 30 days based on global market velocity.
                                            </p>
                                        </div>
                                    )}
                                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${product.inventory_count > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {product.inventory_count > 0 ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                    <span className="text-[10px] font-bold text-white/20">{product.inventory_count} Units Available</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 rounded-[1.5rem]"
                                    onClick={handleAddToCart}
                                    disabled={product.inventory_count <= 0}
                                >
                                    Add to Project
                                </Button>
                                <Button variant="outline" size="lg" className="w-20 rounded-[1.5rem] p-0">
                                    <ShieldCheck size={24} />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Benefit icon={<Truck />} text="Secure Shipping" />
                            <Benefit icon={<RotateCcw />} text="Warranty Included" />
                        </div>
                    </div>
                </div>

                {/* Technical Overview */}
                <div className="max-w-4xl mx-auto bg-zinc-900/20 p-10 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6">Description</h3>
                    <p className="text-white/50 text-lg leading-relaxed">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Benefit({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
            <div className="text-red-600">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{text}</span>
        </div>
    );
}
