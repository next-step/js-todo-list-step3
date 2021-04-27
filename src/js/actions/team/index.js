export const TYPES = {
  LOAD_TEAM_REQEUST: "LOAD_TEAM_REQEUST",
  LOAD_TEAM_SUCCESS: "LOAD_TEAM_SUCCESS",
  LOAD_TEAM_FAIL: "LOAD_TEAM_FAIL",
  ADD_TEAM_REQUEST: "ADD_TEAM_REQUEST",
  ADD_TEAM_SUCCESS: "ADD_TEAM_SUCCESS",
  ADD_TEAM_FAIL: "ADD_TEAM_FAIL",
};

export const ACTIONS = {
  LoadTeamReqAction: { type: TYPES.LOAD_TEAM_REQEUST },
  LoadTeamSuccessAction: (data) => {
    return { type: TYPES.LOAD_TEAM_SUCCESS, data };
  },
  LoadTeamFailAction: (error) => {
    return { type: LOAD_TEAM_FAIL, error };
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
