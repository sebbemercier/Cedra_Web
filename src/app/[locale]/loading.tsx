import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="relative">
        <div className="absolute inset-0 bg-cedra-500/20 blur-xl rounded-full animate-pulse"></div>
        <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl">
          <div className="w-16 h-16 bg-cedra-500/10 rounded-xl flex items-center justify-center border border-cedra-500/20">
            <Loader2 className="w-8 h-8 text-cedra-500 animate-spin" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-white font-black uppercase tracking-widest text-sm">
              Chargement
            </h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
              Initialisation du système...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
