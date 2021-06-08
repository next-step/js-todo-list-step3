export const TYPES = {
  GET_TEAM_LIST_REQEUST: "LOAD_TEAM_REQEUST",
  GET_TEAM_LIST_SUCCESS: "LOAD_TEAM_SUCCESS",
  GET_TEAM_LIST_FAIL: "LOAD_TEAM_FAIL",
  ADD_TEAM_REQUEST: "ADD_TEAM_REQUEST",
  ADD_TEAM_SUCCESS: "ADD_TEAM_SUCCESS",
  ADD_TEAM_FAIL: "ADD_TEAM_FAIL",
};

export const ACTIONS = {
  GetTeamListReqAction: { type: TYPES.GET_TEAM_LIST_REQEUST },
  GetTeamListSuccessAction: (data) => {
    return { type: TYPES.GET_TEAM_LIST_SUCCESS, data };
  },
  GetTeamListFailAction: (error) => {
    return { type: GET_TEAM_LIST_FAIL, error };
  },
  AddTeamReqAction: (data) => {
    return { type: TYPES.ADD_TEAM_REQUEST, data };
  },
  AddTeamSuccessActon: (data) => {
    return { type: TYPES.ADD_TEAM_SUCCESS, data };
  },
  AddTeamFailAction: (error) => {
    return { type: TYPES.ADD_TEAM_FAIL, error };
  },
};
