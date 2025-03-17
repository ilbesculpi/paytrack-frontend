import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
    result: boolean;
    user?: any;
    access_token?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    get isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>('http://localhost:8080/api/1/auth/signin', { email, password })
            .pipe(
                tap((response) => {
                    if( response.result && response.access_token ) {
                        localStorage.setItem('auth:signed', 'true');
                        localStorage.setItem('access_token', response.access_token);
                    }
                })
            )
    }

    logout() {
        localStorage.removeItem('auth:signed');
        localStorage.removeItem('access_token');
    }

}
