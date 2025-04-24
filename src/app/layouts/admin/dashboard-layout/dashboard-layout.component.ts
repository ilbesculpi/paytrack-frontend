import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models';

interface RouteData {
    user: User;
}

function loadScripts(files: string[]) {
    files.forEach(file => loadScript(file));
}

function loadScript(file: string) {
    const newScript = document.createElement('script');
    newScript.setAttribute('src', file);
    newScript.setAttribute('type', 'text/javascript');
    newScript.setAttribute('async', 'true');
    newScript.onload = () => {};
    newScript.onerror = () => {};
    document.head.appendChild(newScript);
}

@Component({
    selector: 'dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

    user: User | undefined;

    constructor(private renderer: Renderer2, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.renderer.addClass(document.body, 'hold-transition');
        this.renderer.addClass(document.body, 'sidebar-mini');
        this.renderer.addClass(document.body, 'layout-fixed');
        this.route.data.subscribe((data) => {
            console.log(data);
            this.user = data['user'];
        });
        loadScripts([
            '/plugins/jquery/jquery.min.js',
            '/plugins/bootstrap/js/bootstrap.bundle.min.js',
            '/plugins/moment/moment.min.js',
            '/plugins/daterangepicker/daterangepicker.js',
            '/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
        ]);
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'hold-transition');
        this.renderer.removeClass(document.body, 'sidebar-mini');
        this.renderer.removeClass(document.body, 'layout-fixed');
    }

}
