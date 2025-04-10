import { CustomerJson, LoanJson, PaymentJson } from "./types";

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
    avatar_url?: string;

    loans?: LoanJson[];
    payments?: PaymentJson[];

    constructor(data: Partial<CustomerJson> = {}) {
        Object.assign(this, data);
    }

}
