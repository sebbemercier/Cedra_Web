"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { Plus, Send, FileText, Trash2, Calculator, ListChecks, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuotesPage() {
    const router = useRouter();
    const [items, setItems] = useState<{ product_id: string, quantity: number }[]>([]);
    const [newItemId, setNewItemId] = useState("");
    const [newItemQty, setNewItemQty] = useState(1);
    const [notes, setNotes] = useState("");

    const addItem = () => {
        if (newItemId && newItemQty > 0) {
            setItems([...items, { product_id: newItemId, quantity: newItemQty }]);
            setNewItemId("");
            setNewItemQty(1);
        }
    };

    const submitQuote = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            await api.quotes.create(token, { items, notes });
            alert("Quote Request Sent!");
            router.push("/dashboard");
        } catch (e) {
            alert("Failed to send quote request");
        }
    };

    return (
        <div className="min-h-screen pt-40 pb-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                        Request <span className="text-red-600">Quote</span>
                    </h1>
                    <p className="text-white/40">Manual entry for high-volume B2B procurement estimates.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 p-10 rounded-[2.5rem]">
                        <div className="flex gap-4 mb-8">
                            <input
                                value={newItemId}
                                onChange={(e) => setNewItemId(e.target.value)}
                                placeholder="Product ID / UUID"
                                className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none"
                            />
                            <input
                                type="number"
                                value={newItemQty}
                                onChange={(e) => setNewItemQty(parseInt(e.target.value))}
                                className="w-24 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-600 outline-none"
                            />
                            <button onClick={addItem} className="bg-white/10 hover:bg-white text-white hover:text-black p-3 rounded-xl transition-all">
                                <Plus />
                            </button>
                        </div>

                        <div className="space-y-2 mb-8">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-black p-4 rounded-xl border border-white/5">
                                    <span className="text-white font-mono">{item.product_id}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-red-600 font-bold">x{item.quantity}</span>
                                        <button onClick={() => setItems(items.filter((_, i) => i !== idx))} className="text-white/20 hover:text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && <div className="text-center text-white/20 py-4 italic">No items added</div>}
                        </div>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Additional Notes (Project Ref, Delivery constraints...)"
                            className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white min-h-[100px] mb-8 focus:border-red-600 outline-none"
                        />

                        <button
                            onClick={submitQuote}
                            disabled={items.length === 0}
                            className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            Submit Request <Send size={16} />
                        </button>
                    </div>

                    {/* Helper / Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-8 rounded-3xl border border-white/10">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6">
                                <Calculator size={24} />
                            </div>
                            <h2 className="text-xl font-bold mb-4 text-white">How quotes work</h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-6">
                                Submit a configuration or list of parts. Our automated engine (Sovereign AI) or a sales representative will review and provide the best enterprise pricing within 2 hours.
                            </p>
                            <ul className="space-y-3">
                                <QuoteStep icon={<ListChecks size={16} />} text="Build your configuration" />
                                <QuoteStep icon={<Send size={16} />} text="Submit for review" />
                                <QuoteStep icon={<ArrowRight size={16} />} text="Convert to order" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuoteStep({ icon, text }: { icon: any, text: string }) {
    return (
        <li className="flex items-center gap-3 text-white/50 text-xs font-bold">
            <span className="text-red-600">{icon}</span>
            {text}
        </li>
    );
}
