import { Component, inject, signal } from '@angular/core';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import { Product } from 'app/modules/product/interfaces/product';
import { Store } from '@ngrx/store';
import { selectProductsInCart, selectTotalPrice } from 'app/store/cart/selectors';

@Component({
  selector: 'app-shopping-cart-sidebar',
  imports: [],
  templateUrl: './shopping-cart-sidebar.html',
  styleUrl: './shopping-cart-sidebar.css',
})
export class ShoppingCartSidebar {
  cartsidebarService = inject(CartSidebarService);
  store = inject(Store);

  productsInCart = this.store.selectSignal(selectProductsInCart);
  totalProducts = this.store.selectSignal(selectTotalPrice);

  addQuantity(product: Product) {}

  restQuantity(productId: string) {}
}
