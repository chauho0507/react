import { configureStore } from '@reduxjs/toolkit';

import {
  commonReducer,
  productReducer,
  toDoListReducer,
  userReducer,
} from './redux/reducers/';

export const store = configureStore({
  reducer: { commonReducer, productReducer, toDoListReducer, userReducer },
});
