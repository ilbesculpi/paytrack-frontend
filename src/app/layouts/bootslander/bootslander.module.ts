import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    declarations: [
        MainLayoutComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        MainLayoutComponent,
    ]
})
export class BootslanderModule {
}
