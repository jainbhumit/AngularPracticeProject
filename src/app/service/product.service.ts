import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsSignal = signal<Product[] | undefined>(undefined);
  filterProductsSignal = signal<Product[] | undefined>(undefined);

  private apiService = inject(ApiService);
  // Computed signal to get current products value
  productsValue = computed(() => this.productsSignal());

  getAllProduct() {
    return this.apiService.getProduct();
  }

  getProductById(id: string) {
    console.log(this.productsSignal());
    console.log(id);
    let product = this.productsSignal()?.filter((value) => value.id == id);
    console.log(product);
    return product;
  }

  getFilterProduct(name: string) {
    console.log(name, this.productsSignal());
    return this.productsSignal()?.filter((item) =>
      item.title.toLowerCase().includes(name + '')
    );
  }
}
