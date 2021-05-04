export const TYPES = {
  GET_SINGLE_TEAM_REQUEST: "GET_SINGLE_TEAM_REQUEST",
  GET_SINGLE_TEAM_SUCCESS: "GET_SINGLE_TEAM_SUCCESS",
  GET_SINGLE_TEAM_FAIL: "GET_SINGLE_TEAM_FAIL",
  ADD_USER_REQUEST: "ADD_USER_REQUEST",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  ADD_USER_FAIL: "ADD_USER_FAIL",
  ADD_NEW_TODO_REQUEST: "ADD_NEW_TODO_REQUEST",
  ADD_NEW_TODO_SUCCESS: "ADD_NEW_TODO_SUCCESS",
  ADD_NEW_TODO_FAIL: "ADD_NEW_TODO_FAIL",
  REMOVE_TODO_REQUEST: "REMOVE_TODO_REQUEST",
  REMOVE_TODO_SUCCESS: "REMOVE_TODO_SUCCESS",
  REMOVE_TODO_FAIL: "REMOVE_TODO_FAIL",
  TOGGLE_TODO_REQUEST: "TOGGLE_TODO_REQUEST",
  TOGGLE_TODO_SUCCESS: "TOGGLE_TODO_SUCCESS",
  TOGGLE_TODO_FAIL: "TOGGLE_TODO_FAIL",
  UPDATE_TODO_REQUEST: "UPDATE_TODO_REQUEST",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAIL: "UPDATE_TODO_FAIL",
};

export const ACTIONS = {
  GetSingleTeamReqAction: (data) => {
    return { type: TYPES.GET_SINGLE_TEAM_REQUEST, data };
  },
  GetSingleTeamSuccessAction: (data) => {
    return { type: TYPES.GET_SINGLE_TEAM_SUCCESS, data };
  },
  GetSingleTeamFailAction: (error) => {
    return { type: TYPES.GET_SINGLE_TEAM_FAIL, error };
  },
  AddUserReqAction: (data) => {
    return { type: TYPES.ADD_USER_REQUEST, data };
  },
  AddUserSuccessAction: (data) => {
    return { type: TYPES.ADD_USER_SUCCESS, data };
  },
  AddUserFailAction: (error) => {
    return { type: TYPES.ADD_USER_FAIL, error };
  },
  AddNewTodoReqAction: (data) => {
    return { type: TYPES.ADD_NEW_TODO_REQUEST, data };
  },
  AddNewTodoSuccessAction: (data) => {
    return { type: TYPES.ADD_NEW_TODO_SUCCESS, data };
  },
  AddNewTodoFailAction: (error) => {
    return { type: TYPES.ADD_NEW_TODO_FAIL, error };
  },
  RemoveTodoReqAction: (data) => {
    return { type: TYPES.REMOVE_TODO_REQUEST, data };
  },
  RemoveTodoSuccessAction: (data) => {
    return { type: TYPES.REMOVE_TODO_SUCCESS, data };
  },
  RemoveTodoFailAction: (error) => {
    return { type: TYPES.REMOVE_TODO_FAIL, error };
  },
  ToggleTodoReqAction: (data) => {
    return { type: TYPES.TOGGLE_TODO_REQUEST, data };
  },
  ToggleTodoSuccessAction: (data) => {
    return { type: TYPES.TOGGLE_TODO_SUCCESS, data };
  },
  ToggleTodoFailAction: (error) => {
    return { type: TYPES.TOGGLE_TODO_FAIL, error };
  },
  UpdateTodoReqAction: (data) => {
    return { type: TYPES.UPDATE_TODO_REQUEST, data };
  },
  UpdateTodoSuccessAction: (data) => {
    return { type: TYPES.UPDATE_TODO_SUCCESS, data };
  },
  UpdateTodoFailAction: (error) => {
    return { type: TYPES.UPDATE_TODO_FAIL, error };
  },
};
