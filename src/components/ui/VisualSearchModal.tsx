"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Search, Sparkles, FileSearch } from "lucide-react";

interface VisualSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VisualSearchModal({ isOpen, onClose }: VisualSearchProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                simulateSearch();
            };
            reader.readAsDataURL(file);
        }
    };

    const simulateSearch = () => {
        setIsUploading(true);
        // Simulate Elasticsearch k-NN processing
        setTimeout(() => {
            setIsUploading(false);
            // In a real app, we would redirect to search results with the image vector ID
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden relative z-10"
                    >
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600">
                                    <Camera size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tighter italic text-white line-clamp-1">AI Visual Search</h2>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Powered by Elasticsearch k-NN</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 text-center">
                            {!preview ? (
                                <label className="group relative block cursor-pointer">
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    <div className="aspect-video rounded-3xl border-2 border-dashed border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600/5 transition-all flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-red-500 group-hover:scale-110 transition-all">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">Drop an architectural part or photo</p>
                                            <p className="text-white/30 text-sm mt-1 uppercase font-black tracking-widest">or click to browse local storage</p>
                                        </div>
                                    </div>
                                </label>
                            ) : (
                                <div className="space-y-8">
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 mx-auto max-w-sm shadow-2xl shadow-red-600/10">
                                        <Image
                                            src={preview}
                                            alt="Upload Preview"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                                                <div className="flex items-center gap-2 text-white font-black uppercase tracking-[0.2em]">
                                                    <Sparkles className="animate-spin text-red-600" size={24} />
                                                    <span>Analyzing Vectors...</span>
                                                </div>
                                                <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 2 }}
                                                        className="h-full bg-red-600"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {!isUploading && (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center gap-2 text-green-500 font-black uppercase tracking-widest text-xs">
                                                <FileSearch size={16} />
                                                Match found in ScyllaDB
                                            </div>
                                            <button className="px-10 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-700 transition-all">
                                                View Matches
                                            </button>
                                            <button onClick={() => setPreview(null)} className="text-white/20 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                                                Retry with another image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-black border-t border-white/5 flex items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Elasticsearch k-NN</span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">FastHTTP Network</span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Ollama Vision</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
