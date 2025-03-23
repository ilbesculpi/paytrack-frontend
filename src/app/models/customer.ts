
interface LoanJson {
    id: string;
    user_id: number;
    customer_id: string;
    initial_capital: number;
    capital: number;
    interest_rate: number;
    payment_amount: number;
    method: string;
    terms: number;
    start_date: string;
    end_date: string;
    frequency: string;
    pay_day: number;
    payments_remaining: number;
    payments_received: number;
    payments_overdue: number;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string;
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
}

export class Customer implements CustomerJson {

    id?: string;
    user_id?: number;
    full_name: string = '';
    document_id: string = '';
    telephone: string = '';
    email: string = '';
    company: string = '';
    address: string = '';
    notes: string = '';
    created_at?: string;
    updated_at?: string;

    loans?: LoanJson[];

    constructor(data: Partial<CustomerJson> = {}) {
        Object.assign(this, data);
    }

}
