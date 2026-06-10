import { Component, inject } from '@angular/core';
import { CartService, Product } from '../../services/cart.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: '../../app.css'
})
export class HeroComponent {
  protected readonly cartService = inject(CartService);

  // Obtener producto estrella (id: 1)
  protected get starProduct(): Product {
    return this.cartService.catalog.find(p => p.id === 1)!;
  }

  // Obtener ofertas flash (id: 2 y 3)
  protected get flashDeals(): Product[] {
    return this.cartService.catalog.filter(p => p.id === 2 || p.id === 3);
  }

  protected addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
