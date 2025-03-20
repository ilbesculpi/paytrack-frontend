import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private apiUrl = 'http://localhost:8080/api/1';

    constructor(private http: HttpClient) {
    }

    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const token = localStorage.getItem('access_token');
        if( token ) {
            headers = headers.append('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        const url = `${this.apiUrl}/${path}`;
        return this.http.get<T>(url, {
            headers: this.getHeaders(),
            params
        });
    }

    post<T>(path: string, body: object = {}): Observable<T> {
        const url = `${this.apiUrl}/${path}`;
        return this.http.post<T>(url, body, {
            headers: this.getHeaders()
        });
    }

}
