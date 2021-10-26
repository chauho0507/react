import { createReducer } from '@reduxjs/toolkit';
import { USER_ACTION } from '../constants';

const initialState = {
  userList: [],
  userInfo: {},
};

const userReducer = createReducer(initialState, {
  [USER_ACTION.GET_USER_INFO]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload,
    };
  },
  [USER_ACTION.GET_USER_LIST]: (state, action) => {
    return {
      ...state,
      userList: action.payload,
    };
  },
  [USER_ACTION.ADD_USER]: (state, action) => {
    const newUserList = [...state.userList];

    return {
      ...state,
      userList: [action.payload, ...newUserList],
    };
  },
  [USER_ACTION.LOGIN]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload,
    };
  },
  [USER_ACTION.LOGOUT]: (state, action) => {
    return {
      ...state,
      userInfo: {},
    };
  },
});

export default userReducer;
