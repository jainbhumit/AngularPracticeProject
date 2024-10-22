import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ProductService } from '../../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../model/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  productService = inject(ProductService);
  destroyRef = inject(DestroyRef);
  apiService = inject(ApiService);
  isClick = input<boolean>(false);
  router = inject(Router);
  role = signal<'user' | 'admin'>('user');

  searchText = new FormGroup({
    text: new FormControl<string>(''),
  });

  ngOnInit(): void {
    const subscription = this.apiService.getProduct().subscribe({
      next: (products) => {
        this.productService.productsSignal.set(products);
      },
    });

    this.destroyRef.onDestroy(() => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  getProduct() {
    let name = this.searchText.controls['text'].value;
    return this.productService.getFilterProduct(name as string);
  }

  onDelete(id: string) {
    let subsciption = this.apiService.deleteProduct(id).subscribe();
    this.productService.productsSignal.update((current: Product[] | undefined) =>
      current?.filter((value: Product) => value.id !== id)
    );
  }

  toggleAccount() {
    const currentRole = this.role() === 'admin' ? 'user' : 'admin';
    this.role.set(currentRole);
    console.log(this.role());
  }
}
