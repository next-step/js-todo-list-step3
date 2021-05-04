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

const addNewTodoAPI = ({ teamId, memberId, contents }) => {
  return fetcher(
    `/${teamId}/members/${memberId}/items`,
    options.POST({ contents })
  );
};

const removeTodoAPI = ({ teamId, memberId, itemId }) => {
  return fetcher(
    `/${teamId}/members/${memberId}/items/${itemId}`,
    options.DELETE
  );
};

const toggleTodoAPI = ({ teamId, memberId, itemId }) => {
  return fetcher(
    `/${teamId}/members/${memberId}/items/${itemId}/toggle`,
    options.PUT()
  );
};

const updateTodoAPI = ({ teamId, memberId, itemId, contents }) => {
  return fetcher(
    `/${teamId}/members/${memberId}/items/${itemId}`,
    options.PUT({ contents })
  );
};

const setPriorityAPI = ({ teamId, memberId, itemId, priority }) => {
  return fetcher(
    `/${teamId}/members/${memberId}/items/${itemId}/priority`,
    options.PUT({ priority })
  );
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

const addNewTodo = async (action) => {
  try {
    const result = await addNewTodoAPI(action.data);
    const { memberId } = action.data;
    result["memberId"] = memberId;
    dispatch(ACTIONS.AddNewTodoSuccessAction(result));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.AddNewTodoFailAction(error));
  }
};

const removeTodo = async (action) => {
  try {
    await removeTodoAPI(action.data);
    dispatch(ACTIONS.RemoveTodoSuccessAction(action.data));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.RemoveTodoFailAction(error));
  }
};

const toggleTodo = async (action) => {
  try {
    await toggleTodoAPI(action.data);
    dispatch(ACTIONS.ToggleTodoSuccessAction(action.data));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.ToggleTodoFailAction(error));
  }
};

const updateTodo = async (action) => {
  try {
    const newData = await updateTodoAPI(action.data);
    const result = {
      memberId: action.data.memberId,
      itemId: action.data.itemId,
      newData,
    };
    dispatch(ACTIONS.UpdateTodoSuccessAction(result));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.UpdateTodoFailAction(error));
  }
};

const setPriority = async (action) => {
  try {
    const newData = await setPriorityAPI(action.data);
    const result = {
      memberId: action.data.memberId,
      itemId: action.data.itemId,
      newData,
    };
    dispatch(ACTIONS.SetPrioritySuccessAction(result));
  } catch (error) {
    console.error(error);
    dispatch(ACTIONS.SetPriorityFailction(error));
  }
};

const watchGetSingleTeam = () => {
  fork(TYPES.GET_SINGLE_TEAM_REQUEST, getSingleTeam);
};

const watchAddUser = () => {
  fork(TYPES.ADD_USER_REQUEST, addUser);
};

const watchAddNewTodo = () => {
  fork(TYPES.ADD_NEW_TODO_REQUEST, addNewTodo);
};

const watchRemoveTodo = () => {
  fork(TYPES.REMOVE_TODO_REQUEST, removeTodo);
};

const watchToggleTodo = () => {
  fork(TYPES.TOGGLE_TODO_REQUEST, toggleTodo);
};

const watchUpdateTodo = () => {
  fork(TYPES.UPDATE_TODO_REQUEST, updateTodo);
};

const watchSetPriority = () => {
  fork(TYPES.SET_PRIORITY_REQUEST, setPriority);
};

export default () => {
  watchGetSingleTeam();
  watchAddUser();
  watchAddNewTodo();
  watchRemoveTodo();
  watchToggleTodo();
  watchUpdateTodo();
  watchSetPriority();
};
