import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTotalProductsInCart } from './store/cart/cart.feature';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="flex gap-3 bg-slate-900 p-3 items-center">
      <button routerLink="home">home</button>
      <button routerLink="shop">shop</button>
      <button routerLink="cart">cart</button>
      <button routerLink="demo-counter">counter</button>
      <button routerLink="demo-ngrx-signals">demo ngrx signals</button>
      
      <span class="badge badge-accent">
        {{totalProductsInCart()}} products in Cart
      </span>

    </div>

  `,
  styles: ``
})
export class NavBarComponent {
  readonly store = inject(Store)
  readonly totalProductsInCart = this.store.selectSignal(selectTotalProductsInCart)
}
