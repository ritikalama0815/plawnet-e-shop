import { Injectable, computed, effect, signal } from '@angular/core';
import { Product, productById } from './products';

const STORAGE_KEY = 'plawnet-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly idsSignal = signal<string[]>(this.load());
  readonly ids = this.idsSignal.asReadonly();
  readonly count = computed(() => this.idsSignal().length);
  readonly products = computed(() =>
    this.idsSignal()
      .map((id) => productById(id))
      .filter((product): product is Product => !!product),
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.idsSignal()));
    });
  }

  has(productId: string): boolean {
    return this.idsSignal().includes(productId);
  }

  toggle(product: Product): void {
    this.idsSignal.update((ids) =>
      ids.includes(product.id) ? ids.filter((id) => id !== product.id) : [...ids, product.id],
    );
  }

  private load(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }
}
