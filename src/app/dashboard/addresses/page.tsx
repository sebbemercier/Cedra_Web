"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, Home, Building2, Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { Address } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AddressesPage() {
    const router = useRouter();
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
        phone: ""
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

            await api.addresses.createPersonal(token, formData);
            await loadAddresses();
            setShowCreateForm(false);
            setFormData({
                name: "", recipient_name: "", street: "", number: "", box: "", postal_code: "", city: "", country: "Belgium", email: "", phone: ""
            });
        } catch (err: any) {
            setError(err.message || "Failed to create address");
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
                            <div className="bg-zinc-950 border border-white/10 p-8 rounded-[2rem] relative">
                                <h3 className="text-xl font-bold text-white mb-6">New Delivery Point</h3>
                                <form onSubmit={handleCreate} className="space-y-6">
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3"
                                            >
                                                <AlertCircle className="text-red-500" size={16} />
                                                <p className="text-red-500 text-xs font-bold">{error}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Location Label (e.g. Home)</Label>
                                            <Input placeholder="Home" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                        <div>
                                            <Label>Recipient Name</Label>
                                            <Input placeholder="John Doe" value={formData.recipient_name} onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-3">
                                            <Label>Street</Label>
                                            <Input placeholder="Rue de la Loi" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                        <div>
                                            <Label>No.</Label>
                                            <Input placeholder="16" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <Label>Box</Label>
                                            <Input placeholder="B" value={formData.box} onChange={(e) => setFormData({ ...formData, box: e.target.value })} className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label>Zip</Label>
                                            <Input placeholder="1000" value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                        <div className="col-span-2">
                                            <Label>City</Label>
                                            <Input placeholder="Brussels" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="bg-white/5 border-white/10" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Contact Email</Label>
                                            <Input type="email" placeholder="contact@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border-white/10" />
                                        </div>
                                        <div>
                                            <Label>Contact Phone</Label>
                                            <Input type="tel" placeholder="+32..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white/5 border-white/10" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => setShowCreateForm(false)} className="text-white/40 hover:text-white">Cancel</Button>
                                        <Button type="submit" disabled={isCreating} className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[10px] w-32">
                                            {isCreating ? <Loader2 className="animate-spin" /> : "Save"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin text-red-600" />
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="text-center py-20 border border-white/10 rounded-[2.5rem] bg-white/5 border-dashed">
                        <MapPin className="mx-auto text-white/20 mb-4" size={48} />
                        <h3 className="text-white font-bold text-lg">No addresses found</h3>
                        <p className="text-white/40 text-sm mt-2">Add a delivery location to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {addresses.map((addr) => (
                            <motion.div
                                key={addr.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl group hover:border-red-600/30 transition-colors relative"
                            >
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-white/20 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    {addr.company ? (
                                        <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-3">
                                            <Building2 size={20} />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mb-3">
                                            <Home size={20} />
                                        </div>
                                    )}
                                    <h3 className="text-white font-bold text-lg">{addr.name}</h3>
                                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{addr.recipient_name}</p>
                                </div>

                                <div className="space-y-1 text-sm text-white/70 leading-relaxed font-medium">
                                    <p>{addr.street} {addr.number} {addr.box}</p>
                                    <p>{addr.postal_code} {addr.city}</p>
                                    <p className="text-white/40">{addr.country}</p>
                                </div>

                                {(addr.email || addr.phone) && (
                                    <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                                        {addr.email && <p className="text-[10px] text-white/40 truncate">{addr.email}</p>}
                                        {addr.phone && <p className="text-[10px] text-white/40">{addr.phone}</p>}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
