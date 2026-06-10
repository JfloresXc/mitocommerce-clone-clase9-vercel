import { Component, inject, ViewChild, ElementRef, effect, HostListener } from '@angular/core';
import { CartService, Product } from '../../services/cart.service';

@Component({
  selector: 'app-search-modal',
  imports: [],
  templateUrl: './search-modal.html',
  styleUrl: '../../app.css'
})
export class SearchModalComponent {
  protected readonly cartService = inject(CartService);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    // Foco automático en el input al abrir el modal
    effect(() => {
      if (this.cartService.isSearchOpen()) {
        setTimeout(() => {
          this.searchInput?.nativeElement?.focus();
        }, 100);
      }
    });
  }

  // Atajos de teclado globales (Ctrl+K para abrir, Esc para cerrar)
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.cartService.openSearch();
    }
    if (event.key === 'Escape' && this.cartService.isSearchOpen()) {
      event.preventDefault();
      this.cartService.closeSearch();
    }
  }

  protected onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.cartService.searchQuery.set(val);
  }

  protected addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartService.closeSearch();
  }
}
