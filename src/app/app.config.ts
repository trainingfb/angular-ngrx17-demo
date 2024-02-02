// app.config.ts
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartFeature } from './core/store/cart/cart.feature';
import { filtersFeature } from './core/store/products/filters.feature';
import { productsFeature } from './core/store/products/products-feature';
import * as productsEffects from './core/store/products/products.effects';
import * as routerEffects from './core/store/router/router.effects';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { counterFeature } from './core/store/counter/counter.feature';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'router', reducer: routerReducer }),
    provideState({ name: productsFeature.name, reducer: productsFeature.reducer }),
    provideState({ name: cartFeature.name, reducer: cartFeature.reducer }),
    provideState({ name: filtersFeature.name, reducer: filtersFeature.reducer }),
    // provideState({ name: 'counter', reducer: counterFeature.reducer}),
    provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
    provideStoreDevtools({ maxAge: 10, trace: true, connectInZone: true }),
    provideEffects([productsEffects, routerEffects]),
    // NEW
    provideRouterStore()
]
};
