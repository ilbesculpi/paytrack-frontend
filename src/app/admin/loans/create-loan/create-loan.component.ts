import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreateLoanRequest, CustomersService, LoansService } from '../../../services';
import { Customer } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-loan',
    templateUrl: './create-loan.component.html',
    styleUrl: './create-loan.component.scss',
})
export class CreateLoanComponent implements OnInit {

    isSubmitting = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    form = this.fb.group({
        customer_id: ['', [Validators.required]],
        amount: [0, [Validators.required, Validators.min(10), Validators.max(999999)]],
        interest_method: ['simple', [Validators.required]],
        interest_rate: [15, [Validators.required, Validators.min(0), Validators.max(100)]],
        terms: [12, [Validators.required, Validators.min(1), Validators.max(12)]],
        terms_unit: ['months', [Validators.required]],
        start_date: [''],
        end_date: [''],
        pay_day: [new Date().getDate(), [Validators.required, Validators.min(1), Validators.max(31)]],
        notes: [''],
    });

    customers: WritableSignal<Customer[]> = signal([]);

    constructor(
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private customersService: CustomersService,
        private loansService: LoansService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadCustomers();
        this.route.paramMap.subscribe(params => {
            const customerId = params.get('customerId');
            if( customerId ) {
                this.form.patchValue({ customer_id: customerId });
                this.form.get('customer_id')?.disable();
            }
        });

        // set start date to today
        this.form.get('start_date')?.patchValue(
            new Date().toISOString().split('T')[0]
        );
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

        this.form.enable();
        this.form.markAllAsTouched();
        this.form.markAsDirty();

        console.log('submit', this.form.value);
        this.isSubmitting = true;
        this.errorMessage = null;
        this.successMessage = null;

        const createLoanRequest: Partial<CreateLoanRequest> = Object.assign({}, this.form.value);
        this.loansService.createLoan(createLoanRequest)
            .subscribe({
                next: () => {
                    this.successMessage = 'Loan created successfully!';
                    this.isSubmitting = false;
                    this.router.navigateByUrl('/admin/loans');
                },
                error: (error) => {
                    this.errorMessage = 'Failed to create loan.';
                    this.isSubmitting = false;
                    console.error('Error creating loan:', error);
                }
            });
    }

}
