import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoansHomeComponent } from './loans-home/loans-home.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoansRoutingModule {}
