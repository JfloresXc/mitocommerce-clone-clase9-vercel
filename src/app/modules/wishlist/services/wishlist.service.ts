import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Wishlist as WishlistModel } from '../interfaces/Wishlist';
import { Product } from '../../product/interfaces/product';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  httpClient = inject(HttpClient);
  getWishlist() {
    return this.httpClient.get<Product[]>(`${environment.baseUrl}/api/wishlist`);
  }

  addToWishlist(productId: string) {
    return this.httpClient.post<WishlistModel>(`${environment.baseUrl}/api/wishlist`, {
      productId,
    });
  }

  removeFromWishlist(wishlist: WishlistModel) {
    return this.httpClient.delete<WishlistModel>(
      `${environment.baseUrl}/api/wishlist/${wishlist.productId}`,
    );
  }
}
