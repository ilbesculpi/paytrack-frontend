import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {

        authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [CommonModule, ReactiveFormsModule],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the loginForm', () => {
        expect(component.form).toBeDefined();
        expect(component.form.get('email')).toBeDefined();
        expect(component.form.get('password')).toBeDefined();
    });

    it('should call authService.login with correct credentials on submit', () => {
        const email = 'test@example.com';
        const password = 'password';
        component.form.setValue({ email, password });
        authServiceSpy.login.and.returnValue(of({ result: true, token: 'mockToken' }));
        component.submit();
        expect(authServiceSpy.login).toHaveBeenCalledWith(email, password);
    });

    it('should navigate to dashboard on successful login', () => {
        authServiceSpy.login.and.returnValue(of({ result: true, token: 'mockToken' }));
        component.form.setValue({ email: 'test@example.com', password: 'password' });
        component.submit();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
        expect(component.isSubmitting).toBeFalse();
    });

    it('should not submit an invalid form', () => {
        component.form.setValue({ email: '', password: '' });
        component.submit();
        expect(authServiceSpy.login).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
        expect(component.isSubmitting).toBeFalse();
    });

});
