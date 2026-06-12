import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  http = inject(HttpClient);
  endpoint = `${this.baseUrl}/api/products`;

  getProducts() {
    return this.http.get<Product[]>(this.endpoint);
  }

  getFeatured() {
    return this.http.get<Product[]>(`${this.endpoint}/featured`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.endpoint}/${id}`);
  }
}
