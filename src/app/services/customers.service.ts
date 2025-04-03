import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer, CustomerJson } from '../models';
import { ApiService } from './api.service';

interface FetchCustomersResponse {
    customers: CustomerJson[];
}

interface FetchCustomerDetailsResponse {
    customer: CustomerJson;
}

interface CreateCustomerRequest {
    full_name: string;
    document_id: string;
    telephone: string;
    email: string;
    address: string;
    company: string;
    notes: string;
}

@Injectable({
    providedIn: 'root',
})
export class CustomersService {

    constructor(private api: ApiService) {
    }

    getCustomers(): Observable<Customer[]> {
        return this.api.get<FetchCustomersResponse>('customers')
            .pipe(
                map(response => response.customers),
                map(rows => rows.map((row) => new Customer(row)))
            );
    }

    createCustomer(request: Partial<CreateCustomerRequest>): Observable<Customer> {
        return this.api.post<CustomerJson>('customers', request)
            .pipe(
                map(json => new Customer(json))
            );
    }

    getCustomer(customerId: string): Observable<Customer> {
        return this.api.get<FetchCustomerDetailsResponse>(`customers/${customerId}`)
            .pipe(
                map(json => new Customer(json.customer))
            );
    }

}
