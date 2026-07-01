import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { CartReducer } from './store/cart/reducers';
import { provideEffects } from '@ngrx/effects';
import { CarEffects } from './store/cart/effects';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      Cart: CartReducer,
    }),
    provideEffects([CarEffects]),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
