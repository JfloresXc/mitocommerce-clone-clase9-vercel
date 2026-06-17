import { Component, signal } from '@angular/core';
import { Navbar } from './shared/ui/navbar/navbar';
import { Sidebar } from './shared/ui/sidebar/sidebar';
import { ShoppingCartSidebar } from './modules/cart/components/shopping-cart-sidebar/shopping-cart-sidebar';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, ShoppingCartSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MitoPets');
}
