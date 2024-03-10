// features/demo-counter/demo-counter.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from './store/counter/counter.actions';
import { selectTriple, selectMultipliedValue, selectValue, selectError } from './store/counter/counter.feature';
import { SidePanelComponent } from '../../shared/side-panel.component';
import { CounterUIActions } from './store/ui/counter-ui.actions';
import { selectIsSidePanelOpened } from './store/ui/counter-ui.feature';

@Component({
  selector: 'app-demo-counter',
  standalone: true,
  template: `
    
    @if(error()) {
      <div class="alert alert-error">AHIA!</div>    
    }
    
    <button (click)="openPanel()">Open Panel {{counter()}}</button>
    
      <app-side-panel
        title="Counter Demo"
        [isOpen]="isPanelOpened()"
        (close)="closePanel()"
      >
        <div>
          <div>Counter: {{ counter() }} </div>
          <div>multipliedValue: {{ multipliedValue() }} </div>
          <div>selectTriple: {{ selectTriple() }} </div>
        </div>
        <button (click)="dec()">-</button>
        <button (click)="inc()">+</button>
        <button (click)="reset()">reset</button>
      </app-side-panel>    

  `,
  styles: ``,
  imports: [
    SidePanelComponent
  ]
})
export default class DemoCounterComponent {
  store = inject(Store)
  isPanelOpened = this.store.selectSignal(selectIsSidePanelOpened)

  counter = this.store.selectSignal(selectValue)
  error = this.store.selectSignal(selectError)
  multipliedValue = this.store.selectSignal(selectMultipliedValue)
  selectTriple = this.store.selectSignal(selectTriple)

  constructor() {
    this.store.dispatch(CounterActions.load())
  }

  dec() {
    this.store.dispatch(CounterActions.decrement({ value: 5}))
  }
  inc() {
    this.store.dispatch(CounterActions.increment())
  }
  reset() {
    this.store.dispatch(CounterActions.reset())
  }

  openPanel() {
    this.store.dispatch(CounterUIActions.openSidePanel())
    //  this.store.dispatch(CounterUIActions.toggleSidePanel())
  }

  closePanel() {
    this.store.dispatch(CounterUIActions.closeSidePanel())

  }
}
