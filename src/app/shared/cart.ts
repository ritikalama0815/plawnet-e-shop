import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from './products';

export interface CartItem {
  product: Product;
  qty: number;
}

const STORAGE_KEY = 'plawnet-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(this.load());
  readonly items = this.itemsSignal.asReadonly();
  readonly count = computed(() => this.itemsSignal().reduce((sum, item) => sum + item.qty, 0));
  readonly total = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.qty, 0),
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSignal()));
    });
  }

  add(product: Product, qty = 1): void {
    this.itemsSignal.update((items) => {
      const match = items.find((item) => item.product.id === product.id);
      if (match) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...items, { product, qty }];
    });
  }

  setQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this.itemsSignal.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, qty } : item)),
    );
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
