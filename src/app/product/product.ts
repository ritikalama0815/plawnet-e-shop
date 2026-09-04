import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../shared/cart';
import { FavoritesService } from '../shared/favorites';
import { categoryOf, productById } from '../shared/products';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);
  readonly favorites = inject(FavoritesService);

  readonly product = toSignal(
    this.route.paramMap.pipe(map((params) => productById(params.get('id') ?? ''))),
    { initialValue: undefined },
  );

  readonly categoryTitle = computed(
    () => categoryOf(this.product()?.category)?.title ?? 'Shop',
  );

  readonly selectedColor = signal<string | null>(null);
  readonly qty = signal(1);

  color(): string {
    return this.selectedColor() ?? this.product()?.colors[0] ?? '';
  }

  chooseColor(color: string): void {
    this.selectedColor.set(color);
  }

  changeQty(delta: number): void {
    this.qty.update((value) => Math.max(1, value + delta));
  }

  addToCart(): void {
    const product = this.product();
    if (product) {
      this.cart.add(product, this.qty());
    }
  }

  toggleFavorite(): void {
    const product = this.product();
    if (product) {
      this.favorites.toggle(product);
    }
  }
}
