import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    RegisterBusinessRequest,
    Product,
    CreateProductRequest,
    Cart,
    AddToCartRequest,
    Order,
    CreateOrderRequest,
    InviteUserRequest,
    Quote,
    CreateQuoteRequest,
    GenerateDescriptionRequest,
    GeneratedDescriptionResponse,
    ForecastResponse,
    PeppolResponse,
    SendPeppolInvoiceRequest,
    VisualSearchRequest,
    VisualSearchResponse,
    VoiceCommandRequest,
    VoiceIntentResponse,
    FraudScoreResponse,
    OptimizationRequest,
    RouteOptimizationResponse
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

const getHeaders = (token?: string) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const api = {
    auth: {
        // 1. Inscription Particulier
        register: async (data: RegisterRequest): Promise<AuthResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        // 2. Inscription Entreprise
        registerBusiness: async (data: RegisterBusinessRequest): Promise<AuthResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/auth/register/business`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        // 3. Connexion
        login: async (data: LoginRequest): Promise<AuthResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        // Helper for ME (not explicitly in 12 points but needed for auth state)
        me: async (token: string): Promise<any> => {
            const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    products: {
        // 4. Créer un Produit
        create: async (token: string, data: CreateProductRequest): Promise<Product> => {
            const response = await fetch(`${API_BASE_URL}/api/products`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        // 5. Rechercher des Produits
        search: async (query: string): Promise<Product[]> => {
            const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: getHeaders()
            });
            return handleResponse(response);
        }
    },

    cart: {
        // 6. Ajouter au Panier
        addItem: async (token: string, data: AddToCartRequest): Promise<Cart> => {
            const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        // Helper to GET cart (Standard convention, usually implied)
        get: async (token: string): Promise<Cart> => {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        },
        // Helper to CLEAR
        clear: async (token: string): Promise<void> => {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: 'DELETE',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    orders: {
        // 7. Créer une Commande
        create: async (token: string, data: CreateOrderRequest = {}): Promise<Order> => {
            const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    companies: {
        // 8. Ajouter un Utilisateur
        inviteUser: async (token: string, companyId: string, data: InviteUserRequest): Promise<{ message: string }> => {
            const response = await fetch(`${API_BASE_URL}/api/companies/${companyId}/users`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    quotes: {
        // 9. Demander un Devis
        create: async (token: string, data: CreateQuoteRequest): Promise<Quote> => {
            const response = await fetch(`${API_BASE_URL}/api/quotes`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    ai: {
        // 10. Générer Description Produit
        generateDescription: async (token: string, data: GenerateDescriptionRequest): Promise<GeneratedDescriptionResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/ai/descriptions/generate`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        translateDescription: async (token: string, productId: string, lang: string): Promise<GeneratedDescriptionResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/ai/descriptions/translate`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify({ product_id: productId, target_language: lang })
            });
            return handleResponse(response);
        },
        // 11. Prévision de Ventes
        getForecast: async (token: string, productId: string): Promise<ForecastResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/analytics/forecast/${productId}`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        },
        getTrends: async (token: string): Promise<any> => {
            const response = await fetch(`${API_BASE_URL}/api/analytics/forecast/trends`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    visualSearch: {
        search: async (token: string, data: VisualSearchRequest): Promise<VisualSearchResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/search/visual`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        history: async (token: string): Promise<any> => {
            const response = await fetch(`${API_BASE_URL}/api/search/visual/history`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    voice: {
        intent: async (token: string, data: VoiceCommandRequest): Promise<VoiceIntentResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/voice/intent`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    fraud: {
        getScore: async (token: string, userId: string): Promise<FraudScoreResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/fraud/score/${userId}`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    logistics: {
        optimizeRoutes: async (token: string, data: OptimizationRequest): Promise<RouteOptimizationResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/logistics/optimize-routes`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    integrations: {
        // 12. Envoyer Facture PEPPOL
        sendPeppolInvoice: async (token: string, data: SendPeppolInvoiceRequest): Promise<PeppolResponse> => {
            const response = await fetch(`${API_BASE_URL}/api/peppol/invoice`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    }
};
