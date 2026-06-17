import { Component } from '@angular/core';
import { PopularProducts } from 'app/modules/product/components/popular-products/popular-products';

@Component({
  selector: 'app-initial-page',
  imports: [PopularProducts],
  templateUrl: './initial-page.html',
  styles: ``,
})
export class InitialPage {}
