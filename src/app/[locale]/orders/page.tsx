"use client";

import React from "react";
import { FileText, ChevronRight, Clock, CheckCircle2, AlertCircle, Search, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const MOCK_ORDERS = [
    { id: "ORD-9921", date: "Jan 12, 2026", total: 4250.00, status: "Delivered", items: 3 },
    { id: "ORD-9884", date: "Jan 08, 2026", total: 1299.00, status: "Shipped", items: 1 },
    { id: "ORD-9752", date: "Dec 21, 2025", total: 849.99, status: "Delivered", items: 2 },
    { id: "ORD-9661", date: "Dec 15, 2025", total: 3450.00, status: "Cancelled", items: 5 },
];

export default function OrdersPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                            {t.orderHistory.title} <span className="text-cedra-500">{t.orderHistory.titleAccent}</span>
                        </h1>
                        <p className="text-white/50 text-sm font-medium mt-2">{t.orderHistory.subtitle}</p>
                    </div>
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cedra-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={t.orderHistory.searchPlaceholder}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cedra-500/30 transition-all font-medium placeholder:text-white/10"
                        />
                    </div>
                </header>

                <div className="space-y-4">
                    {MOCK_ORDERS.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-all group cursor-pointer backdrop-blur-3xl"
                        >
                            <div className="w-14 h-14 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 group-hover:scale-110 transition-transform shrink-0 border border-cedra-500/20">
                                <FileText size={24} />
                            </div>

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">{t.orderHistory.orderId}</div>
                                    <div className="font-mono font-bold text-white tracking-tight">{order.id}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">{t.orderHistory.date}</div>
                                    <div className="font-bold text-white/80">{order.date}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">{t.orderHistory.total}</div>
                                    <div className="font-black text-white text-lg italic">€{order.total.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="text-[9px] uppercase font-black text-white/20 mb-1 tracking-widest">{t.orderHistory.status}</div>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 justify-between">
                                <button className="flex items-center gap-2 text-white/40 hover:text-cedra-500 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                                    <Download size={16} />
                                    <span>{t.orderHistory.invoice}</span>
                                </button>
                                <div className="text-white/20 group-hover:text-cedra-500 transition-colors">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {MOCK_ORDERS.length === 0 && (
                    <div className="py-32 text-center bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10 backdrop-blur-3xl">
                        <FileText className="mx-auto mb-6 text-white/10" size={64} />
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">{t.orderHistory.noOrders}</h3>
                        <p className="text-white/40 text-sm font-medium">{t.orderHistory.noOrdersDesc}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { icon: any, color: string }> = {
        "Delivered": { icon: CheckCircle2, color: "text-green-500" },
        "Shipped": { icon: Clock, color: "text-blue-400" },
        "Cancelled": { icon: AlertCircle, color: "text-red-400" },
    };

    const config = configs[status] || configs["Shipped"];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-1.5 ${config.color} text-[10px] font-black uppercase tracking-widest`}>
            <Icon size={14} />
            <span>{status}</span>
        </div>
    );
}