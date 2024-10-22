import {
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ProductService } from '../../service/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../model/response.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../../config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements 
OnInit , OnDestroy {

  productService = inject(ProductService);
  destroyRef = inject(DestroyRef);
  apiService = inject(ApiService);
  isClick = input<boolean>(false);
  router = inject(Router);
  role = signal<Role>(Role.user);

  private subscriptions: Subscription[] = [];

  searchText = new FormGroup({
    text: new FormControl<string>(''),
  });

  ngOnInit(): void {
    const productSubscription = this.apiService.getProduct().subscribe({
      next: (products) => {
        this.productService.productsSignal.set(products);
      },
    });

    this.subscriptions.push(productSubscription);
  }

  getProduct() {
    let name = this.searchText.controls['text'].value;
    return this.productService.getFilterProduct(name as string);
  }

  onDelete(id: string) {
    let deleteSubsciption = this.apiService.deleteProduct(id).subscribe();
    this.productService.productsSignal.update((current: Product[] | undefined) =>
      current?.filter((value: Product) => value.id !== id)
    );

    this.subscriptions.push(deleteSubsciption);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
  toggleAccount() {
    const currentRole = this.role() === Role.admin ? Role.user : Role.admin;
    this.role.set(currentRole);
    console.log(this.role());
  }

  checkAdmin(): boolean {
    return this.role() === Role.admin ? true : false
  }
}
