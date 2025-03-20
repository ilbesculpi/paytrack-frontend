import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models';
import { CustomerService } from '../../../services';

@Component({
    selector: 'customers-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

    isLoading: boolean = false;
    customers: Customer[] = [];
    displayMode: 'grid' | 'list' = 'grid';

    constructor(private customersService: CustomerService) {
    }

    ngOnInit() {
        this.loadCustomers();
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
