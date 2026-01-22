"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minus, Zap, Sparkles, User, Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { ScrollArea } from "@mantine/core";

export default function B2BCopilot() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const viewport = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ role: "assistant", content: t.copilot.welcome }]);
    }, [t.copilot.welcome]);

    useEffect(() => {
        if (isOpen) viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: "user", content: input }]);
        setInput("");
        setIsLoading(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { role: "assistant", content: "Analyse ScyllaDB terminée. Stock disponible pour l'ID demandé. Remise Pro de 15% applicable sur ce volume." }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl z-50 group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Bot size={22} className="text-white relative z-10" />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-zinc-900 animate-pulse"></div>
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed bottom-8 right-8 w-[380px] h-[600px] z-50 flex flex-col rounded-[2.5rem] overflow-hidden bg-zinc-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header Minimaliste */}
                        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-red-600/20 flex items-center justify-center border border-red-600/30">
                                    <Bot size={16} className="text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Copilote Cedra</h3>
                                    <div className="flex items-center gap-1.5 opacity-40">
                                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-[8px] font-bold uppercase tracking-tighter">Sovereign Node v1.4</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Zone de Messages Aérienne */}
                        <div className="flex-1 overflow-hidden">
                            <ScrollArea h="100%" viewportRef={viewport} p="lg" scrollbarSize={2}>
                                <div className="space-y-8 pb-4">
                                    {messages.map((m, i) => (
                                        <div key={i} className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] space-y-1 ${m.role === "user" ? "text-right" : "text-left"}`}>
                                                <div className={`px-4 py-3 rounded-2xl text-[13px] font-medium leading-relaxed ${
                                                    m.role === "user" 
                                                    ? "bg-white text-black rounded-tr-sm shadow-xl" 
                                                    : "bg-white/[0.03] text-zinc-300 border border-white/5 rounded-tl-sm"
                                                }`}>
                                                    {m.content}
                                                </div>
                                                <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest px-1">
                                                    {m.role === "assistant" ? "Intelligence Artificielle" : "Utilisateur Pro"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-1.5 px-2">
                                            <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></span>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Input Area HUD Style */}
                        <div className="p-6 bg-black/20">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Demande technique..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white text-sm focus:outline-none focus:border-red-600/50 transition-all placeholder:text-white/10 font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black hover:bg-red-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-90"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between px-1 opacity-20">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1"><Zap size={10} /><span className="text-[8px] font-black uppercase tracking-widest">FastHTTP</span></div>
                                    <div className="flex items-center gap-1"><Shield size={10} /><span className="text-[8px] font-black uppercase tracking-widest">Ollama-Sec</span></div>
                                </div>
                                <span className="text-[8px] font-black uppercase">Cedra Logic</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}