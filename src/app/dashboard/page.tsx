"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Package, Calendar, AlertTriangle, Zap, ArrowUpRight, User as UserIcon, Building2 } from "lucide-react";
import { api } from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login"); // Client-side redirect if no token
                    return;
                }

                // 1. Fetch User
                const userData = await api.auth.me(token);
                setUser(userData);

            } catch (error) {
                console.error("Failed to load dashboard data", error);
                // If 401, redirect
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin text-red-600"><Zap size={48} /></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                            <Zap size={14} />
                            <span>AI Sovereignty Node v1.0</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
                            Hello, <span className="text-red-600">{user?.name || "User"}</span>
                        </h1>
                        <p className="text-white/40 mt-2 font-bold uppercase tracking-widest text-[10px]">
                            {user?.email} • {user?.role || "Guest"}
                        </p>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <Button
                            variant="outline"
                            className="rounded-2xl h-auto border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all uppercase text-[10px] font-bold tracking-widest px-6"
                            onClick={() => {
                                // Client-side logout only as per strict API guide (missing logout endpoint)
                                localStorage.removeItem("token");
                                router.push("/login");
                            }}
                        >
                            Log Out
                        </Button>
                        <div className="glass px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60">
                                <UserIcon size={20} />
                            </div>
                            <div>
                                <div className="text-[9px] text-white/40 uppercase font-black tracking-widest">Account Status</div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    Active <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Admin-Only Analytics (Stock, Global Demand, AI Logic) */}
                {user?.role === 'admin' && (
                    <>
                        {/* Global Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <StatBox icon={<BarChart3 />} label="Inventory Velocity" value="+24.8%" trend="up" />
                            <StatBox icon={<Calendar />} label="Stock Out Risk" value="Low" trend="stable" />
                            <StatBox icon={<TrendingUp />} label="Predicted Q1 Demand" value="€142k" trend="up" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Predictive Chart Simulation */}
                            <div className="glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full"></div>
                                <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
                                    <TrendingUp className="text-red-600" />
                                    Demand Projection (Next 30 Days)
                                </h3>

                                <div className="h-64 flex items-end gap-2 px-4 border-b border-white/5 pb-2">
                                    {[40, 60, 45, 80, 70, 90, 100, 85, 95, 110].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1, duration: 1 }}
                                            className={`flex-1 rounded-t-lg transition-all ${i > 6 ? 'bg-red-600 shadow-[0_0_15px_rgba(255,0,0,0.3)]' : 'bg-white/10'}`}
                                        >
                                            {i === 9 && (
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-red-600 uppercase whitespace-nowrap">Peak Pred.</div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                    <span>Jan 15</span>
                                    <span>Jan 22 (Forecast)</span>
                                    <span>Feb 15</span>
                                </div>
                            </div>

                            {/* AI Recommendations */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                                    <Zap className="text-red-600" />
                                    Cedra Logic Actions
                                </h3>

                                <ActionItem
                                    title="Early Procurement: 3-Phase Breakers"
                                    desc="Demand spike predicted in late January. Recommended order: 12 units to maintain 99% fulfillment."
                                    severity="high"
                                />
                                <ActionItem
                                    title="Bulk Discount Event Imminent"
                                    desc="Supply levels for Cat6a cabling are high. Expecting 15% price drop on wholesale lots."
                                    severity="low"
                                />
                                <ActionItem
                                    title="ScyllaDB Node Optimization"
                                    desc="Latency detected in Visual Search vector retrieval. Auto-scaling Elastic index recommended."
                                    severity="medium"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Consumer/Non-Admin View */}
                {user?.role !== 'admin' && user?.role !== 'company_admin' && (
                    <div className="text-center py-20 bg-zinc-900/10 rounded-[3rem] border border-white/5">
                        <Package className="text-white/20 mx-auto mb-6" size={48} />
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">Welcome to Cedra</h3>
                        <p className="text-white/50 mb-8 max-w-md mx-auto">Access high-performance electrical components with AI-driven logistics.</p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => router.push('/products')} className="rounded-xl px-8 bg-white text-black hover:bg-red-600 hover:text-white transition-all uppercase font-bold tracking-widest text-xs h-12">
                                Browse Catalogue
                            </Button>
                        </div>
                    </div>
                )}

                {/* Team Management (B2B Only) */}
                {user?.role === 'company_admin' && (
                    <div className="mt-12 p-10 bg-zinc-900/30 rounded-[3rem] border border-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                                    <Building2 className="text-red-600" />
                                    Organization
                                </h3>
                                <p className="text-white/40 text-sm mt-2">Manage access for <span className="text-white font-bold">{user.company_id || "Your Company"}</span></p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-end bg-black p-6 rounded-3xl border border-white/5 max-w-xl">
                            <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Email Address</label>
                                <input id="invite-email" type="email" placeholder="colleague@company.com" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-red-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Role</label>
                                <select id="invite-role" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none">
                                    <option value="buyer" className="bg-black">Buyer</option>
                                    <option value="viewer" className="bg-black">Viewer</option>
                                    <option value="admin" className="bg-black">Admin</option>
                                </select>
                            </div>
                            <Button
                                onClick={async () => {
                                    const email = (document.getElementById('invite-email') as HTMLInputElement).value;
                                    const role = (document.getElementById('invite-role') as HTMLSelectElement).value as any;
                                    const token = localStorage.getItem("token");
                                    if (token && user.company_id && email) {
                                        try {
                                            await api.companies.inviteUser(token, user.company_id, { email, role });
                                            alert(`Invitation sent to ${email}`);
                                            (document.getElementById('invite-email') as HTMLInputElement).value = "";
                                        } catch (e) { alert("Failed to invite user"); }
                                    } else {
                                        alert("Missing permissions or company ID");
                                    }
                                }}
                                className="bg-white text-black hover:bg-red-600 hover:text-white transition-all rounded-xl px-6"
                            >
                                Invite
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatBox({ icon, label, value, trend }: { icon: any, label: string, value: string, trend: 'up' | 'down' | 'stable' }) {
    return (
        <div className="glass p-8 rounded-3xl border border-white/10 hover:border-red-600/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-2xl text-red-600 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-white/20'}`}>
                    {trend === 'up' && <ArrowUpRight size={12} />}
                    {trend}
                </div>
            </div>
            <div className="text-3xl font-black text-white tracking-tighter mb-1">{value}</div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{label}</div>
        </div>
    );
}

function ActionItem({ title, desc, severity }: { title: string, desc: string, severity: 'high' | 'medium' | 'low' }) {
    const colors = {
        high: "border-red-600/50 bg-red-600/5",
        medium: "border-yellow-600/30 bg-yellow-600/5",
        low: "border-blue-600/30 bg-blue-600/5"
    };

    return (
        <motion.div
            whileHover={{ x: 10 }}
            className={`p-6 rounded-3xl border ${colors[severity]} transition-all flex items-start gap-4`}
        >
            <div className="mt-1">
                {severity === 'high' ? <AlertTriangle className="text-red-600" size={20} /> : <TrendingUp className="text-white/40" size={20} />}
            </div>
            <div>
                <h4 className="font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-white/50 leading-relaxed font-medium">{desc}</p>
            </div>
        </motion.div>
    );
}
