import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FaqComponent } from './sections/faq/faq.component';
import { FeaturesComponent } from './sections/features/features.component';
import { PricingComponent } from './sections/pricing/pricing.component';
import { ContactComponent } from './sections/contact/contact.component';

describe('HomeComponent', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                FaqComponent,
                FeaturesComponent,
                PricingComponent,
                ContactComponent,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
