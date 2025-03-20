import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
    exports: [
        DashboardLayoutComponent,
        RouterModule,
    ]
})
export class AdminModule {}
