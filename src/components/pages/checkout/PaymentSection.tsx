import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Landmark, Clock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function PaymentSection() {
  const [method, setMethod] = useState<"card" | "transfer" | "net30">("card");

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cedra-500/10 rounded-xl flex items-center justify-center text-cedra-500">
          <CreditCard size={20} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Paiement
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Method: Card */}
        <div 
          onClick={() => setMethod("card")}
          className={cn(
            "flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all border",
            method === "card" 
              ? "bg-cedra-500/5 border-cedra-500 shadow-[0_0_20px_rgba(230,0,35,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              method === "card" ? "bg-cedra-500 text-white" : "bg-zinc-800 text-zinc-500"
            )}>
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-white italic uppercase tracking-tighter">
                Carte de Crédit / Débit
              </p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Visa, Mastercard, Bancontact
              </p>
            </div>
          </div>
          {method === "card" && <CheckCircle2 className="text-cedra-500" size={20} />}
        </div>

        {/* Method: Transfer */}
        <div 
          onClick={() => setMethod("transfer")}
          className={cn(
            "flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all border",
            method === "transfer" 
              ? "bg-cedra-500/5 border-cedra-500 shadow-[0_0_20px_rgba(230,0,35,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              method === "transfer" ? "bg-cedra-500 text-white" : "bg-zinc-800 text-zinc-500"
            )}>
              <Landmark size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-white italic uppercase tracking-tighter">
                Virement Bancaire
              </p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Traitement sous 24-48h
              </p>
            </div>
          </div>
          {method === "transfer" && <CheckCircle2 className="text-cedra-500" size={20} />}
        </div>

        {/* Method: Net30 */}
        <div 
          onClick={() => setMethod("net30")}
          className={cn(
            "flex items-center justify-between p-6 rounded-2xl cursor-pointer transition-all border",
            method === "net30" 
              ? "bg-cedra-500/5 border-cedra-500 shadow-[0_0_20px_rgba(230,0,35,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              method === "net30" ? "bg-cedra-500 text-white" : "bg-zinc-800 text-zinc-500"
            )}>
              <Clock size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-black text-white italic uppercase tracking-tighter">
                  Paiement à 30 jours
                </p>
                <span className="bg-cedra-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Pro</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Réservé aux comptes Pro validés
              </p>
            </div>
          </div>
          {method === "net30" && <CheckCircle2 className="text-cedra-500" size={20} />}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {method === "card" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 space-y-6 backdrop-blur-3xl"
          >
            <div className="space-y-2">
              <Label
                htmlFor="cardNum"
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
              >
                Numéro de Carte
              </Label>
              <Input
                id="cardNum"
                placeholder="0000 0000 0000 0000"
                className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500 text-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="expiry"
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
                >
                  Expiration
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="cvv"
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
                >
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {method === "transfer" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl"
          >
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              Les instructions de virement vous seront envoyées par email immédiatement après la validation de votre commande. La commande sera expédiée dès réception du paiement.
            </p>
          </motion.div>
        )}

        {method === "net30" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl"
          >
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              En choisissant ce mode, vous confirmez que votre entreprise bénéficie d&apos;une ligne de crédit active chez CEDRA. Une facture avec échéance à 30 jours sera générée.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
