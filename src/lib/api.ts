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

async function safeFetch(url: string, options: RequestInit) {
    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        console.error("Network error or API unavailable:", error);
        // Return a mock failed response to be handled by handleResponse
        return {
            ok: false,
            status: 503,
            json: async () => ({ message: "API is currently unavailable. Please try again later." })
        } as Response;
    }
}

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
        register: async (data: RegisterRequest): Promise<AuthResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        registerBusiness: async (data: RegisterBusinessRequest): Promise<AuthResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/auth/register/business`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        login: async (data: LoginRequest): Promise<AuthResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        me: async (token: string): Promise<any> => {
            const response = await safeFetch(`${API_BASE_URL}/api/auth/me`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    products: {
        create: async (token: string, data: CreateProductRequest): Promise<Product> => {
            const response = await safeFetch(`${API_BASE_URL}/api/products`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        search: async (query: string): Promise<Product[]> => {
            const response = await safeFetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: getHeaders()
            });
            return handleResponse(response);
        }
    },

    cart: {
        addItem: async (token: string, data: AddToCartRequest): Promise<Cart> => {
            const response = await safeFetch(`${API_BASE_URL}/api/cart/items`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        get: async (token: string): Promise<Cart> => {
            const response = await safeFetch(`${API_BASE_URL}/api/cart`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        },
        clear: async (token: string): Promise<void> => {
            const response = await safeFetch(`${API_BASE_URL}/api/cart`, {
                method: 'DELETE',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    orders: {
        create: async (token: string, data: CreateOrderRequest = {}): Promise<Order> => {
            const response = await safeFetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    companies: {
        inviteUser: async (token: string, companyId: string, data: InviteUserRequest): Promise<{ message: string }> => {
            const response = await safeFetch(`${API_BASE_URL}/api/companies/${companyId}/users`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    quotes: {
        create: async (token: string, data: CreateQuoteRequest): Promise<Quote> => {
            const response = await safeFetch(`${API_BASE_URL}/api/quotes`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    ai: {
        generateDescription: async (token: string, data: GenerateDescriptionRequest): Promise<GeneratedDescriptionResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/ai/descriptions/generate`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        translateDescription: async (token: string, productId: string, lang: string): Promise<GeneratedDescriptionResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/ai/descriptions/translate`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify({ product_id: productId, target_language: lang })
            });
            return handleResponse(response);
        },
        getForecast: async (token: string, productId: string): Promise<ForecastResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/analytics/forecast/${productId}`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        },
        getTrends: async (token: string): Promise<any> => {
            const response = await safeFetch(`${API_BASE_URL}/api/analytics/forecast/trends`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    visualSearch: {
        search: async (token: string, data: VisualSearchRequest): Promise<VisualSearchResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/search/visual`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        },
        history: async (token: string): Promise<any> => {
            const response = await safeFetch(`${API_BASE_URL}/api/search/visual/history`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    voice: {
        intent: async (token: string, data: VoiceCommandRequest): Promise<VoiceIntentResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/voice/intent`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    fraud: {
        getScore: async (token: string, userId: string): Promise<FraudScoreResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/fraud/score/${userId}`, {
                method: 'GET',
                headers: getHeaders(token)
            });
            return handleResponse(response);
        }
    },

    logistics: {
        optimizeRoutes: async (token: string, data: OptimizationRequest): Promise<RouteOptimizationResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/logistics/optimize-routes`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    },

    integrations: {
        sendPeppolInvoice: async (token: string, data: SendPeppolInvoiceRequest): Promise<PeppolResponse> => {
            const response = await safeFetch(`${API_BASE_URL}/api/peppol/invoice`, {
                method: 'POST',
                headers: getHeaders(token),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        }
    }
};