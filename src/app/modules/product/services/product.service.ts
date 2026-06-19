import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '../interfaces/product';
import { ProductPage } from '../interfaces/productPage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  http = inject(HttpClient);
  endpoint = `${this.baseUrl}/api/products`;

  getProducts({ searchTerm, categoryId }: { searchTerm: string; categoryId?: number }) {
    const searchUrl = `${this.endpoint}?search=${searchTerm}`;
    const categoryUrl = `${this.endpoint}?categoryId=${categoryId}`;

    const url = searchTerm ? searchUrl : categoryUrl;
    return this.http.get<ProductPage>(url);
  }

  getFeatured() {
    return this.http.get<Product[]>(`${this.endpoint}/featured`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.endpoint}/${id}`);
  }
}
