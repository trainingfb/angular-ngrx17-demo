import { createActionGroup, props } from '@ngrx/store';

export const FiltersActions = createActionGroup({
  source: 'Filters API',
  events: {
    'Search': props<{ text: string}>(),
  }
});
