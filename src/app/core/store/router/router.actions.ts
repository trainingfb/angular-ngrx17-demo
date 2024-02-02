import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    'go': props<{ path: string }>(),
    'back': emptyProps,
    'forward': emptyProps,
  }
})



/*
// OLD WAY
export const go = createAction(
  '[ROUTER] go',
  props<{ path: string }>()
);

export const back = createAction('[ROUTER] back');
export const forward = createAction('[ROUTER] forward');
*/
