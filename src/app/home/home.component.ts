import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('foodCarousel');
    const bootstrap = (window as any).bootstrap;

    if (carouselElement && bootstrap?.Carousel) {
      new bootstrap.Carousel(carouselElement, {
        interval: 2500,
        ride: 'carousel',
        pause: 'hover',
      });
    }
  }
}
