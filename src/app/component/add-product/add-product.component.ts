import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../model/response.model';
import { ApiService } from '../../service/api.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productId: string | null = '';
  isEdit = signal<boolean>(false);
  check = this.isEdit() === true ? true : false;

  item: Item = {
    title: null,
    price: 0,
    description: '',
    categoryId: 0,
    images: [],
  };

  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    price: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    categoryId: new FormControl<number | null>(
      { value: 0, disabled: this.isEdit() },
      {
        validators: [Validators.required, Validators.min(1)], // Ensure valid category ID
      }
    ),
    images: new FormArray([
      new FormControl('https://i.imgur.com/ZANVnHE.jpeg'),
      new FormControl(''),
      new FormControl(''),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.item.title = value.title || null;
      this.item.price = value.price;
      this.item.description = value.description;
      this.item.categoryId = value.categoryId;
      this.item.images = value.images?.filter((value) => value !== '');
    });
  }

  ngOnInit(): void {
    console.log('Add Product component');
    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId != null) {
        this.isEdit.set(true);
        this.form.get('description')?.disable();
        this.form.get('categoryId')?.disable();
        this.form.get('images')?.disable();
        console.log(`Editing mode with id ${this.productId} ${this.isEdit()}`);
      }
    });

    if (this.isEdit() && this.productId) {
      let detail = this.productService.getProductById(this.productId);
      console.log('Edit details : ', detail);
      if (detail) {
        this.form.setValue({
          title: detail[0].title,
          price: detail[0].price,
          description: detail[0].description,
          images: detail[0].images,
          categoryId: detail[0].category.id,
        });
      }
    }
  }

  onSubmit() {
    if (this.isEdit()) {
      if (this.form.invalid) {
        return;
      }

      let updateBody = {
        title: this.form.get('title')?.value as string,
        price: this.form.get('price')?.value as number,
      };
      console.log(updateBody);
      const id = parseInt(this.productId as string);
      console.log(id);
      this.apiService.updateProduct(updateBody, id).subscribe({
        complete: () => {
          this.router.navigate(['']);
        },
      });
    } else {
      if (this.form.invalid) {
        window.alert('Please fill out all required fields correctly.');
        return;
      }

      const body = {
        title: this.item.title,
        price: this.item.price,
        description: this.item.description,
        categoryId: this.item.categoryId,
        images: this.item.images,
      };

      this.apiService.createProduct(body).subscribe({
        complete: () => {
          this.router.navigate(['']);
        },
      });
    }
  }
}
