import { Component, OnInit } from '@angular/core';

declare let window: any;

@Component({
    selector: 'bootslander-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {


    ngOnInit() {
        window.initTheme && window.initTheme();
    }

}
