"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Sparkles, Save, Package, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
    const router = useRouter();
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }
            try {
                const user = await api.auth.me(token);
                if (user.role !== 'admin') {
                    router.push("/dashboard");
                    return;
                }
                setIsLoadingAuth(false);
            } catch (e) {
                router.push("/login");
            }
        };
        checkAuth();
    }, []);

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
        );
    }

    const handleGenerateAI = async () => {
        if (!name) return alert("Please enter a product name first.");
        setIsGenerating(true);
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        try {
            const res = await api.ai.generateDescription(token, {
                product_name: name,
                features: [sku, "high performance", "industrial"], // Corrected prop name
                tone: "professional",
                language: "en"
            });
            setDescription(res.description);
        } catch (e) {
            alert("AI Generation Failed");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");

        try {
            await api.products.create(token, {
                name,
                sku,
                description,
                price: parseFloat(price),
                currency: "EUR",
                inventory_count: 100,
                category_id: "hardware", // Required by strict type
                images: [] // Required by strict type
            });
            alert("Product Created!");
            router.push("/products");
        } catch (e) {
            alert("Failed to create product");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen pt-40 pb-20 px-6 bg-black">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-6 border border-white/10">
                        <Package size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                        New Inventory <span className="text-red-600">Asset</span>
                    </h1>
                    <p className="text-white/40">Register new stock items. AI Assistance enabled.</p>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[2.5rem] space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2">Product Name</label>
                        <input
                            value={name} onChange={e => setName(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all"
                            placeholder="e.g. Rack Server 4U"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2">SKU</label>
                            <input
                                value={sku} onChange={e => setSku(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all"
                                placeholder="PROD-001"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2">Price (EUR)</label>
                            <input
                                type="number"
                                value={price} onChange={e => setPrice(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-end mb-2">
                            <label className="block text-[10px] uppercase font-bold text-white/40 tracking-widest">Description</label>
                            <button
                                onClick={handleGenerateAI}
                                disabled={isGenerating || !name}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <Sparkles size={12} /> {isGenerating ? "Generating..." : "Auto-Generate with AI"}
                            </button>
                        </div>
                        <textarea
                            value={description} onChange={e => setDescription(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white min-h-[150px] focus:border-red-600 outline-none transition-all"
                            placeholder="Detailed technical specification..."
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        <Save size={16} /> Save Product
                    </button>
                </div>
            </div>
        </div>
    );
}
