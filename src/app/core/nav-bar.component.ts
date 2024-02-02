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
      <button routerLink="home">home</button>
      <button routerLink="shop">shop</button>
      <button routerLink="cart">cart</button>
      <button routerLink="demo-counter">counter</button>
      <button routerLink="demo-ngrx-signals">demo ngrx signals</button>
      
      <span>
        {{totalProductsInCart()}} products
      </span>
      
      <hr>
  `,
  styles: ``
})
export class NavBarComponent {
  readonly store = inject(Store)
  readonly totalProductsInCart = this.store.selectSignal(selectTotalProductsInCart)
}
