import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../../services';
import { Customer } from '../../../models';

@Component({
    selector: 'app-create-loan',
    templateUrl: './create-loan.component.html',
    styleUrl: './create-loan.component.scss',
})
export class CreateLoanComponent implements OnInit {

    form = this.fb.group({
        customer_id: ['', [Validators.required]],
        amount: [0, [Validators.required, Validators.min(10), Validators.max(999999)]],
        interest: [15, [Validators.required, Validators.min(0), Validators.max(100)]],
        notes: [''],
    });

    customers: WritableSignal<Customer[]> = signal([]);

    constructor(private fb: NonNullableFormBuilder, private customersService: CustomersService) {

    }

    ngOnInit() {
        this.loadCustomers();
    }

    loadCustomers() {
        this.customersService.getCustomers()
            .subscribe({
                next: (customers) => {
                    this.customers.update(() => customers);
                }
            });
    }

    hasError(field: string, error: string): boolean {
        const control = this.form.get(field);
        if( !control ) {
            return false;
        }
        return control.errors?.[error] && control.touched;
    }

    isFieldInvalid(field: string): boolean {
        const control = this.form.get(field);
        if( !control ) {
            return false;
        }
        return control.invalid && control.touched;
    }

    submit() {
        if( !this.form.valid ) {
            return;
        }
    }

}
