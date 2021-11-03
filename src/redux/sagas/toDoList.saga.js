import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { TO_DO_LIST_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getTaskListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:4000/tasks');
    yield put({
      type: SUCCESS(TO_DO_LIST_ACTION.GET_TASK_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(TO_DO_LIST_ACTION.GET_TASK_LIST),
      payload: { error },
    });
  }
}

function* addTaskSaga(action) {
  const { data } = action.payload;
  try {
    yield axios.post('http://localhost:4000/tasks', data);
    yield put({
      type: SUCCESS(TO_DO_LIST_ACTION.ADD_TASK),
    });
    yield put({
      type: REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST),
    });
  } catch (error) {
    yield put({
      type: FAIL(TO_DO_LIST_ACTION.ADD_TASK),
      payload: { error },
    });
  }
}

function* removeTaskSaga(action) {
  const { id } = action.payload;
  try {
    yield axios.delete(`http://localhost:4000/tasks/${id}`);
    yield put({
      type: SUCCESS(TO_DO_LIST_ACTION.REMOVE_TASK),
    });
    yield put({
      type: REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST),
    });
  } catch (error) {
    yield put({
      type: FAIL(TO_DO_LIST_ACTION.REMOVE_TASK),
      payload: { error },
    });
  }
}

function* editTaskSaga(action) {
  const { data } = action.payload;
  try {
    yield axios.patch(`http://localhost:4000/tasks/${data.id}`, data);
    yield put({
      type: SUCCESS(TO_DO_LIST_ACTION.EDIT_TASK),
    });
    yield put({
      type: REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST),
    });
  } catch (error) {
    yield put({
      type: FAIL(TO_DO_LIST_ACTION.EDIT_TASK),
      payload: { error },
    });
  }
}

export function* taskSaga() {
  yield takeEvery(REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST), getTaskListSaga);
  yield takeEvery(REQUEST(TO_DO_LIST_ACTION.ADD_TASK), addTaskSaga);
  yield takeEvery(REQUEST(TO_DO_LIST_ACTION.REMOVE_TASK), removeTaskSaga);
  yield takeEvery(REQUEST(TO_DO_LIST_ACTION.EDIT_TASK), editTaskSaga);
}
