import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

function* getUserInfoSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
    // if (result.data.user.role === 'admin') yield callback.redirectDashboard();
    // else yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: { error: error.response.data },
    });
  }
}
function* loginSaga(action) {
  const { data, callback } = action.payload;
  try {
    const result = yield axios.post('http://localhost:4000/login', data);
    yield localStorage.setItem(
      'userInfo',
      JSON.stringify({
        accessToken: result.data.accessToken,
        role: result.data.user.role,
      })
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    if (result.data.user.role === 'admin') yield callback.redirectDashboard();
    else yield callback.redirectHome();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: { error: error.response.data },
    });
  }
}
function* registerSaga(action) {
  const { data, callback } = action.payload;
  try {
    yield axios.post('http://localhost:4000/register', data);
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
    });
    yield callback.goBackLogin();
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error:
          error.response.data === 'Email already exists'
            ? 'Email đã tồn tại!'
            : 'Đăng kí không thành công!',
      },
    });
  }
}
export function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
}
