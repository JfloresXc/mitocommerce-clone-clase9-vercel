import { Component, inject, signal } from '@angular/core';
import { CartService, Coupon } from '../../services/cart.service';

@Component({
  selector: 'app-coupons',
  imports: [],
  templateUrl: './coupons.html',
  styleUrl: '../../app.css'
})
export class CouponsComponent {
  protected readonly cartService = inject(CartService);
  protected readonly activeFeedbackCode = signal<string | null>(null);

  protected onCouponClick(coupon: Coupon) {
    // Copiar al portapapeles
    navigator.clipboard.writeText(coupon.code).then(() => {
      // Aplicar al carrito
      this.cartService.applyCoupon(coupon.code);

      // Mostrar feedback visual temporal
      this.activeFeedbackCode.set(coupon.code);
      setTimeout(() => {
        if (this.activeFeedbackCode() === coupon.code) {
          this.activeFeedbackCode.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
      // Aplicar de todas formas como fallback
      this.cartService.applyCoupon(coupon.code);
    });
  }
}
