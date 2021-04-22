import axios from "axios";
import { API } from "@constants/url";

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
    alert(e);
  }
};

const getTeams = () => request(API.GET_TEAMS);
const addTeam = (name) => request(API.ADD_TEAM, METHOD.POST, { name });
const getMembers = (teamId) => request(API.GET_TEAM(teamId));
const addMember = ({ teamId, name }) => request(API.ADD_MEMBER(teamId), METHOD.POST, { name });
const addTodoItem = ({ teamId, memberId, contents }) => request(API.ADD_TODO_ITEM(teamId, memberId), METHOD.POST, { contents });
const toggleTodoItem = ({ userId, memberId }) => request(API.TOGGLE_TODO_ITEM({ userId, memberId }), METHOD.PUT);
const deleteTodoItem = ({ teamId, memberId, itemId }) => request(API.DELETE_TODO_ITEM({ teamId, memberId, itemId }), METHOD.DELETE);
const allDeleteTodoItem = ({ userId }) => request(API.ALL_DELETE_TODO_ITEM({ userId }), METHOD.DELETE);
const modifyTodoItem = ({ userId, memberId, contents }) => request(API.MODIFY_TODO_ITEM({ userId, memberId }), METHOD.PUT, { contents });
const priorityTodoItem = ({ userId, memberId, priority }) => request(API.PRIORITY_TODO_ITEM({ userId, memberId }), METHOD.PUT, { priority });

export {
  getTeams,
  addTeam,
  getMembers,
  addMember,
  addTodoItem,
  toggleTodoItem,
  deleteTodoItem,
  allDeleteTodoItem,
  modifyTodoItem,
  priorityTodoItem,
};
