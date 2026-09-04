import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CATEGORIES } from '../shared/categories';
import { Gender, categoryOf, productsByCategory } from '../shared/products';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  private readonly route = inject(ActivatedRoute);

  readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('category'))), {
    initialValue: null,
  });

  readonly title = computed(() => categoryOf(this.slug())?.title ?? 'All products');
  readonly hero = computed(() => categoryOf(this.slug())?.src);

  readonly selectedGenders = signal<Gender[]>([]);
  readonly selectedColors = signal<string[]>([]);
  readonly selectedPrices = signal<string[]>([]);
  readonly sort = signal<SortKey>('featured');

  readonly catalog = computed(() => productsByCategory(this.slug()));

  readonly availableGenders = computed(() => {
    const values = new Set(this.catalog().map((product) => product.gender));
    return (['Women', 'Men', 'Unisex'] as Gender[]).filter((gender) => values.has(gender));
  });

  readonly availableColors = computed(() => {
    const values = new Set(this.catalog().flatMap((product) => product.colors));
    return [...values].sort();
  });

  readonly priceBuckets = [
    { id: 'under-25', label: 'Under $25', match: (price: number) => price < 25 },
    { id: '25-50', label: '$25 – $50', match: (price: number) => price >= 25 && price <= 50 },
    { id: '50-100', label: '$50 – $100', match: (price: number) => price > 50 && price <= 100 },
    { id: 'over-100', label: '$100+', match: (price: number) => price > 100 },
  ];

  readonly products = computed(() => {
    const genders = this.selectedGenders();
    const colors = this.selectedColors();
    const prices = this.selectedPrices();
    let list = this.catalog().filter((product) => {
      const genderOk = !genders.length || genders.includes(product.gender);
      const colorOk = !colors.length || product.colors.some((color) => colors.includes(color));
      const priceOk =
        !prices.length ||
        this.priceBuckets.some((bucket) => prices.includes(bucket.id) && bucket.match(product.price));
      return genderOk && colorOk && priceOk;
    });

    switch (this.sort()) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  });

  readonly categories = CATEGORIES;

  constructor() {
    effect(() => {
      this.slug();
      untracked(() => this.clearFilters());
    });
  }

  toggleGender(gender: Gender): void {
    this.selectedGenders.update((current) => this.toggle(current, gender));
  }

  toggleColor(color: string): void {
    this.selectedColors.update((current) => this.toggle(current, color));
  }

  togglePrice(id: string): void {
    this.selectedPrices.update((current) => this.toggle(current, id));
  }

  setSort(value: string): void {
    this.sort.set(value as SortKey);
  }

  clearFilters(): void {
    this.selectedGenders.set([]);
    this.selectedColors.set([]);
    this.selectedPrices.set([]);
  }

  isOn(list: readonly string[], value: string): boolean {
    return list.includes(value);
  }

  private toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }
}
