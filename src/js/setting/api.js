import { baseUrl, uri } from "./apiSetting.js";

export function GET_USERS() {
  return GET({ apiUri: "GET_USERS" });
}

export function ADD_USER(name) {
  return POST({ apiUri: "ADD_USER", data: { name } });
}

export function DELETE_USER(id) {
  return POST({ apiUri: "DELETE_USER", parameter: id, method: "DELETE" });
}

export function GET_USER_TODOITEMS(id) {
  return GET({ apiUri: "GET_USER_TODOITEMS", parameter: id });
}

export function ADD_USER_TODOITEM(id, contents) {
  return POST({
    apiUri: "ADD_USER_TODOITEM",
    parameter: id,
    data: { contents },
  });
}

export function DELETE_USER_TODOITEMS(userId) {
  return POST({
    apiUri: "DELETE_USER_TODOITEMS",
    parameter: userId,
    method: "DELETE",
  });
}

export function DELETE_USER_TODOITEM(userId, itemId) {
  return POST({
    apiUri: "DELETE_USER_TODOITEM",
    parameter: { userId, itemId },
    method: "DELETE",
  });
}

export function UPDATE_USER_TODOITEM(userId, itemId, contents) {
  return POST({
    apiUri: "UPDATE_USER_TODOITEM",
    parameter: { userId, itemId },
    data: { contents },
    method: "PUT",
  });
}

export function UPDATE_USER_TODOITEM_PRIORTY(userId, itemId, priority) {
  return POST({
    apiUri: "UPDATE_USER_TODOITEM_PRIORTY",
    parameter: { userId, itemId },
    data: { priority },
    method: "PUT",
  });
}

export function UPDATE_USER_TODOITEM_COMPLETE(userId, itemId) {
  return POST({
    apiUri: "UPDATE_USER_TODOITEM_COMPLETE",
    parameter: { userId, itemId },
    method: "PUT",
  });
}

export function ADD_TEAM(name) {
  return POST({
    apiUri: "ADD_TEAM",
    data: { name },
  });
}

export function GET_TEAMS() {
  return GET({ apiUri: "GET_TEAMS" });
}

export function GET_TEAM(teamId) {
  return GET({ apiUri: "GET_TEAM", parameter: teamId });
}

export function GET_MEMBER_TODOITEMS(teamId, memberId) {
  return GET({
    apiUri: "GET_MEMBER_TODOITEMS",
    parameter: { teamId, memberId },
  });
}

export function ADD_MEMBER(teamId, name) {
  return POST({ apiUri: "ADD_MEMBER", parameter: teamId, data: { name } });
}

export function ADD_MEMBER_TODOITEM(teamId, memberId, contents) {
  return POST({
    apiUri: "ADD_MEMBER_TODOITEM",
    parameter: { teamId, memberId },
    data: { contents },
  });
}

export function DELETE_MEMBER_TODOITEM(teamId, memberId, itemId) {
  return POST({
    apiUri: "DELETE_MEMBER_TODOITEM",
    parameter: { teamId, memberId, itemId },
    method: "DELETE",
  });
}

export function UPDATE_MEMBER_TODOITEM_TOGGLE(teamId, memberId, itemId) {
  return POST({
    apiUri: "UPDATE_MEMBER_TODOITEM_TOGGLE",
    parameter: { teamId, memberId, itemId },
    method: "PUT",
  });
}

export function UPDATE_MEMBER_TODOITEM(teamId, memberId, itemId, contents) {
  return POST({
    apiUri: "UPDATE_MEMBER_TODOITEM",
    parameter: { teamId, memberId, itemId },
    data: { contents },
    method: "PUT",
  });
}

function GET({ apiUri, parameter = "" }) {
  return fetch(baseUrl + uri[apiUri](parameter))
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}

function POST({ apiUri, parameter = "", data = {}, method = "POST" }) {
  postOption["method"] = method;
  postOption["body"] = JSON.stringify(data);
  return fetch(baseUrl + uri[apiUri](parameter), postOption)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}

const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
