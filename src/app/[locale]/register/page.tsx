"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

export default function RegisterPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.auth.register({
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            localStorage.setItem("token", response.token);
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden pt-20 pb-20">
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-md"
            >
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="mb-6 hover:scale-105 transition-transform duration-300">
                        <img src="/logo.svg" alt="Cedra" className="h-10 w-auto" />
                    </Link>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
                        {t.register.personalTitle} <span className="text-cedra-500">{t.register.personalTitleAccent}</span>
                    </h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{t.register.personalSubtitle}</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3"
                                >
                                    <AlertCircle className="text-red-500" size={16} />
                                    <p className="text-red-500 text-xs font-bold">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Jean"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                    className="bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Dupont"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                    className="bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">{t.auth.email}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="jean@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">{t.auth.password}</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-12 bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
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

                        <div>
                            <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-12 bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
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

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 rounded-2xl text-xs uppercase tracking-[0.2em] font-black mt-4 hover:bg-cedra-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cedra-500 text-white"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                t.auth.createAccount
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                            {t.auth.hasAccount}
                            <Link href="/login" className="text-cedra-500 ml-2 hover:underline">{t.auth.signIn}</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}