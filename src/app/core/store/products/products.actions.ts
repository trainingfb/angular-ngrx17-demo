import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../model/product';

export const ProductsActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ items: Product[] }>(),
    'Load Fail': emptyProps(),
    'Add Product': props<{ item: Product }>(),
    'Add Product Success':  props<{ item: Product }>(),
    'Add Product Fail': emptyProps(),
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Fail': emptyProps(),
  }
});
