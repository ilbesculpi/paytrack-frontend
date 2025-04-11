import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../../services';
import { Router } from '@angular/router';

@Component({
    selector: 'create-customer',
    templateUrl: './create-customer.component.html',
    styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent implements OnInit {

    isSubmitting = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    form = this.fb.group({
        full_name: ['', [Validators.required]],
        document_id: [''],
        telephone: ['', [Validators.minLength(6)]],
        email: ['', [Validators.email]],
        address: [''],
        company: [''],
        notes: [''],
    });

    constructor(private fb: NonNullableFormBuilder, private customersService: CustomersService, private router: Router) {
    }

    ngOnInit() {
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

        console.log('submit', this.form.value);
        this.isSubmitting = true;
        this.errorMessage = null;
        this.successMessage = null;

        this.customersService.createCustomer(this.form.value)
            .subscribe({
                next: () => {
                    this.successMessage = 'Customer created successfully!';
                    this.isSubmitting = false;
                    this.router.navigateByUrl('/admin/customers');
                },
                error: (error) => {
                    this.errorMessage = 'Failed to create customer.';
                    this.isSubmitting = false;
                    console.error('Error creating customer:', error);
                }
            });
    }


}
