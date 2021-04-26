export const LOAD_TEAM_REQEUST = "LOAD_TEAM_REQEUST";
export const LOAD_TEAM_SUCCESS = "LOAD_TEAM_SUCCESS";
export const LOAD_TEAM_FAIL = "LOAD_TEAM_FAIL";

export const LoadTeamReqAction = { type: LOAD_TEAM_REQEUST };
export const LoadTeamSuccessAction = (data) => {
  return { type: LOAD_TEAM_SUCCESS, data };
};
export const LoadTeamFailAction = (error) => {
  return { type: LOAD_TEAM_FAIL, error };
};
