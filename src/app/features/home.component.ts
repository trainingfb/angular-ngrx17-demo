import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterActions } from '../core/store/router/router.actions';
import { selectUrl } from '../core/store/router/router.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p>
      home works!{{url()}}
    </p>
  `,
})
export default class HomeComponent {
  store = inject(Store)
  url = this.store.selectSignal(selectUrl)

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(RouterActions.go({path: 'shop'}));
    }, 2000)
  }
}
