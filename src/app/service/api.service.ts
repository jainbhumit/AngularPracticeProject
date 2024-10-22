import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditBody, Item, Product } from '../model/response.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private httpClient = inject(HttpClient);

  getProduct() {
    const val = this.httpClient.get<Product[]>(
      'https://api.escuelajs.co/api/v1/products'
    );
    return val;
  }

  createProduct(Product: Item) {
    const val = this.httpClient.post<Item>(
      'https://api.escuelajs.co/api/v1/products',
      Product
    );
    return val;
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }

  updateProduct(updatedProduct: EditBody, id: number) {
    return this.httpClient.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      updatedProduct
    );
  }
}
