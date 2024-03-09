import { Component, inject, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { CartActions } from '../core/store/cart/cart.actions';
import { FiltersActions } from '../core/store/products/filters.actions';
import { selectFilteredList, selectFilteredProducts } from '../core/store/products/filters.feature';
import { ProductsActions } from '../core/store/products/products.actions';
import { Product } from '../model/product';
import { SidePanelComponent } from '../shared/side-panel.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  // NEW
  imports: [NgForOf, ReactiveFormsModule, SidePanelComponent],
  template: `
      
    <!--NEW-->
    <input type="text" [formControl]="input" placeholder="Search" >
   
    @for (product of products(); track product.id) {
      <li> 
          {{product.name}} - € {{product.cost}}
          <button (click)="addProductToCart(product)">Add button</button>
      </li>
    }

    <app-side-panel [(opened)]="isCartOpened"/>
    
    
  `,
})
export default class ShopComponent implements OnInit {
  readonly store = inject(Store)
  readonly products = this.store.selectSignal(selectFilteredList)
  // NEW: or you can use the extraSelector instead of products
  readonly filteredProducts = this.store.selectSignal(selectFilteredProducts)

  input = new FormControl('', { nonNullable: true })

  isCartOpened = true;

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())

    // NEW
    this.input.valueChanges
      .pipe(debounceTime(300))
      .subscribe(text => {
        this.store.dispatch(FiltersActions.search({ text }))
      })
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({item:  product}))
  }
}
