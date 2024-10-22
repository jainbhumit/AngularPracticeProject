import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { inject } from '@angular/core';
import { RoleComponent } from './component/role/role.component';

export const authorisation: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const role = route.paramMap.get('role');
  const router = inject(Router);

  if (role === 'admin') return true;
  return router.navigate(['/unauthorise']);
};

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: ':role/add-product',
    component: AddProductComponent,
    canActivate: [authorisation],
  },
  {
    path: ':role/edit/:id',
    component: AddProductComponent,
    canActivate: [authorisation],
  },
  {
    path: 'unauthorise',
    component: RoleComponent,
  },
];
