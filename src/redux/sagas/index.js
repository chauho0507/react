import { fork } from 'redux-saga/effects';

import { productSaga } from './product.saga';
import { taskSaga } from './toDoList.saga';

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(taskSaga);
}
