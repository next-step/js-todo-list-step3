import { baseUrl, uri } from "./apiSetting.js";

export function ADD_TEAM(name) {
  return POST({ apiUri: "ADD_TEAM", data: { name } });
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

export function DELETE_MEMBER_TODOITEMS(teamId, memberId) {
  return POST({
    apiUri: "DELETE_MEMBER_TODOITEMS",
    parameter: { teamId, memberId },
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

export function UPDATE_MEMBER_TODOITEM_PRIORITY(
  teamId,
  memberId,
  itemId,
  priority
) {
  return POST({
    apiUri: "UPDATE_MEMBER_TODOITEM_PRIORITY",
    parameter: { teamId, memberId, itemId },
    data: { priority },
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
