import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersHomeComponent } from './customers-home.component';
import { CustomersService } from '../../../services';
import { Customer } from '../../../models';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('CustomersHomeComponent', () => {

    let component: CustomersHomeComponent;
    let fixture: ComponentFixture<CustomersHomeComponent>;
    let customersServiceSpy: jasmine.SpyObj<CustomersService>;

    beforeEach(() => {
        customersServiceSpy = jasmine.createSpyObj<CustomersService>('CustomerService', ['getCustomers']);
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [CustomersHomeComponent],
            providers: [
                { provide: CustomersService, useValue: customersServiceSpy }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomersHomeComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call loadCustomers on init', () => {
        const mockCustomers: Customer[] = [
            new Customer({ id: '1', full_name: 'John Doe', email: 'johndoe@example.com' }),
            new Customer({ id: '2', full_name: 'Ismael Lee', email: 'ismael.lee@example.com' }),
        ];
        customersServiceSpy.getCustomers.and.returnValue(
            of(mockCustomers)
        );
        fixture.detectChanges();
        expect(customersServiceSpy.getCustomers).toHaveBeenCalled();
        expect(component.customers).toEqual(mockCustomers);
    });

    it('should display the empty message when there are no customers', () => {
        customersServiceSpy.getCustomers.and.returnValue(
            of([])
        );
        fixture.detectChanges();
        const noCustomersElement = fixture.nativeElement.querySelector('.alert.alert-warning');
        expect(noCustomersElement).toBeTruthy();
        expect(noCustomersElement.textContent).toContain('No hay clientes para mostrar.');
    });

    it('should initialize displayMode to grid', () => {
        customersServiceSpy.getCustomers.and.returnValue(
            of([])
        );
        fixture.detectChanges();
        expect(component.displayMode).toBe('grid');
        const gridButton = fixture.nativeElement.querySelectorAll('.btn-group button')[0];
        expect(gridButton.classList).toContain('btn-primary');
        const listButton = fixture.nativeElement.querySelectorAll('button')[1];
        expect(listButton.classList).not.toContain('btn-primary');
    });

    it('should toggle displayMode', () => {
        component.toggleViewMode('list');
        expect(component.displayMode).toBe('list');
        component.toggleViewMode('grid');
        expect(component.displayMode).toBe('grid');
    });

    it('should should set displayMode to list', () => {
        customersServiceSpy.getCustomers.and.returnValue(
            of([])
        );
        component.toggleViewMode('list');
        fixture.detectChanges();
        expect(component.displayMode).toBe('list');
        const gridButton = fixture.nativeElement.querySelectorAll('.btn-group button')[0];
        expect(gridButton.classList).not.toContain('btn-primary');
        const listButton = fixture.nativeElement.querySelectorAll('button')[1];
        expect(listButton.classList).toContain('btn-primary');
    });

});
