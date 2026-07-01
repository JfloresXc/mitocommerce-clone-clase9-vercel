import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/pages/initial-page/initial-page').then((m) => m.InitialPage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./modules/product/pages/product-list-page/product-list-page').then(
        (m) => m.ProductListPage,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./modules/product/pages/product-detail-page/product-detail-page').then(
        (m) => m.ProductDetailPage,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./modules/wishlist/pages/wishlist-page').then((m) => m.WishlistPage),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
