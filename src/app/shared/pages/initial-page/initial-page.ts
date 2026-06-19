import { Component } from '@angular/core';
import { PopularProducts } from 'app/modules/product/components/popular-products/popular-products';
import { Hero } from 'app/shared/ui/hero/hero';
import { Footer } from 'app/shared/ui/footer/footer';

@Component({
  selector: 'app-initial-page',
  imports: [PopularProducts, Hero, Footer],
  templateUrl: './initial-page.html',
  styles: ``,
})
export class InitialPage {}
