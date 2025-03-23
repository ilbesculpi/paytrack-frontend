import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomersHomeComponent } from './home/home.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
    declarations: [
        CustomersHomeComponent,
        CreateCustomerComponent,
        CustomerDetailsComponent,
    ],
    imports: [
        SharedModule,
        CustomersRoutingModule,
    ],
})
export class CustomersModule {}
