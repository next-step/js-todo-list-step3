import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import { ACTIONS, TYPES } from "../actions/team/index.js";

const loadTeamAPI = () => {
  return fetcher("/", options.GET);
};

const addTeamAPI = (name) => {
  return fetcher("/", options.POST({ name }));
};

const loadTeam = async () => {
  try {
    const result = await loadTeamAPI();
    dispatch(ACTIONS.LoadTeamSuccessAction(result));
  } catch (error) {
    dispatch(ACTIONS.LoadTeamFailAction(error));
  }
};

const addTeam = async (action) => {
  try {
    const result = await addTeamAPI(action.data);
    dispatch(ACTIONS.AddTeamSuccessActon(result));
  } catch (error) {
    dispatch(ACTIONS.AddTeamFailAction(error));
  }
};

const watchLoadTeam = () => {
  fork(TYPES.LOAD_TEAM_REQEUST, loadTeam);
};

const watchAddTeam = () => {
  fork(TYPES.ADD_TEAM_REQUEST, addTeam);
};

export default () => {
  watchLoadTeam();
  watchAddTeam();
};
