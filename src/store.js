import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
  commonReducer,
  productReducer,
  toDoListReducer,
  userReducer,
} from './redux/reducers/';

import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { commonReducer, productReducer, toDoListReducer, userReducer },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);
