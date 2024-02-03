// core/store/products/filters.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FiltersActions } from './filters.actions';
import { selectList } from './products-feature';

export interface FiltersState {
  text: string;
}

export const initialState: FiltersState = {
  text: '',
}

export const filtersFeature = createFeature({
  name: 'filters',
  reducer: createReducer(
    initialState,
    on(FiltersActions.search, (state, action) => ({ ...state, text: action.text})),
  ),
  // NEW
  extraSelectors: ({ selectText }) => ({
    selectFilteredProducts:  createSelector(
      selectList,
      selectText,
      (list, text) => list.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
    )
  })
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectText, // selector for `text` property
  // NEW
  selectFilteredProducts
} = filtersFeature;


export const selectFilteredList = createSelector(
  selectList,
  selectText,
  (list, text) => list.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
)
