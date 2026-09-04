import { Component, Input, inject } from '@angular/core';
import { Product } from '../products';
import { CartService } from '../cart';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  private readonly cart = inject(CartService);
  readonly favorites = inject(FavoritesService);

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.product);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cart.add(this.product);
  }
}
