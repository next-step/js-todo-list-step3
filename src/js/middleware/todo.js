import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import { ACTIONS, TYPES } from "../actions/todo.js";

const getSingleTeamAPI = (id) => {
  return fetcher(`/${id}`, options.GET);
};

const getSingleTeam = async (action) => {
  try {
    const result = await getSingleTeamAPI(action.data);
    dispatch(ACTIONS.GetSingleTeamSuccessAction(result));
  } catch (error) {
    dispatch(ACTIONS.GetSingleTeamFailAction(error));
  }
};

const watchGetSingleTeam = () => {
  fork(TYPES.GET_SINGLE_TEAM_REQUEST, getSingleTeam);
};

export default () => {
  watchGetSingleTeam();
};
