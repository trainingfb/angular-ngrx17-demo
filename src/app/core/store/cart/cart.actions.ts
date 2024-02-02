// core/store/cart/cart.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../model/product';

export const CartActions = createActionGroup({
  source: 'Cart API',
  events: {
    'Add': props<{ item: Product }>(),
    'Remove': props<{ id: number }>(),
  }
});
