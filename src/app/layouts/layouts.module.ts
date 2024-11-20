import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootslanderModule } from './bootslander/bootslander.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BootslanderModule,
    ],
    exports: [
        BootslanderModule,
    ]
})
export class LayoutsModule {
}
