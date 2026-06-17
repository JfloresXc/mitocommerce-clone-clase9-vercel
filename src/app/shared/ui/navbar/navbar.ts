import { Component, computed, inject } from '@angular/core';
import { CartSidebarService } from 'app/modules/cart/services/cart-sidebar.service';
import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { ProductFeaturedService } from 'app/modules/product/services/product-featured.service';
import { SidebarService } from 'app/shared/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categoryFeatureService = inject(CategoryFeatureService);
  sidebarService = inject(SidebarService);
  cartSidebarService = inject(CartSidebarService);

  productFeaturedService = inject(ProductFeaturedService);
  products = computed(() => {
    return this.productFeaturedService.products();
  });

  open() {
    this.sidebarService.open();
  }

  openCart() {
    this.cartSidebarService.open();
  }
}
