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
};