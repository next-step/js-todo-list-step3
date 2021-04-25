import * as types from "./types.js";

export const loadTeams = {
  type: types.LOAD_TEAMS,
};

export const addTeam = (data) => {
  return {
    type: types.ADD_TEAM,
    data,
  };
};

export const removeTeam = (data) => {
  return {
    type: types.REMOVE_TEAM,
    data,
  };
};

export const loadUsers = (data) => {
  return {
    type: types.LOAD_USERS,
    data,
  };
};

export const addUser = (data) => {
  return {
    type: types.ADD_USER,
    data,
  };
};

export const removeUser = (data) => {
  return {
    type: types.REMOVE_USER,
    data,
  };
};

export const addTodo = (data) => {
  return {
    type: types.ADD_TODO,
    data,
  };
};

export const removeTodo = (data) => {
  return {
    type: types.REMOVE_TODO,
    data,
  };
};

export const removeAllTodo = (data) => {
  return {
    type: types.REMOVE_ALL_TODO,
    data,
  };
};

export const editTodo = (data) => {
  return {
    type: types.EDIT_TODO,
    data,
  };
};

export const toggleTodo = (data) => {
  return {
    type: types.TOGGLE_TODO,
    data,
  };
};

export const setPriorityTodo = (data) => {
  return {
    type: types.SET_PRIORITY_TODO,
    data,
  };
};
