// core/store/counter/counter.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter API',
  events: {
    'Increment': emptyProps(),
    'Decrement': props<{ value: number }>(),
    'Reset': emptyProps(),
  }
});
