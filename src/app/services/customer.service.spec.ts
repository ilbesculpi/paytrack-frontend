import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('CustomerService', () => {

    let service: CustomerService;
    let httpTestingController: HttpTestingController;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [provideHttpClientTesting()],
            providers: [CustomerService, ApiService]
        });
        service = TestBed.inject(CustomerService);
        httpTestingController = TestBed.inject(HttpTestingController);
        apiService = TestBed.inject(ApiService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
