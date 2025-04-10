import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoansRoutingModule } from './loans-routing.module';
import { LoansHomeComponent } from './loans-home/loans-home.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';


@NgModule({
    declarations: [
        LoansHomeComponent,
        CreateLoanComponent,
        LoanDetailsComponent,
    ],
    imports: [
        SharedModule,
        LoansRoutingModule
    ],
})
export class LoansModule {}
