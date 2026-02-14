"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { RegisterForm } from "@/components/pages/register/RegisterForm";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden pt-20 pb-20">
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-md"
      >
        <div className="flex flex-col items-center mb-10">
          <Link
            href="/"
            className="mb-6 hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/logo.svg"
              alt="Cedra"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter text-center">
            {t.register.personalTitle}{" "}
            <span className="text-cedra-500">
              {t.register.personalTitleAccent}
            </span>
          </h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            {t.register.personalSubtitle}
          </p>
        </div>

        <RegisterForm t={t} />
      </motion.div>
    </div>
  );
}
