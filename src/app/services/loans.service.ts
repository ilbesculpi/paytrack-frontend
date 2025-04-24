import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Loan, Payment } from '../models';
import { LoanJson, PaymentJson } from '../models/types';

interface FetchLoansResponse {
    loans: LoanJson[];
}

interface FetchLoanResponse {
    loan: LoanJson;
}

interface LoanPaymentsResponse {
    payments: PaymentJson[];
}

export interface CreateLoanRequest {
    customer_id: string;
    amount: number;
    interest_method: string;
    interest_rate: number;
    terms: number;
    terms_unit: string;
    start_date: string;
    end_date: string;
    pay_day: number;
    notes: string;
}

interface CreateLoanResponse {
    loan: LoanJson;
}

@Injectable({
    providedIn: 'root',
})
export class LoansService {

    constructor(private api: ApiService) {
    }

    getLoans(): Observable<Loan[]> {
        return this.api.get<FetchLoansResponse>('loans')
            .pipe(
                map(response => response.loans),
                map(rows => rows.map((row) => new Loan(row)))
            );
    }

    createLoan(request: Partial<CreateLoanRequest>): Observable<Loan> {
        return this.api.post<LoanJson>(`customers/${request.customer_id}/loans`, request)
            .pipe(
                map(json => new Loan(json))
            );
    }

    getLoan(loanId: string): Observable<Loan> {
        return this.api.get<FetchLoanResponse>(`loans/${loanId}`)
            .pipe(
                map(json => new Loan(json.loan))
            );
    }

    getLoanPayments(loanId: string): Observable<Payment[]> {
        return this.api.get<LoanPaymentsResponse>(`loans/${loanId}/payments`)
            .pipe(
                map(response => response.payments),
                map(rows => rows.map((row) => new Payment(row)))
            );
    }

}
