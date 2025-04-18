import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        NewPaymentComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PaymentsRoutingModule
    ],
})
export class PaymentsModule {}
