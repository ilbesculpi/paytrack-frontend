import { ResolveFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { User } from '../../models';

export const authResolver: ResolveFn<User|null> = (route, state) => {
    const authService: AuthService = inject(AuthService);
    return authService.user;
};
