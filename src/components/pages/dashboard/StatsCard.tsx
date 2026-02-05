import React from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: "cedra" | "blue" | "green";
}

export function StatsCard({ icon, label, value, trend, trendUp, color }: StatsCardProps) {
  const colors = {
    cedra: "text-cedra-500 bg-cedra-500/10 border-cedra-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
  };

  return (
    <div className="bg-zinc-900/20 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 opacity-[0.02] transform rotate-12 transition-transform group-hover:scale-110">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 120 })}
      </div>
      <div className="relative z-10">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center mb-6 border",
            colors[color],
          )}
        >
          {icon}
        </div>
        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">
          {label}
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-3xl font-black text-white italic tracking-tighter font-display uppercase leading-none">
            {value}
          </div>
          <div
            className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              trendUp ? "text-green-500" : "text-red-500",
            )}
          >
            {trend}
          </div>
        </div>
      </div>
    </div>
  );
}
