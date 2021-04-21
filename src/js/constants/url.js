const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const API = {
  GET_TEAMS: `${BASE_URL}/api/teams`,
  ADD_TEAM: `${BASE_URL}/api/teams`,
  GET_TEAM: (teamId) => `${BASE_URL}/api/teams/${teamId}`,
  GET_USERS: `${BASE_URL}/api/users`,
  GET_USER: (userId) => `${BASE_URL}/api/users/${userId}`,
  CREATE_USER: `${BASE_URL}/api/users`,
  DELETE_USER: (userId) => `${BASE_URL}/api/users/${userId}`,
  ADD_TODO_ITEM: (teamId, todoId) => `${BASE_URL}/api/teams/${teamId}/members/${todoId}/items`,
  TOGGLE_TODO_ITEM: ({ userId, todoId }) => `${BASE_URL}/api/users/${userId}/items/${todoId}/toggle`,
  DELETE_TODO_ITEM: ({ userId, todoId }) => `${BASE_URL}/api/users/${userId}/items/${todoId}`,
  ALL_DELETE_TODO_ITEM: ({ userId }) => `${BASE_URL}/api/users/${userId}/items/`,
  MODIFY_TODO_ITEM: ({ userId, todoId }) => `${BASE_URL}/api/users/${userId}/items/${todoId}`,
  PRIORITY_TODO_ITEM: ({ userId, todoId }) => `${BASE_URL}/api/users/${userId}/items/${todoId}/priority`,
};
