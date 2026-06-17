import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from 'app/modules/product/interfaces/product';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Product': props<{ product: Product }>(),
    'Rest Product': props<{ id: string }>(),
    'Clear Products': emptyProps,
  },
});

export const CartStorageActions = createActionGroup({
  source: 'CartStorage',
  events: {
    'Load Products': emptyProps,
    'Load Products from LocalStorage': props<{ products: Product[] }>(),
  },
});
