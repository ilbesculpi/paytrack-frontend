import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer, CustomerJson } from '../models';
import { ApiService } from './api.service';

interface FetchCustomersResponse {
    customers: CustomerJson[];
}

@Injectable({
    providedIn: 'root',
})
export class CustomerService {

    constructor(private api: ApiService) {
    }

    getCustomers(): Observable<Customer[]> {
        return this.api.get<FetchCustomersResponse>('customers')
            .pipe(
                map(response => response.customers),
                map(rows => rows.map((row) => new Customer(row)))
            );
    }

}
