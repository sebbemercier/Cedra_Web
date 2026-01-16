"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowRight, Zap, Eye, EyeOff, Loader2, AlertCircle, Lock } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<"login" | "2fa">("login");
    const [twoFAId, setTwoFAId] = useState<string>("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        code: ""
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.auth.login({
                email: formData.email,
                password: formData.password
            });

            if (response.requires_2fa && response["2fa_id"]) {
                setTwoFAId(response["2fa_id"]);
                setStep("2fa");
            } else {
                localStorage.setItem("token", response.token);
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.auth.verify2FA({
                "2fa_id": twoFAId,
                code: formData.code
            });

            localStorage.setItem("token", response.token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid verification code.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="mb-8 hover:scale-105 transition-transform duration-300">
                        <img src="/logo.svg" alt="Cedra" className="h-12 w-auto" />
                    </Link>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
                        {step === "login" ? (
                            <>Welcome <span className="text-red-600">Back</span></>
                        ) : (
                            <>Security <span className="text-red-600">Check</span></>
                        )}
                    </h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                        {step === "login" ? "Professional & Home Electrical Hub" : "Two-Factor Authentication Required"}
                    </p>
                </div>

                <div className="bg-zinc-950 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl shadow-red-600/10 backdrop-blur-3xl">
                    <AnimatePresence mode="wait">
                        {step === "login" ? (
                            <motion.form
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleLogin}
                                className="space-y-6"
                            >
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

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 focus:border-red-600/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="text-[9px] font-black uppercase text-red-600 hover:text-red-500 mb-2 tracking-widest transition-colors">Forgot?</Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pr-12 bg-white/5 border-white/10 focus:border-red-600/50 transition-colors"
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

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Sign In to Dashboard"
                                    )}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="2fa-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleVerify2FA}
                                className="space-y-6"
                            >
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
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                        <Lock size={32} />
                                    </div>
                                    <p className="text-white/60 text-xs">Please enter the verification code sent to your device.</p>
                                </div>

                                <div>
                                    <Label htmlFor="code" className="text-center block mb-2">Verification Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        placeholder="123456"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 focus:border-red-600/50 transition-colors text-center text-2xl tracking-[0.5em] font-black h-16"
                                        maxLength={6}
                                        autoComplete="one-time-code"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Verify Identity"
                                    )}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setStep("login")}
                                    className="w-full text-center text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    Back to Login
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {step === "login" && (
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                            <Link href="/register">
                                <Button variant="outline" className="w-full h-14 rounded-2xl text-[10px] uppercase tracking-widest border-white/10 hover:bg-white/5 text-white">
                                    Create Personal Account
                                </Button>
                            </Link>
                            <Link href="/register-pro" className="group">
                                <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-3xl hover:bg-red-600 transition-all duration-500 flex items-center justify-between cursor-pointer group-hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]">
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-tighter text-lg leading-tight group-hover:text-white transition-colors">Apply for <br /> Trade Account</h4>
                                        <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest mt-1 group-hover:text-black transition-colors">Best for B2B Professionals</p>
                                    </div>
                                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white group-hover:bg-black transition-colors shadow-xl group-hover:scale-110 duration-500">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-white uppercase tracking-widest">
                        <ShieldCheck size={14} /> Encrypted
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-white uppercase tracking-widest">
                        <Zap size={14} /> FastHTTP
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
