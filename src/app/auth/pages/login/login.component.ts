import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {

    errorMessage: string = '';
    isSubmitting: boolean = false;

    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    get inputEmail(): AbstractControl|null {
        return this.form.get('email');
    }

    get inputPassword(): AbstractControl|null {
        return this.form.get('password');
    }

    constructor(
        private fb: NonNullableFormBuilder,
        private authService: AuthService,
        private router: Router) {
    }

    submit() {
        if( !this.form.valid ) {
            return;
        }
        console.log(this.form.value);
        this.isSubmitting = true;
        this.errorMessage = '';
        const { email, password } = this.form.value;
        this.authService.login(email!, password!)
            .subscribe({
                next: (response) => {
                    this.isSubmitting = false;
                    this.router.navigate(['/admin/dashboard']);
                },
                error: (error) => {
                    this.isSubmitting = false;
                    this.errorMessage = 'Invalid credentials';
                }
            });
    }
}
