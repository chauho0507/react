import { createAction } from '@reduxjs/toolkit';
import { PRODUCT_LIST } from '../constants';

export const getProductListAction = createAction(PRODUCT_LIST.GET_PRODUCT_LIST);
export const createProductAction = createAction(PRODUCT_LIST.CREATE_PRODUCT);
export const deleteProductAction = createAction(PRODUCT_LIST.DELETE_PRODUCT);
export const updateProductAction = createAction(PRODUCT_LIST.UPDATE_PRODUCT);
export const getProductDetailAction = createAction(
  PRODUCT_LIST.GET_PRODUCT_DETAIL
);
