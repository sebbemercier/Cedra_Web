export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'buyer' | 'viewer' | 'customer' | 'company_admin';
    company_id?: string;
}

export interface AuthResponse {
    token: string; // JWT
    expires_at: string;
    requires_2fa?: boolean;
}

// 1. Inscription Particulier
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

// 2. Inscription B2B
export interface RegisterBusinessRequest {
    name: string;
    email: string;
    password: string;
    company_name: string;
    vat_number: string;
    street: string;
    number: string;
    postal_code: string;
    city: string;
    country: string;
    sector?: string;
    company_size?: string;
}

// 3. Login
export interface LoginRequest {
    email: string;
    password: string;
}

// 4 & 5. Products
export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    currency: string;
    category_id?: string;
    inventory_count: number;
    images: string[];
    score?: number; // For search results
}

export interface CreateProductRequest {
    name: string;
    description: string;
    sku: string;
    price: number;
    currency: string;
    category_id: string;
    inventory_count: number;
    images: string[];
}

// 6. Cart
export interface CartItem {
    product_id: string;
    quantity: number;
    price: number;
    total: number;
    // Optional for UI convenience if hydration happens
    name?: string;
    image?: string;
}

export interface Cart {
    id: string;
    items: CartItem[];
    total_amount: number;
}

export interface AddToCartRequest {
    product_id: string;
    quantity: number;
}

// 7. Orders
export interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Order {
    id: string;
    status: 'pending_payment' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    created_at: string;
    po_number?: string;
    shipping_method?: string;
}

export interface CreateOrderRequest {
    shipping_method?: string;
    po_number?: string;
}

// 8. Company Users
export interface InviteUserRequest {
    email: string;
    role: 'admin' | 'buyer' | 'viewer';
}

// 9. Quotes
export interface QuoteItemRequest {
    product_id: string;
    quantity: number;
}

export interface CreateQuoteRequest {
    items: QuoteItemRequest[];
    notes?: string;
}

export interface Quote {
    id: string;
    status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'converted';
    total_estimated: number;
}

// 10. AI Description
export interface GenerateDescriptionRequest {
    product_name: string;
    features: string[];
    tone: 'professional' | 'casual' | 'technical';
    language: string;
}

export interface GeneratedDescriptionResponse {
    description: string;
    tags: string[];
}

// 11. Analytics Forecast
export interface ForecastResponse {
    product_id: string;
    current_stock: number;
    forecast_next_30_days: number;
    recommendation: 'restock_immediately' | 'reorder_soon' | 'sufficient_stock';
    confidence_score: number;
}

// 12. Peppol
export interface SendPeppolInvoiceRequest {
    order_id: string;
}

export interface PeppolResponse {
    message: string;
    document_id: string;
    status: 'processing' | 'sent' | 'failed';
}

// 13. Visual Search
export interface VisualSearchRequest {
    image_base64?: string;
    image_url?: string;
}

export interface VisualSearchResponse {
    search_id: string;
    matches: Product[];
}

// 14. Voice Commerce
export interface VoiceCommandRequest {
    audio_blob_base64: string;
}

export interface VoiceIntentResponse {
    intent: 'search' | 'add_to_cart' | 'status' | 'unknown';
    entities: Record<string, any>;
    text: string;
}

// 15. Fraud
export interface FraudScoreResponse {
    score: number; // 0-100
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    reasons: string[];
}

// 16. Logistics
export interface OptimizationRequest {
    orders: string[]; // Order IDs
}

export interface RouteOptimizationResponse {
    route_id: string;
    estimated_distance: number;
    stops: any[];
}
