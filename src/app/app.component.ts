import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { HomeModule } from './pages/home/home.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        LayoutsModule,
        HomeModule,
        AuthModule,
        AdminModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
