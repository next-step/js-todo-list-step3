import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import * as types from "../actions/team/types.js";

const loadTeamAPI = () => {
  return fetcher("/", options.GET);
};

const loadTeam = async () => {
  try {
    const result = await loadTeamAPI();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const watchLoadTeam = () => {
  fork(types.LOAD_TEAM_REQEUST, loadTeam);
};

export default () => {
  watchLoadTeam();
};
