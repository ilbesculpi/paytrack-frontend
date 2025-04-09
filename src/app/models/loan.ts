interface CustomerJson {
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

interface AssociateJson {
    id?: string;
    full_name: string;
    email: string;
    telephone: string;
    notes: string;
}

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

    customer: CustomerJson;
    associates: AssociateJson[];
}

export class Loan implements LoanJson {

    id?: string;
    user_id?: number;
    customer_id: string = '';
    initial_amount: number = 0;
    current_amount: number = 0;
    interest_method: string = '';
    interest_rate: number = 0;
    payment_amount: number = 0;
    start_date: string = '';
    end_date: string = '';
    terms: number = 0;
    terms_unit: string = '';
    pay_day: number = 0;
    payments_remaining: number = 0;
    payments_received: number = 0;
    payments_overdue: number = 0;
    status: string = '';
    notes?: string;
    created_at?: string;
    updated_at?: string;

    customer!: CustomerJson;
    associates: AssociateJson[] = [];

    constructor(data: Partial<LoanJson> = {}) {
        Object.assign(this, data);
    }

}
