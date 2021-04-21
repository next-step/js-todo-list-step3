const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const API = {
  GET_TEAMS: `${BASE_URL}/api/teams`,
  ADD_TEAM: `${BASE_URL}/api/teams`,
  GET_TEAM: (teamId) => `${BASE_URL}/api/teams/${teamId}`,
  ADD_TODO_ITEM: (teamId, memberId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
  TOGGLE_TODO_ITEM: ({ userId, memberId }) => `${BASE_URL}/api/users/${userId}/items/${memberId}/toggle`,
  DELETE_TODO_ITEM: ({ userId, memberId }) => `${BASE_URL}/api/users/${userId}/items/${memberId}`,
  ALL_DELETE_TODO_ITEM: ({ userId }) => `${BASE_URL}/api/users/${userId}/items/`,
  MODIFY_TODO_ITEM: ({ userId, memberId }) => `${BASE_URL}/api/users/${userId}/items/${memberId}`,
  PRIORITY_TODO_ITEM: ({ userId, memberId }) => `${BASE_URL}/api/users/${userId}/items/${memberId}/priority`,
};
