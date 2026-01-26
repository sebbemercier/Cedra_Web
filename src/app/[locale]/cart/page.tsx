"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Trash2, ArrowRight, ShieldCheck, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const { t } = useTranslation();
    const { items, removeFromCart, subtotal, clearCart, isLoading } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        const token = localStorage.getItem("token");

        if (!token) {
            // Guest -> Login
            router.push("/login?redirect=/cart");
            return;
        }

        try {
            const order = await api.orders.create(token, {
                shipping_method: "standard"
            });

            clearCart();
            alert(`${t.cart.orderCreated}${order.id}`);
            router.push("/dashboard");

        } catch (e) {
            console.error(e);
            alert(t.cart.checkoutFailed);
            setIsCheckingOut(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-40 px-6 bg-background flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white/[0.03] rounded-full flex items-center justify-center text-white/20 mb-6 border border-white/5">
                    <Lock size={32} />
                </div>
                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">{t.cart.empty}</h1>
                <p className="text-white/20 mb-8 max-w-sm font-bold uppercase text-[10px] tracking-widest">Secure procurement inventory is currently empty.</p>
                <Link href="/products" className="bg-cedra-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-cedra-600 transition-all shadow-xl shadow-cedra-500/20">
                    {t.cart.browseCatalog}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-12">
                    {t.cart.title.split(' ')[0]} <span className="text-cedra-500">{t.cart.title.split(' ')[1] || "Summary"}</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.product_id} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex items-center gap-6 group backdrop-blur-3xl">
                                <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center p-4 border border-white/5 relative overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                                    ) : (
                                        <div className="text-[8px] uppercase font-black text-white/10">No Image</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-[10px] uppercase font-black tracking-widest text-cedra-500 mb-1">{item.sku || "SKU-???"}</div>
                                            <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-white tracking-tighter">€{(item.total || 0).toFixed(2)}</div>
                                            <div className="text-[10px] text-white/30 uppercase font-bold">{t.cart.quantity}: {item.quantity} × €{item.price}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4">
                                        <button
                                            onClick={() => removeFromCart(item.product_id)}
                                            className="text-white/20 hover:text-cedra-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                        >
                                            <Trash2 size={14} /> {t.cart.remove}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 sticky top-32 backdrop-blur-3xl">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8">{t.cart.total}</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-white/50 text-sm font-medium">
                                    <span>{t.cart.subtotal}</span>
                                    <span>€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/50 text-sm font-medium">
                                    <span>{t.footer.fastDelivery}</span>
                                    <span>{t.cart.calculatedNextStep}</span>
                                </div>
                                <div className="flex justify-between text-white/50 text-sm font-medium">
                                    <span>{t.cart.vat}</span>
                                    <span>€{(subtotal * 0.21).toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between text-white text-xl font-black tracking-tighter">
                                    <span>{t.cart.total}</span>
                                    <span>€{(subtotal * 1.21).toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleCheckout}
                                disabled={isCheckingOut || isLoading}
                                className="w-full h-16 bg-cedra-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cedra-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mb-4 shadow-xl shadow-cedra-500/20"
                            >
                                {isCheckingOut ? <Loader2 className="animate-spin" /> : <>{t.cart.checkout} <ArrowRight size={16} /></>}
                            </Button>

                            <button
                                onClick={async () => {
                                    const token = localStorage.getItem("token");
                                    if (!token) return router.push("/login");
                                    try {
                                        await api.quotes.create(token, {
                                            items: items.map(i => ({ product_id: i.product_id, quantity: i.quantity })),
                                            notes: "Generated from Web Cart"
                                        });
                                        clearCart();
                                        alert("Quote Request Submitted!");
                                        router.push("/dashboard");
                                    } catch (e) { alert("Failed to request quote."); }
                                }}
                                className="w-full bg-white/[0.03] border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                            >
                                {t.cart.requestQuote}
                            </button>

                            <div className="mt-6 flex items-center gap-3 justify-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
                                <ShieldCheck size={14} />
                                {t.cart.secureCheckout}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
