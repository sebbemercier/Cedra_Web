"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { RegisterProForm } from "@/components/pages/register-pro/RegisterProForm";

export default function RegisterProPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden pt-32 pb-32">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(230,0,35,0.05),transparent)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col items-center mb-12">
          <Link href="/" className="mb-6 hover:scale-105 transition-transform">
            <Image
              src="/logo.svg"
              alt="Cedra"
              width={150}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-8 bg-cedra-500"></div>
            <span className="text-cedra-500 font-black text-[10px] uppercase tracking-[0.4em]">
              {t.register.proPortal}
            </span>
            <div className="h-px w-8 bg-cedra-500"></div>
          </div>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter text-center leading-none">
            {t.register.proTitle}{" "}
            <span className="text-cedra-500">{t.register.proTitleAccent}</span>
          </h1>
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-4 text-center max-w-sm">
            {t.register.proSubtitle}
          </p>
        </div>

        <RegisterProForm t={t} />

        <p className="mt-8 text-center text-white/20 text-[10px] font-bold uppercase tracking-widest">
          {t.register.alreadyPartner}{" "}
          <Link
            href="/login"
            className="text-white hover:text-cedra-500 underline underline-offset-4"
          >
            {t.register.loginHere}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}