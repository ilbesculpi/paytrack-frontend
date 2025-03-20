export interface CustomerJson {
    id?: string;
    user_id?: number;
    full_name: string;
    document_id: string;
    telephone: string;
    email: string;
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
    address: string = '';
    notes: string = '';
    created_at?: string;
    updated_at?: string;

    constructor(data: Partial<CustomerJson>) {
        Object.assign(this, data);
    }

}
