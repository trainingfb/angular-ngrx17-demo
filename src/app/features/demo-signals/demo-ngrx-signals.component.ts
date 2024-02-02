import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsComponent } from './components/products.component';
import TodosComponent from './components/todos.component';
import { TodosStore } from './store/todos.store';

@Component({
  selector: 'app-demo-ngrx-signals',
  standalone: true,
  imports: [
    JsonPipe,
    TodosComponent,
    ProductsComponent
  ],
  template: `
  
    <div style="display: flex; gap: 20px">
        <div style="width: 50%">
          <app-todos />
        </div>
        <div style="width: 50%">
          <app-products />
        </div>
    </div>
  `,
  providers: [  ]
})
export default class DemoNgrxSignalsComponent {
}
