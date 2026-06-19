import { Component, computed, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input<Product[]>([]);
  productCount = computed(() => this.products().length);
}
