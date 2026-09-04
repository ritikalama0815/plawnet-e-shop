import { Component, inject } from '@angular/core';
import { FavoritesService } from '../shared/favorites';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesPage {
  readonly favorites = inject(FavoritesService);
}
