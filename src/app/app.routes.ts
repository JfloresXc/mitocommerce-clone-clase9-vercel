import { Routes } from '@angular/router';
import { InitialPage } from './shared/pages/initial-page/initial-page';
import { ProductListPage } from './modules/product/pages/product-list-page/product-list-page';

export const routes: Routes = [
  {
    path: '',
    component: InitialPage,
  },
  {
    path: 'products',
    component: ProductListPage,
  },
];
