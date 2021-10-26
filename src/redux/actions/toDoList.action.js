import { createAction } from '@reduxjs/toolkit';
import { TO_DO_LIST } from '../constants';

export const getTaskListAction = createAction(TO_DO_LIST.GET_TASK_LIST);
export const addTaskAction = createAction(TO_DO_LIST.ADD_TASK);
export const deleteTaskAction = createAction(TO_DO_LIST.DELETE_TASK);
export const editTaskAction = createAction(TO_DO_LIST.EDIT_TASK);
