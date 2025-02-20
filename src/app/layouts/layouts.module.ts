import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootslanderModule } from './bootslander/bootslander.module';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        BootslanderModule,
        AuthModule,
    ],
    exports: [
        BootslanderModule,
        AuthModule,
    ],
})
export class LayoutsModule {
}
