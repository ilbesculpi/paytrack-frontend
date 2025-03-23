import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../models';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {

    isLoading = true;
    customer!: Customer;
    errorMessage: string | null = null;

    constructor(private route: ActivatedRoute, private customersService: CustomerService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            console.log('paramMap', params);
            this.loadCustomer(params.get('customerId') as string);
        });
    }

    loadCustomer(customerId: string) {
        this.isLoading = true;
        this.errorMessage = null;
        this.customersService.getCustomer(customerId)
            .subscribe({
                next: (customer) => {
                    console.log('customer', customer);
                    this.isLoading = false;
                    this.customer = customer;
                },
                error: (error) => {
                    console.error('error', error);
                    this.isLoading = false;
                    this.errorMessage = error.message;
                },
            });
    }

    getStatusClass(status: string): string {
        if( !['active', 'completed', 'defaulted', 'pending', 'failed'].includes(status) ) {
            return 'badge-secondary';
        }
        const key = status as 'active' | 'completed' | 'defaulted' | 'pending' | 'failed';
        const statusClasses: { [key in 'active' | 'completed' | 'defaulted' | 'pending' | 'failed']: string } = {
            active: 'badge-success',
            completed: 'badge-info',
            defaulted: 'badge-danger',
            pending: 'badge-warning',
            failed: 'badge-danger',
        };
        return statusClasses[key];
    }

}
