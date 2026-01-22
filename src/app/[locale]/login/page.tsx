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
import { useTranslation } from "@/lib/i18n";

export default function LoginPage() {
    const { t } = useTranslation();
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
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none"></div>

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
                            <>{t.login.welcome.split(' ')[0]} <span className="text-cedra-500">{t.login.welcome.split(' ')[1] || "Back"}</span></>
                        ) : (
                            <>{t.login.securityCheck.split(' ')[0]} <span className="text-cedra-500">{t.login.securityCheck.split(' ')[1] || "Check"}</span></>
                        )}
                    </h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                        {step === "login" ? t.login.subtitle : t.login.twoFASubtitle}
                    </p>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl shadow-cedra-500/10">
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
                                    <Label htmlFor="email">{t.login.emailLabel}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">{t.login.passwordLabel}</Label>
                                        <Link href="#" className="text-[9px] font-black uppercase text-cedra-500 hover:text-cedra-400 mb-2 tracking-widest transition-colors">{t.login.forgot}</Link>
                                    </div>
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

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-cedra-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cedra-500 text-white"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        t.login.signInBtn
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
                                    <div className="w-16 h-16 bg-cedra-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-cedra-500">
                                        <Lock size={32} />
                                    </div>
                                    <p className="text-white/60 text-xs">{t.login.twoFADesc}</p>
                                </div>

                                <div>
                                    <Label htmlFor="code" className="text-center block mb-2">{t.login.twoFALabel}</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        placeholder="123456"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 focus:border-cedra-500/50 transition-colors text-center text-2xl tracking-[0.5em] font-black h-16"
                                        maxLength={6}
                                        autoComplete="one-time-code"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-cedra-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-cedra-500 text-white"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        t.login.verifyBtn
                                    )}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setStep("login")}
                                    className="w-full text-center text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    {t.login.backToLogin}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {step === "login" && (
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                            <Link href="/register">
                                <Button variant="outline" className="w-full h-14 rounded-2xl text-[10px] uppercase tracking-widest border-white/10 hover:bg-white/5 text-white font-bold">
                                    {t.login.createPersonal}
                                </Button>
                            </Link>
                            <Link href="/register-pro" className="group">
                                <div className="p-6 bg-cedra-500/5 border border-cedra-500/20 rounded-3xl hover:bg-cedra-500 transition-all duration-500 flex items-center justify-between cursor-pointer group-hover:shadow-[0_0_40px_-10px_rgba(230,0,35,0.5)]">
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-tighter text-lg leading-tight group-hover:text-white transition-colors">
                                            {t.login.applyTrade.split(' ').slice(0, 2).join(' ')} <br /> {t.login.applyTrade.split(' ').slice(2).join(' ')}
                                        </h4>
                                        <p className="text-[9px] font-bold text-cedra-500 uppercase tracking-widest mt-1 group-hover:text-white transition-colors">{t.login.b2bBest}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-cedra-500 rounded-2xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-cedra-500 transition-colors shadow-xl group-hover:scale-110 duration-500">
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