import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

declare let window: any;

@Component({
    selector: 'bootslander-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.addClass(document.body, 'index-page');
        window.initTheme && window.initTheme();
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'index-page');
    }

}
