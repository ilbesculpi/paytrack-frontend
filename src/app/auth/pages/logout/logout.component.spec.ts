import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LogoutComponent', () => {

    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;

    let authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['logout']);
    let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
            declarations: [LogoutComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
        authServiceSpy.logout.calls.reset();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call authService.logout() on initialization', () => {
        fixture.detectChanges();
        expect(authServiceSpy.logout).toHaveBeenCalledTimes(1);
    });

    it('should navigate to the home page on initialization', () => {
        fixture.detectChanges();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

});
