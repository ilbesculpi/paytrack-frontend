import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('DashboardLayoutComponent', () => {

    let component: DashboardLayoutComponent;
    let fixture: ComponentFixture<DashboardLayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardLayoutComponent,
                HeaderComponent,
                SidebarComponent
            ],
            imports: [
                CommonModule,
                RouterModule,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
