"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/lib/i18n";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowLeft, Check, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { CheckoutSuccess } from "@/components/pages/checkout/CheckoutSuccess";
import { EmptyCheckout } from "@/components/pages/checkout/EmptyCheckout";
import { ShippingSection } from "@/components/pages/checkout/ShippingSection";
import { PaymentSection } from "@/components/pages/checkout/PaymentSection";
import { OrderSummary } from "@/components/pages/checkout/OrderSummary";
import { cn } from "@/lib/utils";

export default function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart();
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: "Livraison" },
    { id: 2, name: "Paiement" },
    { id: 3, name: "Confirmation" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login?redirect=/checkout");
        return;
      }

      const order = await api.orders.create(token, {});
      setOrderId(order.id);
      setCompleted(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(t.cart.checkoutFailed);
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return <CheckoutSuccess orderId={orderId} t={t} />;
  }

  if (items.length === 0) {
    return <EmptyCheckout t={t} />;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title={t.cart.title}
        titleAccent="Checkout"
        subtitle="Finalisez votre commande B2B sécurisée"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 -mt-8 relative z-20">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-cedra-500 transition-colors font-black uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} />
            {t.common.back} {t.cart.title}
          </Link>

          {/* Stepper */}
          <div className="flex items-center gap-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all",
                    currentStep >= step.id 
                      ? "bg-cedra-500 text-white shadow-[0_0_15px_rgba(230,0,35,0.3)]" 
                      : "bg-white/5 text-zinc-500 border border-white/5"
                  )}>
                    {currentStep > step.id ? <Check size={14} strokeWidth={3} /> : step.id}
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    currentStep >= step.id ? "text-white" : "text-zinc-600"
                  )}>
                    {step.name}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-8 h-[1px] bg-white/5 hidden sm:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-full">
            <Shield size={12} className="text-green-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-500/80">Secured Protocol</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-12">
            <div onClick={() => setCurrentStep(1)}>
              <ShippingSection />
            </div>
            <div onClick={() => setCurrentStep(2)}>
              <PaymentSection />
            </div>
          </div>

          {/* Sidebar Right */}
          <OrderSummary items={items} subtotal={subtotal} loading={loading} />
        </form>
      </div>
    </div>
  );
}
