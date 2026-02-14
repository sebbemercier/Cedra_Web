"use client";

import React from "react";
import Link from "next/link";
import { Unplug, Home, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none -mr-64 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -ml-64 -mb-32"></div>

      <div className="max-w-2xl w-full relative z-10 text-center">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-cedra-500/20 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative bg-zinc-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <Unplug size={64} className="text-cedra-500" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6 leading-[0.85]">
          {t.error.notFoundTitle} <span className="text-cedra-500">{t.error.notFoundTitleAccent}</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-lg mx-auto">
          {t.error.notFoundDesc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="h-14 px-8 rounded-xl bg-white text-black hover:bg-cedra-500 hover:text-white font-black uppercase tracking-widest text-xs transition-all shadow-lg w-full sm:w-auto gap-2">
              <Home size={16} />
              {t.error.backHome}
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="h-14 px-8 rounded-xl border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-xs transition-all w-full sm:w-auto gap-2">
              <Search size={16} />
              {t.error.browseCatalog}
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
            Cedra Logic System • Error 404
          </p>
        </div>
      </div>
    </div>
  );
}
