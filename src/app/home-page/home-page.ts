import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CATEGORIES } from '../shared/categories';
import { popularProducts } from '../shared/products';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  myInterval = 3000;
  slidesStore = CATEGORIES;
  popular = popularProducts();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 16,
    navText: ['‹', '›'],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
}
