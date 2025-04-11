import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoansHomeComponent } from './loans-home/loans-home.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoansHomeComponent
    },
    {
        path: 'create/:customerId',
        component: CreateLoanComponent,
    },
    {
        path: 'create',
        component: CreateLoanComponent,
        pathMatch: 'full',
    },
    {
        path: ':loanId',
        children: [
            {
                path: 'view',
                component: LoanDetailsComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoansRoutingModule {}
