import React from "react";
import { Loader2, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  items: any[];
  subtotal: number;
  loading: boolean;
}

export function OrderSummary({ items, subtotal, loading }: OrderSummaryProps) {
  const vat = subtotal * 0.21;
  const total = subtotal + vat;

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-32 space-y-8">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cedra-500/10 blur-3xl -z-10" />

          <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-8 border-b border-white/5 pb-4">
            Résumé de la Commande
          </h3>

          <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white italic uppercase tracking-tighter line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Qté: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-black text-white italic tracking-tighter">
                  €{item.total.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex justify-between text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <span>Sous-total HT</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <span>TVA (21%)</span>
              <span>€{vat.toFixed(2)}</span>
            </div>
            <Separator className="bg-white/5 my-4" />
            <div className="flex justify-between items-end">
              <span className="text-sm font-black text-white uppercase tracking-widest">
                Total TTC
              </span>
              <span className="text-4xl font-black text-cedra-500 italic tracking-tighter font-display">
                €{total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-10 h-16 bg-white text-black hover:bg-cedra-500 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_15px_30px_-10px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Confirmer la Commande
              </>
            )}
          </Button>

          <p className="mt-6 text-[10px] text-center text-zinc-500 font-medium italic">
            En cliquant sur &quot;Confirmer&quot;, vous acceptez nos CGV et conditions de
            vente B2B.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-3">
            <ShieldCheck className="text-cedra-500 w-6 h-6" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white leading-tight">
              Paiement 100% Sécurisé
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center gap-3">
            <Truck className="text-cedra-500 w-6 h-6" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white leading-tight">
              Livraison Express 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
