// app/features/demo-counter/store/counter/counter.effects.ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { CounterActions } from './counter.actions';
import { selectValue } from './counter.feature';

export const loadProducts = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(CounterActions.load),
      mergeMap(() =>
        http.get<{ value: number }>('http://localhost:3000/counter')
          .pipe(
            map(({ value }) => CounterActions.loadSuccess({ value })),
            // NEW
            catchError((error) => of(CounterActions.loadFailed()))
          )
      )
    );
  },
  { functional: true}
);


export const incrementEffect = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(CounterActions.increment),
      concatLatestFrom(() => store.select(selectValue)),
      mergeMap(([action, value]) =>
        http.patch<{ value: number }>('http://localhost:3000/counter', { value: value + 1 })
          .pipe(
            map((res) => CounterActions.incrementSuccess({ value: res.value })),
            catchError((error) => of(CounterActions.incrementFailed()))
          )
      )
    );
  },
  { functional: true}
);


export const decrementEffect = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(CounterActions.decrement),
      concatLatestFrom(() => store.select(selectValue)),
      mergeMap(([action, value]) =>
        http.patch<{ value: number }>('http://localhost:3000/counter', { value: value - action.value })
          .pipe(
            map(({ value }) => CounterActions.decrementSuccess({ value })),
            catchError((error) => of(CounterActions.decrementFailed()))
          )
      )
    );
  },
  { functional: true}
);

