"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minus, MessageSquare, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function B2BCopilot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I'm your Cedra AI Assistant. How can I help you with your electrical projects today?" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        // Simulate AI response related to Cedra Backend capabilities
        setTimeout(() => {
            let response = "";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes("stock") || lowerInput.includes("inventory")) {
                response = "I'm checking the ScyllaDB inventory in real-time. We currently have 45 units of the High-Speed Fiber Switch in stock. Would you like me to add one to your quote?";
            } else if (lowerInput.includes("price") || lowerInput.includes("discount")) {
                response = "Based on your trade history and current demand forecasting, I can offer a 5% bulk discount on orders over €2,000 this week.";
            } else if (lowerInput.includes("visual") || lowerInput.includes("search")) {
                response = "You can use our Visual Search feature (powered by Elasticsearch k-NN) by clicking the camera icon in the search bar. Just upload a photo of the part you need!";
            } else {
                response = "I'm processing your request using our Sovereign AI stack (Ollama). How can I specifically assist with your technical specs or order history?";
            }

            setMessages(prev => [...prev, { role: "assistant", content: response }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 shadow-red-600/40 border-2 border-white/10"
                >
                    <Bot size={28} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-red-900/20 to-black border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black rounded-lg p-1.5 flex items-center justify-center border border-white/10">
                                    <img src="/logo.svg" alt="Cedra" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Cedra AI Copilot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Sovereign Node Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                                    <Minus size={20} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.03),transparent)]">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "chat",
                                        m.role === "user" ? "chat-end" : "chat-start"
                                    )}
                                >
                                    <div className={cn(
                                        "chat-bubble text-[11px] font-bold leading-relaxed rounded-2xl",
                                        m.role === "user"
                                            ? "bg-red-600 text-white"
                                            : "bg-zinc-900 text-white border border-white/5 shadow-xl"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chat chat-start">
                                    <div className="chat-bubble bg-zinc-900 border border-white/5 flex gap-1 items-center">
                                        <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></span>
                                        <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black">
                            <div className="flex items-center gap-2 bg-zinc-900 rounded-xl border border-white/5 p-2 focus-within:border-red-600/50 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask about inventory, technical specs..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-white/10"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-1"><Zap size={10} /> FastHTTP</span>
                                <span className="flex items-center gap-1"><Sparkles size={10} /> Ollama AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
