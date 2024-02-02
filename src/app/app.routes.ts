import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./features/home.component')},
  { path: 'shop', loadComponent: () => import('./features/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart.component')},
  {
    path: 'demo-counter', loadComponent: () => import('./features/demo-counter.component'),
  },
  {
    path: 'demo-ngrx-signals', loadComponent: () => import('./features/demo-signals/demo-ngrx-signals.component'),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
