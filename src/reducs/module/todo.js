import { createAction } from '../../lib/reducs';
import { TeamService } from '../../services';
import { FILTER_STATUS } from 'utils';

export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TOODS_AND_MEMBER = 'DELETE_ALL_TOODS_AND_MEMBER';
export const TODO_ERROR = 'TODO_ERROR';
export const SET_PRIORITY = 'SET_PRIORITY';
export const START_EDIT_TODO = 'START_EDIT_TODO';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const CONFIRM_EDIT = 'CONFIRM_EDIT';
export const CHANGE_MODE = 'CHANGE_MODE';

export const addTodoAsync = (teamId, memberId, payload) => async (
  dispatch,
  getState
) => {
  const newTodo = await TeamService.addMemberTodoItem(
    teamId,
    memberId,
    payload
  );

  dispatch(createAction(ADD_TODO, { id: memberId, contents: newTodo }));
};

export const toggleTodoAsync = (teamId, memberId, itemId) => async (
  dispatch,
  getState
) => {
  const toggledTodo = await TeamService.toggleMemberTodoItem(
    teamId,
    memberId,
    itemId
  );
  dispatch(
    createAction(TOGGLE_TODO, { id: memberId, target: itemId, toggledTodo })
  );
};

export const deleteTodoAsync = (teamId, memberId, itemId) => async (
  dispatch,
  getState
) => {
  await TeamService.deleteMemberTodoItem(teamId, memberId, itemId);
  dispatch(createAction(DELETE_TODO, { id: memberId, target: itemId }));
};

export const deleteAllTodoAsync = (teamId, memberId) => async (
  dispatch,
  getState
) => {
  await TeamService.deleteAllTodoItems(teamId, memberId);
  dispatch(createAction(DELETE_ALL_TOODS_AND_MEMBER, { id: memberId }));
};

export const setPriorityTodoAsync = (
  teamId,
  memberId,
  itemId,
  payload
) => async (dispatch, getState) => {
  const newTodo = await TeamService.setPriorityTodoItem(
    teamId,
    memberId,
    itemId,
    payload
  );
  dispatch(
    createAction(SET_PRIORITY, { id: memberId, target: itemId, newTodo })
  );
};

export const confirmEdit = (teamId, memberId, itemId, payload) => async (
  dispatch,
  getState
) => {
  const updatedTodo = await TeamService.updateMemberTodoItem(
    teamId,
    memberId,
    itemId,
    payload
  );
  dispatch(
    createAction(CONFIRM_EDIT, { id: memberId, target: itemId, updatedTodo })
  );
};

export const startEdit = editingId => {
  return createAction(START_EDIT_TODO, editingId);
};
export const cancelEdit = () => {
  return createAction(CANCEL_EDIT);
};

export const changeFilterMode = (memberId, mode) => {
  return createAction(CHANGE_MODE, { id: memberId, mode });
};
