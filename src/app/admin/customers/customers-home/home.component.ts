import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models';
import { CustomersService } from '../../../services';

@Component({
    selector: 'customers-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class CustomersHomeComponent implements OnInit {

    isLoading: boolean = false;
    customers: Customer[] = [];
    displayMode: 'grid' | 'list' = 'grid';
    searchTerm: string = '';

    constructor(private customersService: CustomersService) {
    }

    ngOnInit() {
        this.loadCustomers();
    }

    get filteredCustomers(): Customer[] {
        return this.customers.filter(customer => {
            return customer.full_name.toLowerCase()
                .includes(this.searchTerm.toLowerCase());
        });
    }

    private loadCustomers() {
        this.isLoading = true;
        this.customersService.getCustomers()
            .subscribe({
                next: (customers) => {
                    this.isLoading = false;
                    this.customers = customers;
                },
                error: (error) => {
                    this.isLoading = false;
                    console.error(error);
                }
            });
    }

    toggleViewMode(mode: 'grid' | 'list') {
        this.displayMode = mode;
    }

}
