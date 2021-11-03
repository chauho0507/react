import { createAction } from '@reduxjs/toolkit';
import { TO_DO_LIST_ACTION, REQUEST } from '../constants';

export const getTaskListAction = createAction(
  REQUEST(TO_DO_LIST_ACTION.GET_TASK_LIST)
);
export const addTaskAction = createAction(REQUEST(TO_DO_LIST_ACTION.ADD_TASK));
export const deleteTaskAction = createAction(
  REQUEST(TO_DO_LIST_ACTION.REMOVE_TASK)
);
export const editTaskAction = createAction(
  REQUEST(TO_DO_LIST_ACTION.EDIT_TASK)
);
