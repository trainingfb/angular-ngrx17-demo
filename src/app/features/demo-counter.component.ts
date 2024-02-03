// features/demo-counter.ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from '../core/store/counter/counter.actions';
import { selectTriple, selectCounterState, selectMultipliedValue, selectValue } from '../core/store/counter/counter.feature';

@Component({
  selector: 'app-demo-counter',
  standalone: true,
  template: `
    <p>
      demo-counter works! {{counter()}} - {{multipliedValue()}} - {{selectTriple()}}
    </p>
    <button (click)="dec()">-</button>
    <button (click)="inc()">+</button>
    <button (click)="reset()">reset</button>
  `,
  styles: ``,
})
export default class DemoCounterComponent {
  store = inject(Store)

  counter = this.store.selectSignal(selectValue)
  multipliedValue = this.store.selectSignal(selectMultipliedValue)
  // NEW
  selectTriple = this.store.selectSignal(selectTriple)

  ngOnInit() {
    console.log(selectValue)
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
}
