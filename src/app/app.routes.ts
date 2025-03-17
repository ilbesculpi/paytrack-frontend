import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/bootslander/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Payame Inicio',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HomeComponent
            },
        ]
    },
    {
        path: 'login',
        pathMatch: 'full',
        title: 'Inicia Sesión',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
];
