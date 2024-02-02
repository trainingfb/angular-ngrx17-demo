import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../../../model/product';
import { CartActions } from './cart.actions';

export interface CartState {
  list: Product[];
}

export const initialState: CartState =  {
  list: [
    { id: 111, name: 'Nutella', cost : 1}
  ]
}
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.remove, (state, action) => ({ ...state, list: state.list.filter(item => item.id !== action.id)})),
    on(CartActions.add, (state, action) => ({...state, list: [...state.list, action.item]})),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectList
} = cartFeature;


// Custom Selectors

export const isCartEmpty = createSelector(
  selectList,
  state => state.length === 0
)

export const selectTotalProductsInCart = createSelector(
  selectList,
  state => state.length
)

export const selectTotalCost = createSelector(
  selectList,
  state => state.reduce((acc, item) => acc + item.cost, 0)
)


