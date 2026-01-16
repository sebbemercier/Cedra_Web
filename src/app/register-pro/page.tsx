"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Building2, Zap, CheckCircle2, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterProPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        company_name: "",
        vat_number: "",
        sector: "Electrical",
        company_size: "1-10",

        street: "",
        number: "",
        box: "",
        postal_code: "",
        city: "",
        country: "Belgium",

        name: "", // Admin User Name
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        try {
            const response = await api.auth.registerBusiness(formData);
            localStorage.setItem("token", response.token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden pt-32 pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.05),transparent)] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl"
            >
                <div className="flex flex-col items-center mb-12">
                    <Link href="/" className="mb-6 hover:scale-105 transition-transform">
                        <img src="/logo.svg" alt="Cedra" className="h-12 w-auto" />
                    </Link>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-8 bg-red-600"></div>
                        <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.4em]">Professional Portal</span>
                        <div className="h-px w-8 bg-red-600"></div>
                    </div>
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter text-center leading-none">
                        Get Your <span className="text-red-500">Trade Privileges</span>
                    </h1>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-4 text-center max-w-sm">
                        Unlock wholesale pricing, credit terms and dedicated technical support.
                    </p>
                </div>

                <div className="bg-zinc-950 border border-white/5 p-12 rounded-[3.5rem] shadow-2xl relative backdrop-blur-3xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Form Side */}
                        <div className="lg:col-span-2 space-y-8">
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 mb-6"
                                    >
                                        <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                                        <p className="text-red-500 text-sm font-bold">{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleRegister} className="space-y-8">
                                {/* Section 1: Company Details */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                                        <Building2 className="text-red-600" size={18} /> Company Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <Label htmlFor="company_name">Company Name</Label>
                                            <Input id="company_name" placeholder="Electric Solutions Ltd" value={formData.company_name} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label htmlFor="vat_number">VAT Number</Label>
                                            <Input id="vat_number" placeholder="BE 0123.456.789" value={formData.vat_number} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label htmlFor="sector">Sector</Label>
                                            <select
                                                id="sector"
                                                value={formData.sector}
                                                onChange={handleChange as any}
                                                className="flex h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm shadow-sm transition-colors text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
                                            >
                                                <option value="Electrical">Electrical</option>
                                                <option value="Construction">Construction</option>
                                                <option value="Industrial">Industrial</option>
                                                <option value="IT">IT & Infrastructure</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Address */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                                        <Zap className="text-red-600" size={18} /> Billing Address
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-3">
                                            <Label htmlFor="street">Street</Label>
                                            <Input id="street" placeholder="Rue de l'Industrie" value={formData.street} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="number">No.</Label>
                                            <Input id="number" placeholder="10" value={formData.number} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <Label htmlFor="box">Box</Label>
                                            <Input id="box" placeholder="A" value={formData.box} onChange={handleChange} className="bg-white/5 border-white/10" />
                                        </div>
                                        <div className="col-span-1">
                                            <Label htmlFor="postal_code">Zip</Label>
                                            <Input id="postal_code" placeholder="1000" value={formData.postal_code} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="Brussels" value={formData.city} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Admin Account */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-black uppercase italic tracking-widest text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                                        <ShieldCheck className="text-red-600" size={18} /> Admin Account
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <Label htmlFor="name">Admin Full Name</Label>
                                            <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="admin@company.com" value={formData.email} onChange={handleChange} required className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input id="phone" type="tel" placeholder="+32 470 00 00 00" value={formData.phone} onChange={handleChange} className="bg-white/5 border-white/10" />
                                        </div>
                                        <div className="md:col-span-2 relative">
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    className="pr-12 bg-white/5 border-white/10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 relative">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="pr-12 bg-white/5 border-white/10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black shadow-red-600/40 hover:bg-red-700 transition-all"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Submit Application"}
                                </Button>
                            </form>
                        </div>

                        {/* Benefits Side - Hidden on mobile if needed, but keeping for now */}
                        <div className="hidden lg:flex flex-col space-y-6">
                            <div className="bg-white/5 rounded-3xl p-8 space-y-8 flex flex-col justify-center border border-white/5 sticky top-8">
                                <h3 className="text-white font-black uppercase text-xl italic tracking-tighter">Why switch to <span className="text-red-500">PRO?</span></h3>
                                <ProBenefit
                                    title="Wholesale Pricing"
                                    desc="Automatic trade discounts on 50,000+ electrical SKUs directly applied to your account."
                                />
                                <ProBenefit
                                    title="Account Credit"
                                    desc="Buy now, pay later with 30-day net payment terms subject to approval."
                                />
                                <ProBenefit
                                    title="Priority Dispatch"
                                    desc="B2B orders jump to the front of the ScyllaDB queue for same-day dispatch."
                                />
                                <ProBenefit
                                    title="Dedicated Support"
                                    desc="Direct access to our engineering team for complex project quotes."
                                />

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-60">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest">
                                        <CheckCircle2 className="text-green-500" size={14} /> Trade Verified
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest">
                                        <Zap className="text-red-600" size={14} /> Instant Sync
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
                    Already a Trade Partner? <Link href="/login" className="text-white hover:text-red-600 underline underline-offset-4">Log In Here</Link>
                </p>
            </motion.div>
        </div>
    );
}

function ProBenefit({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="space-y-1">
            <h4 className="text-white font-black uppercase italic tracking-widest text-xs flex items-center gap-2">
                <Zap className="text-red-600" size={14} /> {title}
            </h4>
            <p className="text-[10px] font-medium text-white/40 leading-relaxed">{desc}</p>
        </div>
    );
}
