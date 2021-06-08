import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import { ACTIONS, TYPES } from "../actions/team.js";

const getTeamListAPI = () => {
  return fetcher("/", options.GET);
};

const addTeamAPI = (name) => {
  return fetcher("/", options.POST({ name }));
};

const getTeamList = async () => {
  try {
    const result = await getTeamListAPI();
    dispatch(ACTIONS.GetTeamListSuccessAction(result));
  } catch (error) {
    dispatch(ACTIONS.GetTeamListFailAction(error));
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

const watchGetTeamList = () => {
  fork(TYPES.GET_TEAM_LIST_REQEUST, getTeamList);
};

const watchAddTeam = () => {
  fork(TYPES.ADD_TEAM_REQUEST, addTeam);
};

export default () => {
  watchGetTeamList();
  watchAddTeam();
};
