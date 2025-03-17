import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
    selector: 'auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnDestroy {

    constructor(private renderer: Renderer2) {
        this.renderer.addClass(document.body, 'login-page');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'login-page');
    }

}
