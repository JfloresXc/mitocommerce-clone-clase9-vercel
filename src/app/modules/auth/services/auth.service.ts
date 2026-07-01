import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs';
import { LoginResponseDTO } from '../interfaces/LoginResponseDTO';
import { UserAuth } from '../interfaces/UserAuth';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';
import { isPlatformBrowser } from '@angular/common';

const ACCESS_TOKEN = 'access_token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  httpClient = inject(HttpClient);
  currentUser = signal<UserAuth | null>(null);
  accessToken = signal<string | null>(this.getTokenFromSessionStorage());
  isAuthenticated = computed(() => this.accessToken() !== null);
  router = inject(Router);
  alertService = inject(AlertService);

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient
      .post<LoginResponseDTO>(`${environment.baseUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.handleAuthSuccess(response);
        }),
        catchError((error) => {
          this.handleAuthError();
          throw error;
        }),
      );
  }

  logout() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.clearSessionStorage();
    this.router.navigate(['/login']);
    this.alertService.success('Sesión cerrada');
  }

  handleAuthSuccess(response: LoginResponseDTO) {
    if (response.access_token) {
      this.currentUser.set({
        userId: response.userId!,
        email: response.email!,
      });
      this.accessToken.set(response.access_token);
      if (this.isBrowser) sessionStorage.setItem(ACCESS_TOKEN, response.access_token);
      this.router.navigate(['/']);
      this.alertService.success('Inicio de sesión exitoso');
    }
  }

  handleAuthError() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.clearSessionStorage();
  }

  getTokenFromSessionStorage() {
    if (this.isBrowser) {
      const token = sessionStorage.getItem(ACCESS_TOKEN);
      return token ? token : null;
    }
    return null;
  }

  clearSessionStorage() {
    if (this.isBrowser) sessionStorage.removeItem(ACCESS_TOKEN);
  }
}
