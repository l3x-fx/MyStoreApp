import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authFeatureKey, authReducer } from './app/auth/store/auth.reducer';
import * as authEffects from './app/auth/store/auth.effects';
import * as productsEffects from './app/products/store/products.effects';
import * as userEffects from './app/user/store/user effects';
import {
  TokenInterceptor,
  TokenInterceptorProvider,
} from './app/shared/services/token.interceptor';
import {
  productsFeatureKey,
  productsReducer,
} from './app/products/store/products.reducer';
import { userFeatureKey, userReducer } from './app/user/store/user.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    TokenInterceptorProvider,
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(),
    provideRouterStore(),
    provideStore({
      router: routerReducer,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(productsFeatureKey, productsReducer),
    provideState(userFeatureKey, userReducer),
    provideEffects(authEffects),
    provideEffects(productsEffects),
    provideEffects(userEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
