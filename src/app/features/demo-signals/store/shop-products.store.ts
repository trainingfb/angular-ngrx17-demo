// features/demo-signals/store/todo.store.ts
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Product } from '../../../model/product';
import { Todo } from '../model/todo';
import { tapResponse } from '@ngrx/operators';

export type ProductShopState = {
  products: Product[];
  isLoading: boolean;
  query: string
}

const initialState: ProductShopState = {
  products: [],
  isLoading: false,
  query: ''
}

export const ShopProductStore = signalStore(
  withState(initialState),
  withComputed(({ products }) => ({
    totalCost: computed(() => products().reduce((acc, item) => {
      return acc + (item.cost || 0)
    }, 0)),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    updateQuery(query: string) {
      patchState(store, { query });
    },
    logQuery: rxMethod<string>(
      pipe(
        tap((query) => console.log('do something!', query)),
      ),
    ),
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => http.get<Product[]>(`http://localhost:3000/products?q=${query}`)
            .pipe(
              tapResponse({
                next: (products) => patchState(store, { products }),
                error: (err) => console.error('-->', err),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit({ logQuery, loadByQuery, query}) {
      logQuery(query)
      loadByQuery(query);
    },
  }),
);
