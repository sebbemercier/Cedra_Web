import React from "react";
import { Truck, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function ShippingSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-cedra-500/10 rounded-xl flex items-center justify-center text-cedra-500">
          <Truck size={20} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Livraison
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Prénom
          </Label>
          <Input
            id="firstName"
            required
            className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Nom
          </Label>
          <Input
            id="lastName"
            required
            className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="address"
          className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
        >
          Adresse
        </Label>
        <Input
          id="address"
          required
          className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label
            htmlFor="city"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Ville
          </Label>
          <Input
            id="city"
            required
            className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="zip"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
          >
            Code Postal
          </Label>
          <Input
            id="zip"
            required
            className="bg-white/5 border-white/10 h-14 rounded-xl focus:border-cedra-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
        <Checkbox id="saveAddress" className="border-white/20 data-[state=checked]:bg-cedra-500 data-[state=checked]:border-cedra-500" />
        <Label 
          htmlFor="saveAddress" 
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 cursor-pointer flex items-center gap-2"
        >
          <Bookmark size={12} className="text-cedra-500" />
          Sauvegarder cette adresse pour mes prochaines commandes
        </Label>
      </div>
    </section>
  );
}
