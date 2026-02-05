"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { EmptyCart } from "@/components/pages/cart/EmptyCart";
import { CartItemList } from "@/components/pages/cart/CartItemList";
import { OrderSummary } from "@/components/pages/cart/OrderSummary";

export default function CartContent() {
  const { t } = useTranslation();
  const { items, removeFromCart, subtotal, clearCart, isLoading, addToCart } =
    useCart();

  if (items.length === 0) {
    return <EmptyCart t={t} />;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cedra-500/5 blur-[120px] rounded-full pointer-events-none -mr-32 -mt-32"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-cedra-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">
            <span className="w-8 h-[1px] bg-cedra-500"></span>
            <span>Inventory Procurement</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter font-display leading-[0.85]">
            {t.cart.title.split(" ")[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cedra-500 via-white to-cedra-600 animate-gradient">
              {t.cart.title.split(" ")[1] || "Résumé"}
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <CartItemList
            items={items}
            t={t}
            removeFromCart={removeFromCart}
            addToCart={(item) => addToCart({
              id: item.product_id,
              name: item.name,
              price: item.price,
              sku: item.sku,
              images: item.image ? [item.image] : [],
              description: ""
            } as any)}
          />
          <OrderSummary
            subtotal={subtotal}
            t={t}
            items={items}
            clearCart={clearCart}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
