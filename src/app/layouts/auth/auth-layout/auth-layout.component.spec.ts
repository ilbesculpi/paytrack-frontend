import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponent } from './auth-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('AuthLayoutComponent', () => {

    let component: AuthLayoutComponent;
    let fixture: ComponentFixture<AuthLayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AuthLayoutComponent],
            imports: [CommonModule, RouterModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
