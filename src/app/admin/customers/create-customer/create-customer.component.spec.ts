import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerComponent } from './create-customer.component';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerService } from '../../../services';
import { of } from 'rxjs';
import { Customer } from '../../../models';

describe('CreateCustomerComponent', () => {

    let component: CreateCustomerComponent;
    let fixture: ComponentFixture<CreateCustomerComponent>;

    let customersServiceSpy: jasmine.SpyObj<CustomerService>;

    beforeEach(() => {
        customersServiceSpy = jasmine.createSpyObj<CustomerService>('CustomerService', ['createCustomer']);
        TestBed.configureTestingModule({
            declarations: [CreateCustomerComponent],
            imports: [SharedModule],
            providers: [
                { provide: CustomerService, useValue: customersServiceSpy },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the customerForm', () => {
        expect(component.form).toBeDefined();
        expect(component.form.get('full_name')).toBeDefined();
        expect(component.form.get('email')).toBeDefined();
        expect(component.form.get('document_id')).toBeDefined();
        expect(component.form.get('telephone')).toBeDefined();
        expect(component.form.get('address')).toBeDefined();
        expect(component.form.get('company')).toBeDefined();
        expect(component.form.get('notes')).toBeDefined();
    });

    it('should call customersService.createCustomer on form submit', () => {
        const customer = {
          full_name: 'John Doe',
          document_id: '123',
          telephone: '1234567890',
          email: 'john@example.com',
          address: '123 Main St',
          company: 'ACME',
          notes: 'Some notes',
        };
        component.form.setValue(customer);
        customersServiceSpy.createCustomer.and.returnValue(
            of(new Customer({}))
        );
        component.submit();
        expect(customersServiceSpy.createCustomer).toHaveBeenCalledWith(customer);
      });

});
