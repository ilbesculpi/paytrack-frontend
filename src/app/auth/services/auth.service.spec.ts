import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthService', () => {
    let service: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
        localStorage.clear();
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should authenticate a valid user', () => {
        const mockResponse = { result: true, access_token: 'mockToken' };
        service.login('test@example.com', 'password').subscribe((response) => {
            expect(service.isAuthenticated).toBeTrue();
            expect(localStorage.getItem('access_token')).toBe('mockToken');
        });

        const req = httpTestingController.expectOne(
            'http://localhost:8080/api/1/auth/signin'
        );
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });

    it('should not authenticate an invalid user (API error)', () => {
        service.login('invalid@example.com', 'wrongpassword').subscribe({
            next: () => fail('should have failed with 401'),
            error: () => {
                expect(service.isAuthenticated).toBe(false);
                expect(localStorage.getItem('access_token')).toBeNull();
            },
        });

        const req = httpTestingController.expectOne(
            'http://localhost:8080/api/1/auth/signin'
        );
        expect(req.request.method).toBe('POST');
        req.flush('Invalid credentials', {
            status: 401,
            statusText: 'Unauthorized',
        });
    });

    it('should return false if user is not authenticated', () => {
        expect(service.isAuthenticated).toBe(false);
    });

    it('should logout the user', () => {
        localStorage.setItem('auth_token', 'testToken');
        service.logout();
        expect(service.isAuthenticated).toBe(false);
        expect(localStorage.getItem('access_token')).toBeNull();
    });
});
