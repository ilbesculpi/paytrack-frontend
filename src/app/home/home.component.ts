import { AfterViewInit, Component } from '@angular/core';

declare const window: any;

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

    private carouselSetup: boolean = false;

    ngAfterViewInit() {
        if (!this.carouselSetup) {
            setTimeout(() => {
                if (!this.carouselSetup) {
                    window.initSwiper && window.initSwiper({
                        "loop": true,
                        "speed": 600,
                        "autoplay": {
                            "delay": 5000
                        },
                        "slidesPerView": "auto",
                        "pagination": {
                            "el": ".swiper-pagination",
                            "type": "bullets",
                            "clickable": true
                        }
                    });
                    this.carouselSetup = true;
                }
            }, 600);
        }
    }
}
