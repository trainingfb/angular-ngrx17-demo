// app/features/demo-counter/store/counter/counter.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  value: number;
  multiplier: number;
  error: boolean
}

export const initialState: CounterState = {
  value: 0,
  multiplier: 10,
  error: false
};
export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    on(CounterActions.loadSuccess, (state, action) => ({ ...state, value: action.value, error: false})),
    on(CounterActions.loadFailed, (state, action) => ({ ...state, error: true})),
    on(CounterActions.incrementSuccess, (state, action) => ({ ...state, value: action.value})),
    on(CounterActions.decrementSuccess, (state, action) => ({ ...state, value: action.value})),
    on(CounterActions.reset, (state, action) => ({ ...state, value: 0})),
  ),
  extraSelectors:  ({selectValue, selectMultiplier, selectCounterState}) => ({
    selectTriple: createSelector(
      selectValue,
      (value) => value * 3
    )
  }),
});

export const {
  name,
  reducer,
  selectValue,
  selectMultiplier,
  selectError, // NEW
  selectCounterState,
  selectTriple
} = counterFeature;


export const selectMultipliedValue = createSelector(
  selectValue,
  selectMultiplier,
  (value, multiplier) => value * multiplier
)
