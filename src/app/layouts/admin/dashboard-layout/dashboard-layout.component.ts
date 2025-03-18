import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
    selector: 'dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnDestroy {

    constructor(private renderer: Renderer2) {
        this.renderer.addClass(document.body, 'hold-transition');
        this.renderer.addClass(document.body, 'sidebar-mini');
        this.renderer.addClass(document.body, 'layout-fixed');
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'hold-transition');
        this.renderer.removeClass(document.body, 'sidebar-mini');
        this.renderer.removeClass(document.body, 'layout-fixed');
    }

}
