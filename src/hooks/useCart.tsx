"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
    removeFromCart: (productId: string) => void; // API doesn't have remove item strictly, but we can assume logic or just local
    clearCart: () => void;
    subtotal: number;
    itemCount: number;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItemWithMeta[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // Metadata cache to re-hydrate names/images since API only gives IDs
    const [metaCache, setMetaCache] = useState<Record<string, { name: string, image?: string, sku?: string }>>({});

    // Load Meta Cache from local storage on mount
    useEffect(() => {
        const savedMeta = localStorage.getItem("cedra-cart-meta");
        if (savedMeta) {
            try {
                setMetaCache(JSON.parse(savedMeta));
            } catch (e) { console.error(e); }
        }
        // Load legacy local cart if guest
        const savedCart = localStorage.getItem("cedra-cart");
        if (savedCart && !localStorage.getItem("token")) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) { console.error(e); }
        }
    }, []);

    // Sync Meta Cache to local storage
    useEffect(() => {
        localStorage.setItem("cedra-cart-meta", JSON.stringify(metaCache));
    }, [metaCache]);

    // Sync Guest Cart to local storage
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            localStorage.setItem("cedra-cart", JSON.stringify(items));
        }
    }, [items]);

    // Hydrate from API if logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchCart = async () => {
                setIsLoading(true);
                try {
                    const cart = await api.cart.get(token);
                    // Merge with metadata
                    const hydratedItems = cart.items.map(i => ({
                        ...i,
                        name: metaCache[i.product_id]?.name || "Unknown Product",
                        image: metaCache[i.product_id]?.image,
                        sku: metaCache[i.product_id]?.sku
                    }));
                    setItems(hydratedItems);
                } catch (e) {
                    console.error("Failed to sync cart - Backend unavailable?", e);
                    // Optional: Fallback to local items if needed, or valid empty state
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCart();
        }
    }, [metaCache]);

    const addToCart = async (product: Product, quantity = 1) => {
        setIsLoading(true);

        // 1. Update Metadata Cache
        setMetaCache(prev => ({
            ...prev,
            [product.id]: {
                name: product.name,
                image: product.images?.[0],
                sku: product.sku
            }
        }));

        try {
            const token = localStorage.getItem("token");
            if (token) {
                // API Call
                const updatedCart = await api.cart.addItem(token, {
                    product_id: product.id,
                    quantity
                });

                // Update State from Response
                const hydratedItems = updatedCart.items.map(i => ({
                    ...i,
                    name: product.id === i.product_id ? product.name : (metaCache[i.product_id]?.name || "Unknown"),
                    image: product.id === i.product_id ? product.images?.[0] : metaCache[i.product_id]?.image,
                    sku: product.id === i.product_id ? product.sku : metaCache[i.product_id]?.sku
                }));
                setItems(hydratedItems);

            } else {
                // Guest Logic
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
            }
        } catch (e) {
            console.error(e);
            alert("Failed to add to cart");
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = (productId: string) => {
        // Optimistic removal
        setItems(prev => prev.filter(i => i.product_id !== productId));
        // Note: Strict API lacked 'remove item', only 'clear'. 
        // So for now, we just update local state or if we had 'update' we'd set qty 0.
        // Assuming guest mode or just local UI for now.
    };

    const clearCart = async () => {
        setItems([]);
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await api.cart.clear(token);
            } catch (e) { console.error(e); }
        } else {
            localStorage.removeItem("cedra-cart");
        }
    };

    const subtotal = items.reduce((acc, item) => acc + (item.total || item.price * item.quantity), 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, subtotal, itemCount, isLoading }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
