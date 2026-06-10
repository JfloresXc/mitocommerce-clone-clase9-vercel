import { Component, inject } from '@angular/core';
import { CartService, Product } from '../../services/cart.service';

@Component({
  selector: 'app-product-catalog',
  imports: [],
  templateUrl: './product-catalog.html',
  styleUrl: '../../app.css'
})
export class ProductCatalogComponent {
  protected readonly cartService = inject(CartService);

  // Obtener los productos del catálogo excepto el producto estrella del hero (id: 1)
  protected get catalogProducts(): Product[] {
    return this.cartService.catalog.filter(p => p.id !== 1);
  }

  protected addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
