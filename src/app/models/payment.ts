import { CustomerJson, LoanJson, PaymentJson } from "./types";

export class Payment implements PaymentJson {

    id: string = '';
    customer_id: string = '';
    loan_id: string = '';
    payment_date: string = '';
    payment_capital: number = 0;
    payment_interest: number = 0;
    payment_delay: number = 0;
    payment_total: number = 0;
    payment_method: string = '';
    notes: string = '';
    status: string = '';
    created_at: string = '';
    updated_at: string = '';

    customer: CustomerJson|undefined;
    loan: LoanJson | undefined;

    constructor(data: Partial<PaymentJson> = {}) {
        Object.assign(this, data);
    }

}
