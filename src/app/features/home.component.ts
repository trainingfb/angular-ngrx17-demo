import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterActions } from '../core/store/router/router.actions';
import { selectUrl } from '../core/store/router/router.selectors';
import { SidePanelComponent } from '../shared/side-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidePanelComponent
  ],
  template: `
    <p>
      home works!{{url()}}
    </p>
  `,
})
export default class HomeComponent implements OnInit {
  store = inject(Store)
  url = this.store.selectSignal(selectUrl)

  ngOnInit() {
    // change page
    setTimeout(() => {
      // this.store.dispatch(RouterActions.go({path: 'shop'}));
    }, 2000)
  }
}
