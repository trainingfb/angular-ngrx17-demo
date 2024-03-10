// app/features/demo-counter/store/counter/counter.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'Load': emptyProps(),
    'LoadSuccess': props<{ value: number }>(),
    'LoadFailed': emptyProps(),

    'Increment': emptyProps(),
    // NEW
    'IncrementSuccess': props<{ value: number }>(),
    'IncrementFailed': emptyProps(),

    'Decrement': props<{ value: number }>(),
    // NEW
    'DecrementSuccess': props<{ value: number }>(),
    'DecrementFailed': emptyProps(),
    'Reset': emptyProps(),
  }
});
