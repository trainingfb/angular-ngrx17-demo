// core/store/products/products-features.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../../../model/product';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  hasError: boolean;
  list: Product[];
}

export const initialState: ProductsState = {
  hasError: false,
  list: [{ id: 1, name: 'Nutella', cost : 1}]
};
export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsActions.load, (state) => ({ ...state, hasError: false})),
    on(ProductsActions.loadSuccess, (state, action) => ({list: [...action.items], hasError: false})),
    on(ProductsActions.loadFail, (state) => ({ ...state, hasError: true})),

    on(ProductsActions.deleteProduct, (state) => ({ ...state, hasError: false})),
    on(ProductsActions.deleteProductSuccess, (state, action) => ({ list: state.list.filter(item => item.id !== action.id), hasError: false})),
    on(ProductsActions.deleteProductFail, (state) => ({ ...state, hasError: true})),

    on(ProductsActions.addProduct, (state) => ({ ...state, hasError: false})),
    on(ProductsActions.addProductSuccess, (state, action) => ({ list: [...state.list, action.item], hasError: false})),
    on(ProductsActions.addProductFail, (state) => ({ ...state, hasError: true})),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectHasError, // selector for `books` property
  selectList
} = productsFeature;

