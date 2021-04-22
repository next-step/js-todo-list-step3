const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const API = {
  GET_TEAMS: `${BASE_URL}/api/teams`,
  ADD_TEAM: `${BASE_URL}/api/teams`,
  GET_TEAM: (teamId) => `${BASE_URL}/api/teams/${teamId}`,
  ADD_MEMBER: (teamId) => `${BASE_URL}/api/teams/${teamId}/members`,
  GET_TODO_ITEMS: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}`,
  ADD_TODO_ITEM: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
  TOGGLE_TODO_ITEM: (teamId, memberId, itemId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  DELETE_TODO_ITEM: (teamId, memberId, itemId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  ALL_DELETE_TODO_ITEM: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/`,
  MODIFY_TODO_ITEM: (teamId, memberId, itemId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  PRIORITY_TODO_ITEM: ({ userId, memberId }) => `${BASE_URL}/api/users/${userId}/items/${memberId}/priority`,
};
