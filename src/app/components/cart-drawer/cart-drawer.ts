import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [FormsModule],
  templateUrl: './cart-drawer.html',
  styleUrl: '../../app.css'
})
export class CartDrawerComponent {
  protected readonly cartService = inject(CartService);

  protected couponInput = signal<string>('');
  protected couponError = signal<string | null>(null);
  protected isCheckingOut = signal<boolean>(false);
  protected showSuccessToast = signal<boolean>(false);

  protected onApplyCoupon() {
    const code = this.couponInput().trim().toUpperCase();
    if (!code) return;

    const success = this.cartService.applyCoupon(code);
    if (success) {
      this.couponInput.set('');
      this.couponError.set(null);
    } else {
      this.couponError.set('Código de cupón inválido. Intenta con MASCOTA10, DOGDAY o ENVIOFREE.');
      setTimeout(() => this.couponError.set(null), 4000);
    }
  }

  protected onCheckout() {
    if (this.cartService.cartItems().length === 0) return;

    this.isCheckingOut.set(true);

    // Simular procesamiento del pago
    setTimeout(() => {
      this.isCheckingOut.set(false);
      this.cartService.clearCart();
      this.cartService.closeCart();
      
      // Mostrar toast de éxito
      this.showSuccessToast.set(true);
      setTimeout(() => this.showSuccessToast.set(false), 5000);
    }, 1800);
  }
}
