// features/demo-counter/store/ui/counter-ui.actions.ts

import { createActionGroup, emptyProps } from '@ngrx/store';

export const CounterUIActions = createActionGroup({
  source: 'UI',
  events: {
    'Open Side Panel': emptyProps(),
    'Close Side Panel': emptyProps(),
    'Toggle Side Panel': emptyProps(),
  }
});
