import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Package, Minus, Plus, Truck } from "lucide-react";
import { CartItem } from "@/types";
import { Progress } from "@/components/ui/progress";

interface CartItemListProps {
  items: CartItem[];
  t: { cart: { remove: string } };
  removeFromCart: (id: string) => void;
  addToCart: (item: CartItem) => void;
}

export function CartItemList({
  items,
  t,
  removeFromCart,
  addToCart,
}: CartItemListProps) {
  const subtotal = useMemo(() => items.reduce((acc, item) => acc + (item.total || 0), 0), [items]);
  const FREE_SHIPPING_THRESHOLD = 250;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Free Shipping Tracker */}
      <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/5 blur-3xl -z-10" />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cedra-500/10 rounded-xl flex items-center justify-center border border-cedra-500/20">
              <Truck size={20} className="text-cedra-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white italic uppercase tracking-tighter">
                {remaining > 0 ? "Livraison gratuite ?" : "Livraison offerte !"}
              </h4>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {remaining > 0 
                  ? `Plus que €${remaining.toFixed(2)} pour la livraison gratuite` 
                  : "Votre commande est éligible à la livraison gratuite."}
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-white italic">€{FREE_SHIPPING_THRESHOLD}</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/5" />
      </div>

      <div className="hidden md:grid grid-cols-12 gap-4 px-8 pb-4 text-zinc-600 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
        <div className="col-span-6">Désignation de l&apos;article</div>
        <div className="col-span-2 text-center">Quantité</div>
        <div className="col-span-2 text-right">Prix HTVA</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      {items.map((item, index) => (
        <motion.div
          key={item.product_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-900/20 border border-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-3xl group hover:border-cedra-500/30 transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Image & Title */}
            <div className="md:col-span-6 flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-950/50 rounded-2xl flex items-center justify-center p-4 border border-white/5 group-hover:border-cedra-500/20 transition-all relative overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <Package className="text-zinc-800" size={32} />
                )}
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-cedra-500 mb-1">
                  {/* @ts-expect-error - SKU might be missing in some item types */}
                  {item.sku || "REF-CD-459"}
                </div>
                <h3 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-cedra-400 transition-colors font-display">
                  {item.name}
                </h3>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="mt-3 text-zinc-600 hover:text-red-500 transition-colors flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"
                >
                  <Trash2 size={12} /> {t.cart.remove}
                </button>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="md:col-span-2 flex justify-center">
              <div className="flex items-center bg-zinc-950/50 rounded-xl border border-white/5 p-1">
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-xs font-black text-white font-mono">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Unit Price */}
            <div className="md:col-span-2 text-right hidden md:block">
              <div className="text-white font-black italic tracking-tighter text-sm">
                €{item.price?.toFixed(2)}
              </div>
              <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mt-1">
                UNITAIRE HTVA
              </div>
            </div>

            {/* Total Price */}
            <div className="md:col-span-2 text-right flex flex-row md:flex-col justify-between items-center md:items-end">
              <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest md:hidden">
                Total HTVA
              </div>
              <div className="text-2xl font-black text-white italic tracking-tighter font-display">
                €{(item.total || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
