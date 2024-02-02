// core/store/counter/counter.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  value: number;
  // NEW
  multiplier: number;
}

export const initialState: CounterState = {
  value: 0,
  // NEW
  multiplier: 10,
};
export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    on(CounterActions.increment, (state, action) => ({ ...state, value: state.value + 1})),
    on(CounterActions.decrement, (state, action) => ({ ...state, value: state.value - action.value})),
    on(CounterActions.reset, (state, action) => ({ ...state, value: 0})),

  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectValue, // selector for `books` property
  // NEW
  selectMultiplier,
  selectCounterState
} = counterFeature;



// NEW
export const selectMultipliedValue = createSelector(
  selectValue,
  selectMultiplier,
  (value, multiplier) => value * multiplier
)
