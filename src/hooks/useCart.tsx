"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product, CartItem } from "@/types";
import { api } from "@/lib/api";

type CartItemWithMeta = CartItem & {
    name: string;
    image?: string;
    sku?: string;
};

interface CartContextType {
    items: CartItemWithMeta[];
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    removeFromCart: (productId: string) => void; 
    clearCart: () => void;
    subtotal: number;
    itemCount: number;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItemWithMeta[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [metaCache, setMetaCache] = useState<Record<string, { name: string, image?: string, sku?: string }>>({});
    const isFirstRender = useRef(true);

    // Load Meta Cache and Local Cart from local storage on mount ONLY
    useEffect(() => {
        if (!isFirstRender.current) return;
        isFirstRender.current = false;

        const savedMeta = localStorage.getItem("cedra-cart-meta");
        let initialMeta = {};
        if (savedMeta) {
            try {
                initialMeta = JSON.parse(savedMeta);
                setMetaCache(initialMeta);
            } catch (e) { console.error(e); }
        }

        const token = localStorage.getItem("token");
        // Always try to load local cart first as a starting point
        const savedCart = localStorage.getItem("cedra-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) { console.error(e); }
        }

        if (token) {
            // Fetch from API if token exists
            const fetchCart = async () => {
                setIsLoading(true);
                try {
                    const cart = await api.cart.get(token);
                    const hydratedItems = cart.items.map(i => ({
                        ...i,
                        name: (initialMeta as any)[i.product_id]?.name || "Unknown Product",
                        image: (initialMeta as any)[i.product_id]?.image,
                        sku: (initialMeta as any)[i.product_id]?.sku
                    }));
                    setItems(hydratedItems);
                } catch (e) {
                    console.error("Failed to sync cart with API - using local state:", e);
                    // Keep using the items already loaded from localStorage
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCart();
        }
    }, []);

    // Sync Meta Cache to local storage
    useEffect(() => {
        if (Object.keys(metaCache).length > 0) {
            localStorage.setItem("cedra-cart-meta", JSON.stringify(metaCache));
        }
    }, [metaCache]);

    // Sync Cart to local storage (both Guest and Auth for fallback)
    useEffect(() => {
        localStorage.setItem("cedra-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = async (product: Product, quantity = 1) => {
        setIsLoading(true);

        const meta = {
            name: product.name,
            image: product.images?.[0],
            sku: product.sku
        };

        setMetaCache(prev => ({
            ...prev,
            [product.id]: meta
        }));

        try {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const updatedCart = await api.cart.addItem(token, {
                        product_id: product.id,
                        quantity
                    });

                    const hydratedItems = updatedCart.items.map(i => ({
                        ...i,
                        name: i.product_id === product.id ? meta.name : (metaCache[i.product_id]?.name || "Unknown"),
                        image: i.product_id === product.id ? meta.image : metaCache[i.product_id]?.image,
                        sku: i.product_id === product.id ? meta.sku : metaCache[i.product_id]?.sku
                    }));
                    setItems(hydratedItems);
                    return; // Success
                } catch (apiError) {
                    console.error("API error while adding item, falling back to local update:", apiError);
                }
            }
            
            // Fallback or Guest Logic
            setItems(prev => {
                const existing = prev.find(i => i.product_id === product.id);
                if (existing) {
                    return prev.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + quantity, total: (i.quantity + quantity) * i.price } : i);
                }
                return [...prev, {
                    product_id: product.id,
                    quantity,
                    price: product.price,
                    total: product.price * quantity,
                    name: product.name,
                    image: product.images?.[0],
                    sku: product.sku
                }];
            });
            
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(i => i.product_id !== productId));
    };

    const clearCart = async () => {
        setItems([]);
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await api.cart.clear(token);
            } catch (e) { console.error(e); }
        }
        localStorage.removeItem("cedra-cart");
    };

    const subtotal = items.reduce((acc, item) => acc + (item.total || item.price * item.quantity), 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartProviderInternal value={{ items, addToCart, removeFromCart, clearCart, subtotal, itemCount, isLoading }}>
            {children}
        </CartProviderInternal>
    );
}

const CartProviderInternal = CartContext.Provider;

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
