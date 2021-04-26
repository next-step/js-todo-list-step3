import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import * as types from "../actions/team/index.js";

const loadTeamAPI = () => {
  return fetcher("/", options.GET);
};

const loadTeam = async () => {
  try {
    const result = await loadTeamAPI();
    dispatch(types.LoadTeamSuccessAction(result));
  } catch (error) {
    dispatch(types.LoadTeamFailAction(error));
  }
};

const watchLoadTeam = () => {
  fork(types.LOAD_TEAM_REQEUST, loadTeam);
};

export default () => {
  watchLoadTeam();
};
