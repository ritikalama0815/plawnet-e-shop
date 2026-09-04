export interface Category {
  id: string;
  slug: string;
  src: string;
  alt: string;
  title: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', slug: 'clothing', src: 'assets/clothing.jpg', alt: 'Clothing', title: 'Clothing' },
  { id: '2', slug: 'food', src: 'assets/food.jpg', alt: 'Food and pantry', title: 'Food & Pantry' },
  { id: '3', slug: 'skincare', src: 'assets/skincare.jpg', alt: 'Beauty and skincare', title: 'Beauty & Skincare' },
  { id: '4', slug: 'kitchen', src: 'assets/kitchen.jpg', alt: 'Home and living', title: 'Home and Living' },
  { id: '5', slug: 'electronics', src: 'assets/electronics.jpg', alt: 'Refurbished electronics', title: 'Refurbished Electronics' },
  { id: '6', slug: 'garden', src: 'assets/garden.jpg', alt: 'Gardening', title: 'Gardening' },
];
