import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-info-preview',
  imports: [],
  templateUrl: './product-info-preview.html',
  styleUrl: './product-info-preview.css',
})
export class ProductInfoPreview {
  product = input<Product>();
  quantity = signal<number>(1);

  ratingArray = computed(() => {
    return Array.from({ length: this.product()?.rating ?? 0 });
  });

  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }
}
