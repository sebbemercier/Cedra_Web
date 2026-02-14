"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { LoginForm } from "@/components/pages/login/LoginForm";
import { TwoFAForm } from "@/components/pages/login/TwoFAForm";
import { RegisterLink } from "@/components/pages/login/RegisterLink";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function LoginContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [twoFAId, setTwoFAId] = useState<string>("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.auth.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.requires_2fa && response["2fa_id"]) {
        setTwoFAId(response["2fa_id"]);
        setStep("2fa");
      } else {
        localStorage.setItem("token", response.token);
        try {
          const user = await api.auth.me(response.token);
          if (user.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        } catch (e) {
          router.push("/dashboard");
        }
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
        code: formData.code,
      });

      localStorage.setItem("token", response.token);
      try {
        const user = await api.auth.me(response.token);
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } catch (e) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cedra-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-red-600/5 blur-[100px] rounded-full animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-10 transition-transform duration-500"
          >
            <Link href="/">
              <Image
                src="/logo-full.svg"
                alt="Cedra"
                width={180}
                height={60}
                className="h-12 md:h-16 w-auto"
              />
            </Link>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter text-center font-display leading-[0.85]">
            {step === "login" ? (
              <>
                {t.login.welcome.split(" ")[0]}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 to-red-600">
                  {t.login.welcome.split(" ")[1] || "Back"}
                </span>
              </>
            ) : (
              <>
                {t.login.securityCheck.split(" ")[0]}{" "}
                <span className="text-cedra-500">
                  {t.login.securityCheck.split(" ")[1] || "Check"}
                </span>
              </>
            )}
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4 text-center">
            {step === "login" ? t.login.subtitle : t.login.twoFASubtitle}
          </p>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cedra-500 via-transparent to-transparent"></div>

          <AnimatePresence mode="wait">
            {step === "login" ? (
              <LoginForm
                t={t}
                handleLogin={handleLogin}
                isLoading={isLoading}
                error={error}
                formData={formData}
                setFormData={setFormData}
              />
            ) : (
              <TwoFAForm
                t={t}
                handleVerify2FA={handleVerify2FA}
                isLoading={isLoading}
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
              />
            )}
          </AnimatePresence>

          {step === "login" && (
            <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
              <div className="relative flex items-center justify-center">
                <span className="absolute bg-zinc-900/40 px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Ou continuer avec</span>
                <div className="w-full h-px bg-white/5"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <SocialButton icon={<FaGoogle size={18} />} />
                <SocialButton icon={<FaApple size={20} />} />
                <SocialButton icon={<FaFacebook size={20} className="text-[#1877F2]" />} />
              </div>
            </div>
          )}

          {step === "login" && <RegisterLink t={t} />}
        </div>

        <div className="mt-10 flex items-center justify-center gap-10">
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
            <ShieldCheck size={16} className="text-zinc-800" /> AES-256 SECURED
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-zinc-700 uppercase tracking-widest">
            <Zap size={16} className="text-zinc-800" /> CLOUDSCALE API
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="h-14 flex items-center justify-center bg-white/5 border border-white/5 rounded-2xl text-white hover:bg-white/10 hover:border-white/10 transition-all active:scale-95">
      {icon}
    </button>
  );
}
