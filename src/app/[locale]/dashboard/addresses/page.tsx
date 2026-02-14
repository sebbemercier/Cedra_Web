"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Address } from "@/types";
import { Button } from "@/components/ui/button";
import { AddressList } from "@/components/pages/dashboard/addresses/AddressList";
import { AddressForm } from "@/components/pages/dashboard/addresses/AddressForm";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "", // Label for the address e.g. "Home"
    recipient_name: "",
    street: "",
    number: "",
    box: "",
    postal_code: "",
    city: "",
    country: "Belgium",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await api.addresses.list(token);
      setAddresses(data);
    } catch (err) {
      console.error("Failed to load addresses", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      await api.addresses.create(token, formData);
      await loadAddresses();
      setShowCreateForm(false);
      setFormData({
        name: "",
        recipient_name: "",
        street: "",
        number: "",
        box: "",
        postal_code: "",
        city: "",
        country: "Belgium",
        email: "",
        phone: "",
      });
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Failed to create address");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              <MapPin size={14} />
              <span>Logistics Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tighter italic uppercase text-white">
              My <span className="text-red-600">Addresses</span>
            </h1>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="rounded-xl h-12 bg-white/10 hover:bg-red-600 text-white border border-white/10 hover:border-red-600 transition-all font-bold tracking-wider uppercase text-[10px]"
          >
            <Plus size={16} className="mr-2" />
            Add New Location
          </Button>
        </header>

        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <AddressForm
                formData={formData}
                setFormData={setFormData}
                handleCreate={handleCreate}
                isCreating={isCreating}
                error={error}
                setShowCreateForm={setShowCreateForm}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-red-600" />
          </div>
        ) : (
          <AddressList addresses={addresses} />
        )}
      </div>
    </div>
  );
}