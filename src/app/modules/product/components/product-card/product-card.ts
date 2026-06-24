import { Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../interfaces/product';
import { CartActions } from 'app/store/cart/actions';
import { AlertService } from 'app/shared/services/alert.service';
import { CART_MESSAGES } from 'app/shared/constants';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input<Product>({
    name: '',
    id: '0',
    price: 0,
    rating: 0,
    stock: 0,
    category: '',
    image: '',
  });
  ratingArray = computed(() => Array.from({ length: Math.round(this.product().rating ?? 0) ?? 0 }));
  store = inject(Store);
  alertService = inject(AlertService);

  addToCart() {
    this.store.dispatch(CartActions.addProduct({ product: this.product() }));
    this.alertService.success(CART_MESSAGES.productAdded(this.product().name));
  }

  addToWishList() {}
}
