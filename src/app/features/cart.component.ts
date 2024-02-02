import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartActions } from '../core/store/cart/cart.actions';
import { isCartEmpty, selectList, selectTotalCost } from '../core/store/cart/cart.feature';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Cart</h1>
    
    @for (item of cartItems(); track item.id) {
      <li>
        {{item.name}} - € {{item.cost}}
        <button (click)="deleteItem(item)">Delete</button>
      </li>
    } @empty {
        <div>Your Cart is Empty</div>
    }

    <hr>
    
    total:  € {{cartTotal()}}
  `,
})
export default class CartComponent {
  private readonly store = inject(Store);

  readonly cartItems = this.store.selectSignal(selectList)
  readonly isCartEmpty = this.store.selectSignal(isCartEmpty)
  readonly cartTotal = this.store.selectSignal(selectTotalCost)

  deleteItem(item: any) {
    this.store.dispatch(CartActions.remove({ id: item.id}))
  }
}
