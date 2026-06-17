import { createReducer, on } from '@ngrx/store';
import { CartActions } from './actions';
import { Product } from 'app/modules/product/interfaces/product';

const INITIAL_STATE: Product[] = [];

export const CartReducer = createReducer(
  INITIAL_STATE,
  on(CartActions.addProduct, (state, { product }) => {
    return [...state, product];
  }),
  on(CartActions.restProduct, () => {
    return [];
  }),
  on(CartActions.clearProducts, () => {
    return [];
  }),
);
