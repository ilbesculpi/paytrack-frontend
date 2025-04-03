import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoansRoutingModule } from './loans-routing.module';
import { LoansHomeComponent } from './loans-home/loans-home.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';


@NgModule({
    declarations: [
        LoansHomeComponent,
        CreateLoanComponent
    ],
    imports: [
        SharedModule,
        LoansRoutingModule
    ],
})
export class LoansModule {}
