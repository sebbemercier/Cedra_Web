import React from "react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export function ValueCard({ icon, title, desc }: ValueCardProps) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-cedra-500/20 transition-all group">
      <div className="w-16 h-16 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 mb-6 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 32 })}
      </div>
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
        {title}
      </h3>
      <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
