import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersHomeComponent } from './customers-home/customers-home.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

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
    },
    {
        path: ':customerId',
        children: [
            {
                path: 'view',
                component: CustomerDetailsComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule {}
