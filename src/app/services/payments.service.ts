import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, mergeMap, Observable } from 'rxjs';
import { Payment } from '../models';
import { PaymentJson } from '../models/types';

export interface CreatePaymentRequest {
    payment_date: string;
    payment_method: string;
    payment_capital: number;
    payment_interest: number;
    payment_delay: number;
    notes: string;
}



@Injectable({
    providedIn: 'root',
})
export class PaymentsService {

    constructor(private api: ApiService) {
    }

    addPayment(loanId: string, paymentInfo: Partial<CreatePaymentRequest>): Observable<Payment> {
        return this.api.post<PaymentJson>(`payments/${loanId}`, paymentInfo)
            .pipe(
                map(json => new Payment(json))
            );
    }

}
