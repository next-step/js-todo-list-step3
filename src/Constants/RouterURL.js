const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const ADD_TEAM = `${BASE_URL}/api/teams`;
const GET_TEAM_MEMBER = (teamId) => `${BASE_URL}/api/teams/${teamId}`;
const GET_TEAM_LIST = `${BASE_URL}/api/teams`;
const DELETE_TEAM = (teamId) => `${BASE_URL}/api/teams/${teamId}`;
const ADD_TEAM_MEMBER = (teamId) => `${BASE_URL}/api/teams/${teamId}/members`;
const GET_TEAM_TODOLIST = (teamId, memberId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}`;
const ADD_TEAM_TODOITEM = (teamId, memberId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`;
const DELETE_TEAM_TODOITEM = (teamId, memberId, itemId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`;
const TOGGLE_TEAM_TODOITEM = (teamId, memberId, itemId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`;
const EDIT_TEAM_TODOITEM_CONTENTS = (teamId, memberId, itemId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`;
const CHANGE_TEAM_TODOITEM_PRIORITY = (teamId, memberId, itemId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`;
const DELETE_TEAM_TODOITEM_ALL = (teamId, memberId) =>
  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`;

const ROUTER = {
  ADD_TEAM,
  GET_TEAM_MEMBER,
  GET_TEAM_LIST,
  DELETE_TEAM,
  ADD_TEAM_MEMBER,
  GET_TEAM_TODOLIST,
  ADD_TEAM_TODOITEM,
  DELETE_TEAM_TODOITEM,
  TOGGLE_TEAM_TODOITEM,
  EDIT_TEAM_TODOITEM_CONTENTS,
  CHANGE_TEAM_TODOITEM_PRIORITY,
  DELETE_TEAM_TODOITEM_ALL,
};

export default ROUTER;
