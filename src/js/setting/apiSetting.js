export const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
export const uri = {
  GET_USERS: () => "/api/users",
  ADD_USER: () => "/api/users",
  GET_USER: (userId) => `/api/users/${userId}`,
  DELETE_USER: (userId) => `/api/users/${userId}`,
  GET_USER_TODOITEMS: (userId) => `/api/users/${userId}/items/`,
  ADD_USER_TODOITEM: (userId) => `/api/users/${userId}/items/`,
  DELETE_USER_TODOITEMS: (userId) => `/api/users/${userId}/items/`,
  DELETE_USER_TODOITEM: ({ userId, itemId }) =>
    `/api/users/${userId}/items/${itemId}`,
  UPDATE_USER_TODOITEM: ({ userId, itemId }) =>
    `/api/users/${userId}/items/${itemId}`,
  UPDATE_USER_TODOITEM_PRIORTY: ({ userId, itemId }) =>
    `/api/users/${userId}/items/${itemId}/priority`,
  UPDATE_USER_TODOITEM_COMPLETE: ({ userId, itemId }) =>
    `/api/users/${userId}/items/${itemId}/toggle`,
  ADD_TEAM: () => `/api/teams`,
  GET_TEAMS: () => `/api/teams`,
  GET_TEAM: (teamId) => `/api/teams/${teamId}`,
  GET_MEMBER_TODOITEMS: ({ teamId, memberId }) =>
    `/api/teams/${teamId}/members/${memberId}`,
  ADD_MEMBER: (teamId) => `/api/teams/${teamId}/members`,
  ADD_MEMBER_TODOITEM: ({ teamId, memberId }) =>
    `/api/teams/${teamId}/members/${memberId}/items`,
  DELETE_MEMBER_TODOITEM: ({ teamId, memberId, itemId }) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  DELETE_MEMBER_TODOITEMS: ({ teamId, memberId }) =>
    `/api/teams/${teamId}/members/${memberId}/items/`,
  UPDATE_MEMBER_TODOITEM_TOGGLE: ({ teamId, memberId, itemId }) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
  UPDATE_MEMBER_TODOITEM: ({ teamId, memberId, itemId }) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  UPDATE_MEMBER_TODOITEM_PRIORITY: ({ teamId, memberId, itemId }) =>
    `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
};
