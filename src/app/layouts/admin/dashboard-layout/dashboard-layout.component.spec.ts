import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActiveRouteStub, TestUtils } from '../../../../../testing';
import { User } from '../../../models';


describe('DashboardLayoutComponent', () => {

    let component: DashboardLayoutComponent;
    let fixture: ComponentFixture<DashboardLayoutComponent>;
    let route: ActiveRouteStub;
    let user: User;

    beforeEach(() => {
        user = new User({});
        route = TestUtils.getActiveRouteStub({
            data: { user }
        })
        TestBed.configureTestingModule({
            declarations: [
                DashboardLayoutComponent,
                HeaderComponent,
                SidebarComponent,
                FooterComponent,
            ],
            imports: [
                CommonModule,
                RouterModule,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: route }
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
