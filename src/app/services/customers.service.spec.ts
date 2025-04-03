import { TestBed } from '@angular/core/testing';
import { CustomersService } from './customers.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('CustomersService', () => {

    let service: CustomersService;
    let httpTestingController: HttpTestingController;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CustomersService, ApiService]
        });
        service = TestBed.inject(CustomersService);
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
