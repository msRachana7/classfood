import { AfterViewInit, Component } from '@angular/core';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('foodCarousel');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 2500,
        ride: 'carousel',
        pause: 'hover'
      });
    }
  }
}
