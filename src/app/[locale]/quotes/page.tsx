"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { Plus, Send, Trash2, Calculator, ListChecks, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

// Schema for a single quote item
const itemSchema = z.object({
    product_id: z.string().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

// Schema for the entire quote request
const quoteSchema = z.object({
    items: z.array(itemSchema).min(1, "At least one item is required"),
    notes: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function QuotesPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [newItemId, setNewItemId] = useState("");
    const [newItemQty, setNewItemQty] = useState(1);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            items: [],
            notes: "",
        }
    });

    const items = watch("items");

    const addItem = () => {
        if (!newItemId) return;
        const newItems = [...items, { product_id: newItemId, quantity: newItemQty }];
        setValue("items", newItems, { shouldValidate: true });
        setNewItemId("");
        setNewItemQty(1);
    };

    const removeItem = (idx: number) => {
        const newItems = items.filter((_, i) => i !== idx);
        setValue("items", newItems, { shouldValidate: true });
    };

    const onSubmit = async (data: QuoteFormValues) => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login?redirect=/quotes");
            return;
        }

        setIsLoading(true);
        setServerError(null);

        try {
            await api.quotes.create(token, data);
            router.push("/dashboard");
        } catch (e: any) {
            setServerError(e.message || "Failed to send quote request");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-40 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                        {t.quotes.title} <span className="text-cedra-500">{t.quotes.titleAccent}</span>
                    </h1>
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">{t.quotes.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence>
                            {(serverError || errors.items) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3"
                                >
                                    <AlertCircle className="text-red-500" size={20} />
                                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">
                                        {serverError || errors.items?.message}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                            {/* New Item Input */}
                            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-10 p-2 bg-black/20 rounded-2xl border border-white/5">
                                <div className="flex-1 space-y-1">
                                    <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500">{t.quotes.productRef}</Label>
                                    <Input
                                        value={newItemId}
                                        onChange={(e) => setNewItemId(e.target.value)}
                                        placeholder="ex: MCB-C16-1P"
                                        className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/10 h-12 text-lg font-mono"
                                    />
                                </div>
                                <div className="w-full md:w-24 space-y-1 border-l border-white/5 pl-4">
                                    <Label className="text-[10px] uppercase font-black text-zinc-500">{t.quotes.qty}</Label>
                                    <Input
                                        type="number"
                                        value={newItemQty}
                                        onChange={(e) => setNewItemQty(parseInt(e.target.value) || 1)}
                                        className="bg-transparent border-none focus-visible:ring-0 text-white h-12 text-lg"
                                    />
                                </div>
                                <Button 
                                    onClick={addItem} 
                                    className="h-16 w-16 bg-white text-black hover:bg-cedra-500 hover:text-white rounded-xl transition-all shadow-xl"
                                    aria-label={t.quotes.addItem}
                                >
                                    <Plus size={24} />
                                </Button>
                            </div>

                            {/* Items List */}
                            <div className="space-y-3 mb-10 min-h-[100px]">
                                {items.map((item, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={idx} 
                                        className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-cedra-500/10 flex items-center justify-center text-cedra-500 font-black">
                                                {idx + 1}
                                            </div>
                                            <span className="text-white font-mono font-bold tracking-tight">{item.product_id}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-white font-black text-lg italic">x{item.quantity}</span>
                                            <button 
                                                onClick={() => removeItem(idx)} 
                                                className="text-white/10 hover:text-red-500 transition-colors p-2"
                                                aria-label={t.common.delete}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                                {items.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/5 rounded-[2rem]">
                                        <ListChecks className="text-white/5 mb-4" size={48} />
                                        <p className="text-white/10 text-sm font-black uppercase tracking-widest italic">{t.quotes.noItems}</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2 mb-8">
                                <Label className="pl-2 text-[10px] uppercase font-black text-zinc-500 italic">{t.quotes.notesLabel}</Label>
                                <textarea
                                    {...register("notes")}
                                    placeholder={t.quotes.notesPlaceholder}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-6 text-white text-sm min-h-[150px] focus:border-cedra-500/50 outline-none transition-all placeholder:text-white/5"
                                />
                            </div>

                            <Button
                                onClick={handleSubmit(onSubmit)}
                                disabled={items.length === 0 || isLoading}
                                className="w-full h-20 bg-cedra-500 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-cedra-600 disabled:opacity-20 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-cedra-500/20"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <>{t.quotes.submit} <Send size={18} /></>}
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 sticky top-32">
                            <div className="w-16 h-16 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 mb-8 border border-cedra-500/20">
                                <Calculator size={32} />
                            </div>
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white">{t.quotes.sidebarTitle}</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium">
                                {t.quotes.sidebarDesc}
                            </p>
                            
                            <div className="space-y-6">
                                <QuoteStep 
                                    icon={<ListChecks size={20} />} 
                                    title={t.quotes.step1Title} 
                                    text={t.quotes.step1Desc} 
                                />
                                <QuoteStep 
                                    icon={<Send size={20} />} 
                                    title={t.quotes.step2Title} 
                                    text={t.quotes.step2Desc} 
                                />
                                <QuoteStep 
                                    icon={<ArrowRight size={20} />} 
                                    title={t.quotes.step3Title} 
                                    text={t.quotes.step3Desc} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuoteStep({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="flex gap-4">
            <div className="text-cedra-500 mt-1">{icon}</div>
            <div>
                <h4 className="text-white font-black uppercase italic text-[10px] tracking-widest">{title}</h4>
                <p className="text-zinc-500 text-[11px] font-medium leading-tight mt-1">{text}</p>
            </div>
        </div>
    );
}
