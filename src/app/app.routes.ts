import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/bootslander/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HomeComponent
            },
        ]
    }
];
