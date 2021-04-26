import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import { ACTIONS, TYPES } from "../actions/team/index.js";

const loadTeamAPI = () => {
  return fetcher("/", options.GET);
};

const loadTeam = async () => {
  try {
    const result = await loadTeamAPI();
    dispatch(ACTIONS.LoadTeamSuccessAction(result));
  } catch (error) {
    dispatch(ACTIONS.LoadTeamFailAction(error));
  }
};

const watchLoadTeam = () => {
  fork(TYPES.LOAD_TEAM_REQEUST, loadTeam);
};

export default () => {
  watchLoadTeam();
};
