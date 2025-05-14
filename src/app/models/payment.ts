import { Customer } from "./customer";
import { Loan } from "./loan";
import { CustomerJson, LoanJson, PaymentJson } from "./types";

export class Payment implements PaymentJson {

    id: string = '';
    customer_id: string = '';
    loan_id: string = '';
    amount: number = 0;
    due_date: string = '';
    payment_date: string = '';
    payment_total: number = 0;
    payment_capital: number = 0;
    payment_interest: number = 0;
    payment_delay: number = 0;
    payment_method: string = '';
    notes: string = '';
    status: string = '';
    created_at: string = '';
    updated_at: string = '';

    customer?: Customer;
    loan?: Loan;

    constructor(data: Partial<PaymentJson> = {}) {
        Object.assign(this, data);
        this.customer = data.customer ? new Customer(data.customer) : undefined;
        this.loan = data.loan ? new Loan(data.loan) : undefined;
    }

}
