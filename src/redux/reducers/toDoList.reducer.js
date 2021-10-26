import { createReducer } from '@reduxjs/toolkit';
import { TO_DO_LIST } from '../constants';

const initialState = {
  taskList: [],
};

const toDoListReducer = createReducer(initialState, {
  [TO_DO_LIST.GET_TASK_LIST]: (state, action) => {
    return {
      ...state,
      taskList: action.payload,
    };
  },
  [TO_DO_LIST.ADD_TASK]: (state, action) => {
    const newTaskList = [...state.taskList];
    return {
      ...state,
      taskList: [action.payload, ...newTaskList],
    };
  },
  [TO_DO_LIST.DELETE_TASK]: (state, action) => {
    const newTaskList = [...state.taskList];
    newTaskList.splice(action.payload.index, 1);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
  [TO_DO_LIST.EDIT_TASK]: (state, action) => {
    const newTaskList = [...state.taskList];
    newTaskList.splice(action.payload.index, 1, action.payload.values);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
});

export default toDoListReducer;
