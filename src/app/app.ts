import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { CouponsComponent } from './components/coupons/coupons';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { SearchModalComponent } from './components/search-modal/search-modal';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    CouponsComponent,
    ProductCatalogComponent,
    CartDrawerComponent,
    SearchModalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MitoPets');
}
