import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Loan, LoanJson } from '../models';

interface FetchLoansResponse {
    loans: LoanJson[];
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

}
