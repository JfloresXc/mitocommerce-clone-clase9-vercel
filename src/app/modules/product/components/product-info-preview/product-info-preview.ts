import { Component, computed, input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-info-preview',
  imports: [],
  templateUrl: './product-info-preview.html',
  styleUrl: './product-info-preview.css',
})
export class ProductInfoPreview {
  product = input<Product>();
  ratingArray = computed(() => {
    return Array.from({ length: this.product()?.rating ?? 0 });
  });
}
