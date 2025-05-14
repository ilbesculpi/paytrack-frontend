import { AfterContentInit, AfterViewInit, Component, computed,
    OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { combineLatest, map, startWith, Subject, takeUntil } from 'rxjs';
import { Customer, Loan, Payment } from '../../../models';
import { CustomerJson, LoanJson } from '../../../models/types';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePaymentRequest, LoansService, PaymentsService } from '../../../services';

import moment from 'moment';

declare const $: any;

interface AttachmentFile {
    file: File | null;
    name: string | null;
}

@Component({
    selector: 'app-new-payment',
    templateUrl: './new-payment.component.html',
    styleUrl: './new-payment.component.scss',
})
export class NewPaymentComponent implements OnInit, AfterContentInit, OnDestroy {

    payment: WritableSignal<Payment|null> = signal(null);
    loan: Signal<Loan|null> = computed(() => this.payment()?.loan || null);
    customer: Signal<Customer|undefined> = computed(() => this.payment()?.customer);

    // Form properties
    isSubmitting = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    form = this.fb.group({
        payment_date: ['', [Validators.required]],
        payment_method: ['', [Validators.required]],
        payment_capital: [0],
        payment_interest: [0],
        payment_delay: [0],
        payment_amount: [0, [Validators.min(0.1)]],
        notes: [''],
        attachments: this.fb.array([]),
    });

    // Subject
    private destroy$ = new Subject<void>();

    // Attachment properties
    selectedFiles: AttachmentFile[] = [];

    constructor(
        private fb: NonNullableFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private paymentsService: PaymentsService) {
    }

    ngOnInit() {
        this.setupTotalCalculation();
        this.route.paramMap.subscribe(params => {
            const paymentId = params.get('paymentId');
            console.log('paymentId', paymentId);
            if( paymentId ) {
                this.paymentsService.getPayment(paymentId)
                    .subscribe({
                        next: (payment) => {
                            this.payment.update(() => payment);
                        }
                    });
            }
        });
    }

    ngAfterContentInit() {
        setTimeout(() => this.initDatePicker(), 1200);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        // Clean up jQuery listeners
        $('#payment_date').off('change.datetimepicker');
        $('#payment_date').datetimepicker('destroy');
    }

    private initDatePicker() {
        const startDate = moment().format('DD/MM/YYYY');
        this.form.get('payment_date')?.setValue(startDate);
        $('#payment_date').datetimepicker({
            format: 'DD/MM/YYYY',
            date: startDate,
        });
        $('#payment_date').on('change.datetimepicker', (event: any) => {
            const value = event.date as moment.Moment;
            this.form.get('payment_date')?.patchValue(value.format('DD/MM/YYYY'));
        });
    }

    private setupTotalCalculation() {
        const capital$ = this.form.controls.payment_capital
            .valueChanges
            .pipe(
                startWith(this.form.controls.payment_capital.value)
            );
        const interest$ = this.form.controls.payment_interest
            .valueChanges
            .pipe(
                startWith(this.form.controls.payment_interest.value)
            );
        const delay$ = this.form.controls.payment_delay
            .valueChanges
            .pipe(
                startWith(this.form.controls.payment_delay.value)
            );

        combineLatest([capital$, interest$, delay$]).pipe(
            map(([capital, interest, delay]) => {
                const cap = Number(capital) || 0;
                const int = Number(interest) || 0;
                const del = Number(delay) || 0;
                return cap + int + del;
            }),
            takeUntil(this.destroy$) // Unsubscribe automatically on component destroy
        ).subscribe(total => {
            // Use patchValue to update only the 'payment_amount' field
            this.form.controls.payment_amount.setValue(total, { emitEvent: false });
        });
    }

    //#region Attachments

    get attachmentsFormArray(): FormArray {
        return this.form.get('attachments') as FormArray;
    }

    addAttachment() {
        this.attachmentsFormArray.push(this.fb.control(''));
        this.selectedFiles.push({ file: null, name: null });
    }

    removeAttachment(index: number) {
        this.attachmentsFormArray.removeAt(index);
        this.selectedFiles.splice(index, 1);
    }

    onFileSelected(event: Event, index: number): void {

        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;

        if( fileList && fileList.length > 0 ) {
            const file = fileList[0];
            this.selectedFiles[index] = { file: file, name: file.name }; // Update file data
            console.log(`File selected at index ${index}:`, file);
        }
        else {
            // Clear if the user cancels file selection
            this.selectedFiles[index] = { file: null, name: null };
            // Optionally reset the dummy FormControl value if needed
            // this.attachmentsFormArray.at(index).reset();
        }
         // Reset the input value so the user can select the same file again if they remove and re-add
         element.value = '';
    }

    //#endregion

    submit() {

        this.form.markAllAsTouched();
        if( !this.form.valid || this.isSubmitting ) {
            console.log('Form invalid or submission in progress.');
            return;
        }

        if( !this.loan() ) {
            console.log('Loan not set.');
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = null;
        this.successMessage = null;

        const formData = new FormData();

        // Append standard form values (excluding the FormArray itself)
        Object.keys(this.form.controls).forEach(key => {
            if (key !== 'attachments') { // Exclude the FormArray control
                const control = this.form.get(key);
                if (control) {
                    formData.append(key, control.value);
                }
            }
        });

        // Append selected files
        this.selectedFiles.forEach((attachment, index) => {
            if( attachment.file ) {
                formData.append('attachments', attachment.file, attachment.name || `attachment_${index}`);
            }
        });

        console.log('Submitting FormData:', /* FormData doesn't log well */ );
        // Log files separately for verification
        console.log('Files to submit:', this.selectedFiles
            .filter(f => f.file)
            .map(f => f.name));

        const loanId = this.loan()!.id;
        const formValues = this.form.value;
        const addPaymentRequest: Partial<CreatePaymentRequest> = {
            payment_date: moment(formValues.payment_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            payment_method: formValues.payment_method,
            payment_capital: formValues.payment_capital,
            payment_interest: formValues.payment_interest,
            payment_delay: formValues.payment_delay,
            notes: formValues.notes,
        }
        this.paymentsService.addPayment(loanId, addPaymentRequest)
            .subscribe({
                next: () => {
                    this.successMessage = 'Payment registered successfully!';
                    this.isSubmitting = false;
                    this.router.navigateByUrl(`/admin/loans/${loanId}/view`);
                },
                error: (error) => {
                    this.errorMessage = 'Failed to register payment.';
                    this.isSubmitting = false;
                    console.error('Error registering payment:', error);
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

    getStatusBadgeClass(status: string): string {
        switch (status) {
          case 'active':
            return 'bg-success';
          case 'paused':
            return 'bg-warning';
          case 'complete':
            return 'bg-secondary';
          default:
            return 'bg-info';
        }
    }

}
