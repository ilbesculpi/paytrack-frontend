import { LoanJson, PaymentJson, CustomerJson, AssociateJson } from './types';


export class Loan implements LoanJson {

    id: string = '';
    user_id: number = 0;
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
    payments: PaymentJson[] = [];

    constructor(data: Partial<LoanJson> = {}) {
        Object.assign(this, data);
    }

}
