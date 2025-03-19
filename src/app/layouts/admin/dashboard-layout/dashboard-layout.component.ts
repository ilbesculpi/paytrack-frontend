import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models';

interface RouteData {
    user: User;
}

@Component({
    selector: 'dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

    user: User | undefined;

    constructor(private renderer: Renderer2, private route: ActivatedRoute) {
        this.renderer.addClass(document.body, 'hold-transition');
        this.renderer.addClass(document.body, 'sidebar-mini');
        this.renderer.addClass(document.body, 'layout-fixed');
    }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            console.log(data);
            this.user = data['user'];
        });
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'hold-transition');
        this.renderer.removeClass(document.body, 'sidebar-mini');
        this.renderer.removeClass(document.body, 'layout-fixed');
    }

}
