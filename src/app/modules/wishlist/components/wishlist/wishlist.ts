import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '@modules/product/components/product-card/product-card';
import { Product } from '@modules/product/interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard],
  templateUrl: './wishlist.html',
  styles: ``,
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  wishlist = signal<Product[]>([]);

  productsDefault: Product[] = [];

  wishListResource = rxResource({
    stream: () => this.wishlistService.getWishlist(),
    defaultValue: [],
  });
}
