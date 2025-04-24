import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoansService } from '../../../services';
import { Loan, Payment } from '../../../models';
import { CustomerJson } from '../../../models/types';

@Component({
    selector: 'app-loan-details',
    templateUrl: './loan-details.component.html',
    styleUrl: './loan-details.component.scss',
})
export class LoanDetailsComponent implements OnInit {

    isLoading = false;
    errorMessage: string | null = null;
    loanId: string = '';
    loan: WritableSignal<Loan|undefined> = signal(undefined);
    customer: Signal<CustomerJson|undefined> = computed(() => this.loan()?.customer);
    payments: WritableSignal<Payment[]> = signal([]);

    constructor(private route: ActivatedRoute, private loansService: LoansService) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe((params) => {
                const loanId = params.get('loanId') as string;
                this.loanId = loanId;
                this.loadLoan(loanId);
            });
    }

    loadLoan(loanId: string) {
        console.log('load Loan', loanId);
        this.isLoading = true;
        this.errorMessage = null;
        this.loansService.getLoan(loanId)
            .subscribe({
                next: (loan) => {
                    console.log('loan', loan);
                    console.log('customer', loan.customer);
                    this.isLoading = false;
                    this.errorMessage = null;
                    this.loan.update(() => loan);
                },
                error: (error) => {
                    console.error('Error retrieving loan', loanId, error.message);
                    this.isLoading = false;
                    this.errorMessage = error.message;
                }
            });
        this.loansService.getLoanPayments(loanId)
            .subscribe({
                next: (payments) => {
                    console.log('payments', payments);
                    this.payments.update(() => payments);
                },
                error: (error) => {
                    console.error('Error retrieving loan payments', loanId, error.message);
                }
            });
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
