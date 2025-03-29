import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerService } from '../../../services';
import { TestUtils } from '../../../../../testing';
import { ActivatedRoute } from '@angular/router';
import { TestFactory } from '../../../../../testing/factories/test-factory';
import { of } from 'rxjs';

describe('CustomerDetailsComponent', () => {

    let component: CustomerDetailsComponent;
    let fixture: ComponentFixture<CustomerDetailsComponent>;
    let customerServiceSpy: jasmine.SpyObj<CustomerService>;
    let customer = TestFactory.customer.createCustomer();
    let route = TestUtils.getActiveRouteStub({
        params: {
            customerId: customer.id,
        }
    });

    beforeEach(() => {
        customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomer']);
        TestBed.configureTestingModule({
            declarations: [CustomerDetailsComponent],
            providers: [
                { provide: CustomerService, useValue: customerServiceSpy },
                { provide: ActivatedRoute, useValue: route },
            ],
        }).compileComponents();
        customerServiceSpy.getCustomer.and.returnValue(
            of(customer)
        );
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
