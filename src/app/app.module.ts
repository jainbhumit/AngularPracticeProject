import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideRouter,
  RouterLink,
  RouterModule,
  RouterOutlet,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ApiService } from './service/api.service';
import { RupeePipe } from '../shared/pipe/rupee.pipe';
import { routes } from './app.route';
import { ProductService } from './service/product.service';
import { RoleComponent } from './component/role/role.component';
import { CustomDirective } from '../shared/role.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddProductComponent,
    RoleComponent,
    RupeePipe,
    CustomDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [
    provideHttpClient(),
    ApiService,
    provideRouter(routes, withComponentInputBinding()),
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
