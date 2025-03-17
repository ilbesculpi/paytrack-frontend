import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {

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

    constructor(private fb: NonNullableFormBuilder) {
    }

    submit() {
        if (this.form.valid) {
            console.log(this.form.value);
        }
    }
}
