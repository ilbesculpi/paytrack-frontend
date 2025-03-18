import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootslanderModule } from './bootslander/bootslander.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        BootslanderModule,
        AuthModule,
        AdminModule,
    ],
    exports: [
        RouterModule,
        BootslanderModule,
        AuthModule,
        AdminModule,
    ],
})
export class LayoutsModule {
}
