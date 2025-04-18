import { AfterContentInit, AfterViewInit, Component, computed,
    OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { combineLatest, map, startWith, Subject, takeUntil } from 'rxjs';
import { Customer, Loan } from '../../../models';
import { CustomerJson } from '../../../models/types';
import { ActivatedRoute } from '@angular/router';
import { LoansService } from '../../../services';

import * as moment from 'moment';

declare const $: any;

@Component({
    selector: 'app-new-payment',
    templateUrl: './new-payment.component.html',
    styleUrl: './new-payment.component.scss',
})
export class NewPaymentComponent implements OnInit, AfterContentInit, OnDestroy {

    loan: WritableSignal<Loan|null> = signal(null);
    customer: Signal<CustomerJson|undefined> = computed(() => this.loan()?.customer);
    form = this.fb.group({
        customer_id: [''],
        loan_id: [''],
        payment_date: ['', [Validators.required]],
        payment_method: ['', [Validators.required]],
        payment_capital: [0],
        payment_interest: [0],
        payment_delay: [0],
        payment_amount: [0, [Validators.min(0)]],
        notes: [''],
        attachments: this.fb.array([]),
    });
    private destroy$ = new Subject<void>();

    constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute, private loansService: LoansService) {
        this.route.paramMap.subscribe(params => {
            const loanId = params.get('loanId');
            console.log('loadId', loanId);
            if( loanId ) {
                this.loansService.getLoan(loanId)
                    .subscribe({
                        next: (loan) => {
                            this.loan.update(() => loan);
                        }
                    });
            }
        });
    }

    ngOnInit() {
        this.setupTotalCalculation();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        // Clean up jQuery listeners
        $('#payment_date').off('change.datetimepicker');
        $('#payment_date').datetimepicker('destroy');
    }

    ngAfterContentInit() {
        setTimeout(() => this.initDatePicker(), 1200);
    }

    private initDatePicker() {
        const startDate = '20/04/2025'; //moment.default().format('DD/MM/YYYY');
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
                // Ensure values are numbers before summing
                const cap = Number(capital) || 0;
                const int = Number(interest) || 0;
                const del = Number(delay) || 0;
                return cap + int + del;
            }),
            takeUntil(this.destroy$) // Unsubscribe automatically on component destroy
        ).subscribe(total => {
            // Use patchValue to update only the 'payment_amount' field
            // Use { emitEvent: false } to prevent potential infinite loops if 'payment_amount' had listeners affecting others
            this.form.controls.payment_amount.setValue(total, { emitEvent: false });
        });
    }

    submit() {
        console.log('values', this.form.value);
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

}
