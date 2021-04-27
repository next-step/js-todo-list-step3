export const TYPES = {
  GET_SINGLE_TEAM_REQUEST: "GET_SINGLE_TEAM_REQUEST",
  GET_SINGLE_TEAM_SUCCESS: "GET_SINGLE_TEAM_SUCCESS",
  GET_SINGLE_TEAM_FAIL: "GET_SINGLE_TEAM_FAIL",
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
};
