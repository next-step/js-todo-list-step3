import * as teamAPI from '../../apis/team';
import * as memberAPI from '../../apis/member';
import * as todoAPI from '../../apis/todo';
import {
  ADD_MEMBER,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  ADD_TODO,
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  CHANGE_MODE,
  DELETE_ALL_TODO,
  DELETE_ALL_TODO_ERROR,
  DELETE_ALL_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  DELETE_TODO_SUCCESS,
  GET_MEMBERS,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  TOGGLE_TODO,
  TOGGLE_TODO_ERROR,
  TOGGLE_TODO_SUCCESS,
} from './action';

export const getMembers = (teamId) => async (dispatch) => {
  dispatch({ type: GET_MEMBERS });
  try {
    const team = await teamAPI.getTeamById(teamId);
    dispatch({ type: GET_MEMBERS_SUCCESS, payload: team.members });
  } catch (error) {
    dispatch({ type: GET_MEMBERS_ERROR, payload: error });
  }
};

export const addMember = (teamId, name) => async (dispatch) => {
  dispatch({ type: ADD_MEMBER });
  try {
    const team = await memberAPI.addMember(teamId, name);
    dispatch({ type: ADD_MEMBER_SUCCESS, payload: team.members });
  } catch (error) {
    dispatch({ type: ADD_MEMBER_ERROR, payload: error });
  }
};

export const addTodo = (teamId, memberId, contents) => async (dispatch) => {
  dispatch({ type: ADD_TODO });
  try {
    const todo = await todoAPI.addTodo(teamId, memberId, contents);
    dispatch({ type: ADD_TODO_SUCCESS, payload: { id: memberId, todo } });
  } catch (error) {
    dispatch({ type: ADD_TODO_ERROR, payload: error });
  }
};

export const deleteTodo = (teamId, memberId, itemId) => async (dispatch) => {
  dispatch({ type: DELETE_TODO });
  try {
    await todoAPI.deleteTodo(teamId, memberId, itemId);
    dispatch({ type: DELETE_TODO_SUCCESS, payload: { memberId, itemId } });
  } catch (error) {
    dispatch({ type: DELETE_TODO_ERROR, payload: error });
  }
};

export const deleteAllTodo = (teamId, memberId) => async (dispatch) => {
  dispatch({ type: DELETE_ALL_TODO });
  try {
    await todoAPI.deleteAllTodo(teamId, memberId);
    dispatch({ type: DELETE_ALL_TODO_SUCCESS, payload: memberId });
  } catch (error) {
    dispatch({ type: DELETE_ALL_TODO_ERROR, payload: error });
  }
};

export const toggleTodo = (teamId, memberId, itemId) => async (dispatch) => {
  dispatch({ type: TOGGLE_TODO });
  try {
    const todo = await todoAPI.toggleTodo(teamId, memberId, itemId);
    dispatch({
      type: TOGGLE_TODO_SUCCESS,
      payload: { memberId, itemId, todo },
    });
  } catch (error) {
    dispatch({ type: TOGGLE_TODO_ERROR, payload: error });
  }
};

export const changeMode = (memberId, mode) => (dispatch) => {
  dispatch({ type: CHANGE_MODE, payload: { id: memberId, mode } });
};
