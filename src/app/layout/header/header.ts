import { Component, HostListener, inject } from '@angular/core';
import { CATEGORIES } from '../../shared/categories';
import { CartService } from '../../shared/cart';
import { FavoritesService } from '../../shared/favorites';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly categories = CATEGORIES;
  readonly cart = inject(CartService);
  readonly favorites = inject(FavoritesService);
  categoriesOpen = false;

  toggleCategories(event: Event): void {
    event.stopPropagation();
    this.categoriesOpen = !this.categoriesOpen;
  }

  closeCategories(): void {
    this.categoriesOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeCategories();
  }
}
