"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Download,
  AlertCircle,
  MapPin,
  CreditCard,
  Zap
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { useTranslation } from "@/lib/i18n";
import { api } from "@/lib/api";
import { Order, OrderItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const data = await api.orders.get(token, id as string);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-cedra-500 animate-spin">
          <Zap size={48} />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <AlertCircle size={64} className="text-zinc-800 mb-6" />
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Commande Introuvable</h2>
        <Button onClick={() => router.push("/orders")} variant="outline" className="border-white/10 text-white">
          Retour à la liste
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader
        title="Détails"
        titleAccent="Commande"
        subtitle={`Suivi en temps réel pour la référence #${order.id.slice(-8).toUpperCase()}`}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 -mt-8 relative z-20">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-cedra-500 transition-colors font-black uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;historique
          </button>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 text-zinc-400 hover:text-white h-11 rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest">
              <Printer size={14} /> Imprimer
            </Button>
            <Button className="bg-cedra-500 text-white hover:bg-cedra-600 h-11 rounded-xl px-6 gap-2 text-[10px] font-black uppercase tracking-widest">
              <Download size={14} /> Facture PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Status Timeline */}
            <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cedra-500/5 blur-3xl -z-10" />
               
               <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                  <Step icon={<Clock />} label="Validée" active date={new Date(order.created_at).toLocaleDateString()} />
                  <Step icon={<Zap />} label="Préparation" active={order.status !== 'pending'} />
                  <Step icon={<Truck />} label="Expédiée" active={order.status === 'shipped' || order.status === 'delivered'} />
                  <Step icon={<CheckCircle2 />} label="Livrée" active={order.status === 'delivered'} last />
               </div>

               <Separator className="bg-white/5 mb-8" />

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 border border-green-500/20">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase italic tracking-tighter text-lg">Status : {order.status.toUpperCase()}</h4>
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mt-1">Dernière mise à jour : {new Date().toLocaleDateString()}</p>
                  </div>
               </div>
            </section>

            {/* Items List */}
            <section className="bg-zinc-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                  <Package className="text-cedra-500" size={20} />
                  Articles Commandés
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {(order as any).items?.map((item: any, index: number) => (
                  <div key={index} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-zinc-950 rounded-xl border border-white/5 flex items-center justify-center p-2 relative overflow-hidden">
                        {item.product?.images?.[0] ? (
                          <Image 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            fill
                            className="object-contain p-2" 
                          />
                        ) : (
                          <Package className="text-zinc-800" size={24} />
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">{item.product?.name || "Produit"}</h4>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">SKU: {item.product?.sku || "N/A"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-black italic tracking-tighter text-lg">€{item.price?.toFixed(2)}</div>
                      <div className="text-[10px] text-zinc-600 font-bold uppercase">Qté: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Delivery Info */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-3xl">
              <h4 className="text-xs font-black text-cedra-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <MapPin size={14} /> Livraison
              </h4>
              <div className="text-zinc-300 space-y-1">
                <p className="font-bold text-white">Chantier Principal SA</p>
                <p className="text-sm">Rue du Commerce 15</p>
                <p className="text-sm">1000 Bruxelles</p>
                <p className="text-sm">Belgique</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-3xl">
              <h4 className="text-xs font-black text-cedra-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <CreditCard size={14} /> Paiement
              </h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center border border-white/5 text-[10px] font-black text-zinc-500 italic">
                  VISA
                </div>
                <div className="text-sm text-zinc-400">
                  <p className="text-white font-medium">**** **** **** 4589</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold">Transaction approuvée</p>
                </div>
              </div>
              
              <Separator className="bg-white/5 mb-6" />

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <span>Sous-total</span>
                  <span className="text-white">€{order.total_amount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <span>TVA (21%)</span>
                  <span className="text-white">€{(order.total_amount * 0.21).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Total</span>
                  <span className="text-3xl font-black text-cedra-500 italic tracking-tighter">€{(order.total_amount * 1.21).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, label, active, last, date }: { icon: React.ReactNode, label: string, active: boolean, last?: boolean, date?: string }) {
  return (
    <div className={`flex flex-col items-center flex-1 relative ${!last && 'md:after:content-[""] md:after:absolute md:after:top-6 md:after:left-[calc(50%+2rem)] md:after:right-[-2rem] md:after:h-[1px] md:after:bg-white/5'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${active ? 'bg-cedra-500 text-white border-cedra-500 shadow-[0_0_20px_rgba(230,0,35,0.3)]' : 'bg-zinc-900 text-zinc-700 border-white/5'}`}>
        {icon}
      </div>
      <div className="mt-4 text-center">
        <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-zinc-700'}`}>{label}</p>
        {date && <p className="text-[8px] font-bold text-zinc-600 mt-1 uppercase">{date}</p>}
      </div>
    </div>
  );
}
