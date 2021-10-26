import { createReducer } from '@reduxjs/toolkit';
import { PRODUCT_LIST } from '../constants';
const initialState = {
  productList: [
    {
      id: '1',
      name: 'iPhone 13',
      price: 30000000,
      isNew: true,
      image: 'https://via.placeholder.com/800x600',
    },
    {
      id: '2',
      name: 'iPhone 13 Mini',
      price: 25000000,
      isNew: false,
      image: 'https://via.placeholder.com/800x600',
    },
    {
      id: '3',
      name: 'iPhone 13 Pro',
      price: 35000000,
      isNew: true,
      image: 'https://via.placeholder.com/800x600',
    },
    {
      id: '4',
      name: 'iPhone 13 Pro Max',
      price: 40000000,
      isNew: false,
      image: 'https://via.placeholder.com/800x600',
    },
    {
      id: '5',
      name: 'iPad mini 6',
      price: 15000000,
      isNew: false,
      image: 'https://via.placeholder.com/800x600',
    },
  ],
  productDetail: {},
};

const productReducer = createReducer(initialState, {
  [PRODUCT_LIST.GET_PRODUCT_LIST]: (state, action) => {
    return {
      ...state,
      productList: action.payload,
    };
  },
  [PRODUCT_LIST.CREATE_PRODUCT]: (state, action) => {
    const newProductList = [...state.productList];
    return {
      ...state,
      productList: [action.payload, ...newProductList],
    };
  },
  [PRODUCT_LIST.DELETE_PRODUCT]: (state, action) => {
    const newProductList = state.productList.filter(
      product => product.id !== action.payload.id
    );
    return {
      ...state,
      productList: newProductList,
    };
  },
  [PRODUCT_LIST.GET_PRODUCT_DETAIL]: (state, action) => {
    return {
      ...state,
      productDetail: action.payload,
    };
  },
  [PRODUCT_LIST.UPDATE_PRODUCT]: (state, action) => {
    const productIndex = state.productList.findIndex(
      product => product.id === action.payload.id
    );
    const newProductList = [...state.productList];
    newProductList.splice(productIndex, 1, action.payload);
    return {
      ...state,
      productList: newProductList,
    };
  },
});

export default productReducer;
