const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const API_URL = {
  TEAMS: `${baseUrl}/api/teams`,
  TEAM: (teamId) => `${baseUrl}/api/teams/${teamId}`,
  MEMBERS: (teamId) => `${baseUrl}/api/teams/${teamId}/members`,
  ITEM: (teamId, memberId) => `${baseUrl}/api/teams/${teamId}/members/${memberId}/items`,
  MEMBER_ITEM: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  ITEM_TOGGLE: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  ITEM_PRIORITY: (teamId, memberId, itemId) =>
    `${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export { API_URL, METHOD };
