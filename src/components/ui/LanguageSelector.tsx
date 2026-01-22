"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useTranslation, Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { motion } from "framer-motion";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();

  const currentLanguage =
    languages.find((l) => l.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 text-zinc-300 hover:text-white hover:bg-white/10 px-3 h-9 text-xs transition-all"
        >
          <Globe size={14} />
          <span className="hidden xl:inline">
            <motion.span
              key={locale}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block mr-1"
            >
              {currentLanguage.flag}
            </motion.span> 
            {currentLanguage.code.toUpperCase()}
          </span>
          <span className="xl:hidden">
            <motion.span
              key={locale}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block"
            >
              {currentLanguage.flag}
            </motion.span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/[0.03] backdrop-blur-3xl border-white/10 min-w-[160px] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-1.5 animate-in fade-in zoom-in-95 duration-200"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-xl transition-all duration-300 outline-none mb-0.5 last:mb-0 ${
              locale === lang.code
                ? "text-cedra-500 bg-cedra-500/10 font-bold"
                : "text-zinc-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="text-lg filter drop-shadow-sm">{lang.flag}</span>
            <span className="text-sm tracking-wide">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}