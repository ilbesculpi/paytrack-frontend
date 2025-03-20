import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersHomeComponent } from './home/home.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CustomersHomeComponent,
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: CreateCustomerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule {}
