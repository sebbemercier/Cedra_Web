import {
  Address,
  Company,
  User,
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
  RouteOptimizationResponse,
  AdminSummary,
  NotificationCampaign,
  Vendor,
  VendorDashboardResponse,
  InventoryMovement,
  RecommendationResponse,
  LowStockAlert,
  Shipment,
  Category,
  SubCategory,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

async function safeFetch(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Network error or API unavailable:", error);
    return {
      ok: false,
      status: 503,
      json: async () => ({
        message: "API is currently unavailable. Please try again later.",
      }),
    } as Response;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const parsedError = JSON.parse(errorBody);
      // Try to find a message in the parsed error object
      errorMessage =
        parsedError.message ||
        parsedError.error ||
        parsedError.details ||
        JSON.stringify(parsedError);
    } catch (e) {
      // If not JSON, use the raw text if available
      if (errorBody) errorMessage = errorBody;
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  auth: {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    registerBusiness: async (
      data: RegisterBusinessRequest,
    ): Promise<AuthResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/auth/register/business`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    login: async (data: LoginRequest): Promise<AuthResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    me: async (token: string): Promise<User> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    logout: async (token: string): Promise<void> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    refresh: async (token: string): Promise<{ token: string }> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    enable2FA: async (token: string, data: any): Promise<any> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/2fa/enable`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    verify2FA: async (data: any): Promise<AuthResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/auth/2fa/verify`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  admin: {
    getSummary: async (token: string): Promise<AdminSummary> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/admin/dashboard/summary`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getOrders: async (
      token: string,
      limit = 20,
      offset = 0,
      status?: string,
    ): Promise<any> => {
      let url = `${API_BASE_URL}/api/admin/orders?limit=${limit}&offset=${offset}`;
      if (status) url += `&status=${status}`;
      const response = await safeFetch(url, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    getUsers: async (
      token: string,
      limit = 20,
      offset = 0,
      role?: string,
    ): Promise<any> => {
      let url = `${API_BASE_URL}/api/admin/users?limit=${limit}&offset=${offset}`;
      if (role) url += `&role=${role}`;
      const response = await safeFetch(url, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    createCampaign: async (
      token: string,
      data: NotificationCampaign,
    ): Promise<NotificationCampaign> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/admin/campaigns/create`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    getFraudAlerts: async (
      token: string,
      limit = 10,
      offset = 0,
    ): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/admin/fraud/alerts?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getDelayedShipments: async (token: string): Promise<Shipment[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/admin/shipments/delayed`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
  },

  inventory: {
    recordMovement: async (
      token: string,
      data: any,
    ): Promise<InventoryMovement> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/inventory/movements`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    getHistory: async (
      token: string,
      productId: string,
      limit = 20,
      offset = 0,
    ): Promise<InventoryMovement[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/inventory/products/${productId}/history?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getStock: async (token: string, productId: string): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/inventory/products/${productId}/stock`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getAiAnalysis: async (token: string, productId: string): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/inventory/products/${productId}/ai-analysis`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
  },

  notifications: {
    send: async (token: string, data: any): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/notifications/send`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    updatePreferences: async (token: string, data: any): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/users/notifications/preferences`,
        {
          method: "PUT",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
  },

  recommendations: {
    getUserRecommendations: async (
      token: string,
      userId: string,
      params: any = {},
    ): Promise<RecommendationResponse> => {
      const query = new URLSearchParams(params).toString();
      const response = await safeFetch(
        `${API_BASE_URL}/api/recommendations/user/${userId}?${query}`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getSimilarProducts: async (productId: string, count = 10): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/recommendations/product/${productId}/similar?count=${count}`,
        {
          method: "GET",
          headers: getHeaders(),
        },
      );
      return handleResponse(response);
    },
    getTrending: async (category?: string, count = 20): Promise<any> => {
      let url = `${API_BASE_URL}/api/recommendations/trending?count=${count}`;
      if (category) url += `&category=${category}`;
      const response = await safeFetch(url, {
        method: "GET",
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    trackEvent: async (data: any): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/recommendations/events`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
  },

  vendors: {
    register: async (data: any): Promise<Vendor> => {
      const response = await safeFetch(`${API_BASE_URL}/api/vendors/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    getDashboard: async (
      token: string,
      vendorId?: string,
    ): Promise<VendorDashboardResponse> => {
      let url = `${API_BASE_URL}/api/vendors/dashboard`;
      if (vendorId) url += `?vendor_id=${vendorId}`;
      const response = await safeFetch(url, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    addProduct: async (token: string, data: any): Promise<any> => {
      const response = await safeFetch(`${API_BASE_URL}/api/vendors/products`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  categories: {
    list: async (): Promise<Category[]> => {
      const response = await safeFetch(`${API_BASE_URL}/api/categories`, {
        method: "GET",
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getTree: async (): Promise<Category[]> => {
      const response = await safeFetch(`${API_BASE_URL}/api/categories/tree`, {
        method: "GET",
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    getSubCategories: async (id: string): Promise<SubCategory[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/categories/${id}/subcategories`,
        {
          method: "GET",
          headers: getHeaders(),
        },
      );
      return handleResponse(response);
    },
    create: async (token: string, data: any): Promise<any> => {
      const response = await safeFetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  products: {
    create: async (
      token: string,
      data: CreateProductRequest,
    ): Promise<Product> => {
      const response = await safeFetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    search: async (query: string): Promise<Product[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: getHeaders(),
        },
      );
      return handleResponse(response);
    },
    getLowStock: async (token: string): Promise<LowStockAlert[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/products/low-stock`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    delete: async (token: string, id: string): Promise<any> => {
      const response = await safeFetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
  },

  cart: {
    addItem: async (token: string, data: AddToCartRequest): Promise<Cart> => {
      const response = await safeFetch(`${API_BASE_URL}/api/cart/items`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    get: async (token: string): Promise<Cart> => {
      const response = await safeFetch(`${API_BASE_URL}/api/cart`, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    clear: async (token: string): Promise<void> => {
      const response = await safeFetch(`${API_BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
  },

  orders: {
    create: async (
      token: string,
      data: CreateOrderRequest = {},
    ): Promise<Order> => {
      const response = await safeFetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    list: async (
      token: string,
      limit = 20,
      offset = 0,
      status?: string,
    ): Promise<any> => {
      let url = `${API_BASE_URL}/api/orders?limit=${limit}&offset=${offset}`;
      if (status) url += `&status=${status}`;
      const response = await safeFetch(url, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    get: async (token: string, id: string): Promise<Order> => {
      const response = await safeFetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
  },

  addresses: {
    list: async (token: string): Promise<Address[]> => {
      const response = await safeFetch(`${API_BASE_URL}/api/addresses`, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    create: async (
      token: string,
      data: Omit<Address, "id" | "created_at" | "updated_at">,
    ): Promise<Address> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/addresses/personal`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
  },

  companies: {
    get: async (token: string, id: string): Promise<Company> => {
      const response = await safeFetch(`${API_BASE_URL}/api/companies/${id}`, {
        method: "GET",
        headers: getHeaders(token),
      });
      return handleResponse(response);
    },
    getSpendingReport: async (token: string, id: string): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${id}/spending-report`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getUsers: async (token: string, id: string): Promise<User[]> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${id}/users`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    inviteUser: async (
      token: string,
      companyId: string,
      data: InviteUserRequest,
    ): Promise<{ message: string }> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${companyId}/users`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    removeUser: async (
      token: string,
      companyId: string,
      userId: string,
    ): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${companyId}/users/${userId}`,
        {
          method: "DELETE",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    setBudget: async (
      token: string,
      companyId: string,
      userId: string,
      budget: any,
    ): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${companyId}/users/${userId}/budget`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(budget),
        },
      );
      return handleResponse(response);
    },
    updateRole: async (
      token: string,
      companyId: string,
      userId: string,
      role: any,
    ): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/companies/${companyId}/users/${userId}/role`,
        {
          method: "PUT",
          headers: getHeaders(token),
          body: JSON.stringify(role),
        },
      );
      return handleResponse(response);
    },
  },

  quotes: {
    create: async (token: string, data: CreateQuoteRequest): Promise<Quote> => {
      const response = await safeFetch(`${API_BASE_URL}/api/quotes`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  ai: {
    generateDescription: async (
      token: string,
      data: GenerateDescriptionRequest,
    ): Promise<GeneratedDescriptionResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/ai/descriptions/generate`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
    translateDescription: async (
      token: string,
      productId: string,
      lang: string,
    ): Promise<GeneratedDescriptionResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/ai/descriptions/translate`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify({
            product_id: productId,
            target_language: lang,
          }),
        },
      );
      return handleResponse(response);
    },
    getForecast: async (
      token: string,
      productId: string,
    ): Promise<ForecastResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/analytics/forecast/${productId}`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
    getTrends: async (token: string): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/analytics/forecast/trends`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
  },

  visualSearch: {
    search: async (
      token: string,
      data: VisualSearchRequest,
    ): Promise<VisualSearchResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/search/visual`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    history: async (token: string): Promise<any> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/search/visual/history`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
  },

  voice: {
    intent: async (
      token: string,
      data: VoiceCommandRequest,
    ): Promise<VoiceIntentResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/voice/intent`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },

  fraud: {
    getScore: async (
      token: string,
      userId: string,
    ): Promise<FraudScoreResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/fraud/score/${userId}`,
        {
          method: "GET",
          headers: getHeaders(token),
        },
      );
      return handleResponse(response);
    },
  },

  logistics: {
    optimizeRoutes: async (
      token: string,
      data: OptimizationRequest,
    ): Promise<RouteOptimizationResponse> => {
      const response = await safeFetch(
        `${API_BASE_URL}/api/logistics/optimize-routes`,
        {
          method: "POST",
          headers: getHeaders(token),
          body: JSON.stringify(data),
        },
      );
      return handleResponse(response);
    },
  },

  integrations: {
    sendPeppolInvoice: async (
      token: string,
      data: SendPeppolInvoiceRequest,
    ): Promise<PeppolResponse> => {
      const response = await safeFetch(`${API_BASE_URL}/api/peppol/invoice`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },
};
