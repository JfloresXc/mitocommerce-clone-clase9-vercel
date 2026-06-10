import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: '../../app.css'
})
export class FooterComponent {
  protected onSubscribe(emailInput: HTMLInputElement) {
    const email = emailInput.value.trim();
    if (!email) return;

    alert(`¡Gracias por suscribirte! Enviaremos ofertas exclusivas de mascotas a: ${email}`);
    emailInput.value = '';
  }
}
