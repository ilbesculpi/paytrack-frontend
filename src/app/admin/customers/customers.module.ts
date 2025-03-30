import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomersHomeComponent } from './home/home.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerTileComponent } from './customer-tile/customer-tile.component';

@NgModule({
    declarations: [
        CustomersHomeComponent,
        CreateCustomerComponent,
        CustomerDetailsComponent,
        CustomerTileComponent,
    ],
    imports: [
        SharedModule,
        CustomersRoutingModule,
    ],
})
export class CustomersModule {}
