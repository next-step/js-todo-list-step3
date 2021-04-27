import { fetcher, options } from "../utils/api.js";
import { fork } from "./index.js";
import { dispatch } from "../redux/functions.js";
import { ACTIONS, TYPES } from "../actions/todo.js";

const getSingleTeamAPI = (id) => {
  return fetcher(`/${id}`, options.GET);
};

const addUserAPI = ({ teamId, name }) => {
  return fetcher(`/${teamId}/members`, options.POST({ name }));
};

const getSingleTeam = async (action) => {
  try {
    const result = await getSingleTeamAPI(action.data);
    dispatch(ACTIONS.GetSingleTeamSuccessAction(result));
  } catch (error) {
    dispatch(ACTIONS.GetSingleTeamFailAction(error));
  }
};

const addUser = async (action) => {
  try {
    const result = await addUserAPI(action.data);
    dispatch(ACTIONS.AddUserSuccessAction(result));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.AddUserFailAction(error));
  }
};

const watchGetSingleTeam = () => {
  fork(TYPES.GET_SINGLE_TEAM_REQUEST, getSingleTeam);
};

const watchAddUser = () => {
  fork(TYPES.ADD_USER_REQUEST, addUser);
};

export default () => {
  watchGetSingleTeam();
  watchAddUser();
};
