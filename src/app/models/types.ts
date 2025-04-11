
export interface LoanJson {
    id?: string;
    user_id?: number;
    customer_id: string;
    initial_amount: number;
    current_amount: number;
    interest_method: string;
    interest_rate: number;
    payment_amount: number;
    start_date: string;
    end_date: string;
    terms: number;
    terms_unit: string;
    pay_day: number;
    payments_remaining: number;
    payments_received: number;
    payments_overdue: number;
    status: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;

    // customer: CustomerJson;
    // associates: AssociateJson[];
}


export interface CustomerJson {
    id?: string;
    user_id?: number;
    full_name: string;
    document_id: string;
    telephone: string;
    email: string;
    company: string;
    address: string;
    notes: string;
    created_at?: string;
    updated_at?: string;
    avatar_url?: string;
}

export interface PaymentJson {
    id?: string;
    customer_id: string;
    loan_id: string;
    payment_date: string;
    payment_capital: number;
    payment_interest: number;
    payment_delay: number;
    payment_total: number;
    payment_method: string;
    notes: string;
    status: string;
    create_at: string;
    updated_at: string;
}

export interface AssociateJson {
    id?: string;
    full_name: string;
    email: string;
    telephone: string;
    notes: string;
}
