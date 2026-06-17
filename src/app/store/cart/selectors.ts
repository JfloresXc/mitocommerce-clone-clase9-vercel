import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'app/modules/product/interfaces/product';

export const CartFeatureSelector = createFeatureSelector<Product[]>('Cart');

export const selectProductsInCart = createSelector(CartFeatureSelector, (state) => state);

export const selectCountOfProducts = createSelector(CartFeatureSelector, (state) => {
  return state.length;
});

export const selectTotalPrice = createSelector(CartFeatureSelector, (state) => {
  const total = state.reduce((acc, product) => {
    return acc + (product?.price ?? 0) * (product?.quantity ?? 0);
  }, 0);
  return total;
});
