import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: '../../app.css'
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);

  protected onLogin() {
    alert('Simulación de Login: ¡Funcionalidad de inicio de sesión próximamente!');
  }
}
