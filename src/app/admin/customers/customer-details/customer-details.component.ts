import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CustomersService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../models';


@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {

    isLoading = true;
    customer: WritableSignal<Customer|undefined> = signal(undefined);
    loans = computed(() => this.customer()?.loans);
    payments = computed(() => this.customer()?.payments);
    errorMessage: string | null = null;

    constructor(private route: ActivatedRoute, private customersService: CustomersService) {
    }

    ngOnInit() {
        this.route.paramMap
        .subscribe((params) => {
            console.log('paramMap', params);
            const customerId = params.get('customerId') as string;
            this.loadCustomer(customerId);
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
                    this.errorMessage = null;
                    this.customer.update(() => customer);
                },
                error: (error) => {
                    console.error('Error retrieving customer', customerId, error.message);
                    this.isLoading = false;
                    this.errorMessage = error.message;
                }
            });
    }

    getStatusClass(status: string): string {
        if( !['active', 'completed', 'pending'].includes(status) ) {
            return 'badge-secondary';
        }
        const key = status as 'active' | 'completed' | 'pending';
        const statusClasses: { [key in 'active' | 'completed' | 'pending']: string } = {
            active: 'badge-success',
            completed: 'badge-info',
            pending: 'badge-warning',
        };
        return statusClasses[key];
    }

}
