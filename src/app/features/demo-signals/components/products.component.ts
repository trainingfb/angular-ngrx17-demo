// features/demo-signals/components/products.component.ts
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShopProductStore } from '../store/shop-products.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    JsonPipe
  ],
  template: `
    <h1>Products</h1>
    
    <input type="text" (input)="store.updateQuery(input.value)" #input placeholder="filter">
    
    @if (store.isLoading()) {
        <div>loading...</div>
    }

    @for (product of store.products(); track product.id ) {
        <li>{{product.name}}</li>
    }
    query: {{store.query()}}
    total: {{store.totalCost()}}
    <pre>{{store.products() | json}}</pre>
  `,
  providers: [ShopProductStore]
})
export class ProductsComponent {
  readonly store = inject(ShopProductStore);

}
