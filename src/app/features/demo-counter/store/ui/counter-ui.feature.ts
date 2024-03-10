// features/demo-counter/store/ui/counter-ui.feature.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { CounterUIActions } from './counter-ui.actions';

export interface UIState {
  isSidePanelOpened: boolean;
}

export const initialState: UIState = {
  isSidePanelOpened: false,
};
export const counterUIFeature = createFeature({
  name: 'counter-ui',
  reducer: createReducer(
    initialState,
    on(CounterUIActions.openSidePanel, (state) => ({ ...state, isSidePanelOpened: true})),
    on(CounterUIActions.closeSidePanel, (state) => ({ ...state, isSidePanelOpened: false})),
    on(CounterUIActions.toggleSidePanel, (state) => ({ ...state, isSidePanelOpened: !state.isSidePanelOpened})),
  ),
});

export const {
  name,
  reducer,
  selectIsSidePanelOpened
} = counterUIFeature;
