import axios from "axios";
import { API } from "@constants/url";
import { MESSAGES } from "@constants/constant";

const METHOD = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

const request = async (url, method = METHOD.GET, params = {}) => {
  try {
    return await axios[method](url, params);
  } catch (e) {
    globalHttpErrorHandler(e);
  }
};

const globalHttpErrorHandler = ({ response }) => {
  const { message } = response.data;
  const _message = message ? message : MESSAGES.HTTP_ERROR;
  alert(_message);
};

const getTeams = () => request(API.GET_TEAMS);
const addTeam = (name) => request(API.ADD_TEAM, METHOD.POST, { name });
const getMembers = (teamId) => request(API.GET_TEAM(teamId));
const addMember = ({ teamId, name }) => request(API.ADD_MEMBER(teamId), METHOD.POST, { name });
const getTodoItems = ({ teamId, memberId }) => request(API.GET_TODO_ITEMS(teamId, memberId));
const addTodoItem = ({ teamId, memberId, contents }) => request(API.ADD_TODO_ITEM(teamId, memberId), METHOD.POST, { contents });
const toggleTodoItem = ({ teamId, memberId, itemId }) => request(API.TOGGLE_TODO_ITEM(teamId, memberId, itemId), METHOD.PUT);
const deleteTodoItem = ({ teamId, memberId, itemId }) => request(API.DELETE_TODO_ITEM(teamId, memberId, itemId), METHOD.DELETE);
const allDeleteTodoItem = ({ teamId, memberId }) => request(API.ALL_DELETE_TODO_ITEM(teamId, memberId), METHOD.DELETE);
const modifyTodoItem = ({ teamId, memberId, itemId, contents }) => request(API.MODIFY_TODO_ITEM(teamId, memberId, itemId), METHOD.PUT, { contents });
const priorityTodoItem = ({ teamId, memberId, itemId, priority }) =>
  request(API.PRIORITY_TODO_ITEM(teamId, memberId, itemId), METHOD.PUT, { priority });

export {
  getTeams,
  addTeam,
  getMembers,
  addMember,
  getTodoItems,
  addTodoItem,
  toggleTodoItem,
  deleteTodoItem,
  allDeleteTodoItem,
  modifyTodoItem,
  priorityTodoItem,
};
