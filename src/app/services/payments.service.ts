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

interface FetchPaymentResponse {
    payment: PaymentJson;
}


@Injectable({
    providedIn: 'root',
})
export class PaymentsService {

    constructor(private api: ApiService) {
    }

    getPayment(paymentId: string): Observable<Payment> {
        return this.api.get<FetchPaymentResponse>(`payments/${paymentId}`)
            .pipe(
                map(json => new Payment(json.payment))
            );
    }

    addPayment(paymentId: string, paymentInfo: Partial<CreatePaymentRequest>): Observable<Payment> {
        return this.api.put<PaymentJson>(`payments/${paymentId}`, paymentInfo)
            .pipe(
                map(json => new Payment(json))
            );
    }

}
