import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FeaturesComponent } from './sections/features/features.component';
import { PricingComponent } from './sections/pricing/pricing.component';
import { FaqComponent } from './sections/faq/faq.component';
import { ContactComponent } from './sections/contact/contact.component';

@NgModule({
    declarations: [
        HomeComponent,
        FeaturesComponent,
        PricingComponent,
        FaqComponent,
        ContactComponent,
    ],
    imports: [
        CommonModule
    ],
})
export class HomeModule {
}
