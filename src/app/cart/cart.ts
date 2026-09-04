import { Component, inject } from '@angular/core';
import { CartService } from '../shared/cart';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPage {
  readonly cart = inject(CartService);
}
