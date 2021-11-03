import { createReducer } from '@reduxjs/toolkit';
import { TO_DO_LIST_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  taskList: {
    data: [],
    loading: false,
    error: null,
  },
  actionLoading: {
    addTask: false,
    editTask: false,
    removeTask: false,
  },
};

const toDoListReducer = createReducer(initialState, {
  [REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST)]: (state, action) => {
    return {
      ...state,
      taskList: {
        ...state.taskList,
        loading: true,
      },
    };
  },
  [SUCCESS(TO_DO_LIST_ACTION.GET_TASK_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      taskList: {
        ...state.taskList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(TO_DO_LIST_ACTION.GET_TASK_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      taskList: {
        ...state.taskList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(TO_DO_LIST_ACTION.ADD_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addTask: true,
      },
    };
  },
  [SUCCESS(TO_DO_LIST_ACTION.ADD_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addTask: false,
      },
    };
  },
  [FAIL(TO_DO_LIST_ACTION.ADD_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addTask: false,
      },
    };
  },

  [REQUEST(TO_DO_LIST_ACTION.REMOVE_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeTask: true,
      },
    };
  },
  [SUCCESS(TO_DO_LIST_ACTION.REMOVE_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeTask: false,
      },
    };
  },
  [FAIL(TO_DO_LIST_ACTION.REMOVE_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeTask: false,
      },
    };
  },

  [REQUEST(TO_DO_LIST_ACTION.EDIT_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        editTask: true,
      },
    };
  },
  [SUCCESS(TO_DO_LIST_ACTION.EDIT_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        editTask: false,
      },
    };
  },
  [FAIL(TO_DO_LIST_ACTION.EDIT_TASK)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        editTask: false,
      },
    };
  },
});

export default toDoListReducer;
