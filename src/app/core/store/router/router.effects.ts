import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { RouterActions } from './router.actions';

export const goEffect = createEffect((
  actions$ = inject(Actions),
  router = inject(Router),
) => {
  return actions$
    .pipe(
      ofType(RouterActions.go),
      tap(action => router.navigateByUrl(action.path))
    )
}, { functional: true, dispatch: false })


export const backEffect = createEffect((
  actions$ = inject(Actions),
  location = inject(Location),
) => {
  return actions$
    .pipe(
      ofType(RouterActions.back),
      tap(() => location.back()),
    )
}, { functional: true, dispatch: false })


export const forwardEffect = createEffect((
  actions$ = inject(Actions),
  location = inject(Location),
) => {
  return actions$
    .pipe(
      ofType(RouterActions.back),
      tap(() => location.forward()),
    )
}, { functional: true, dispatch: false })

