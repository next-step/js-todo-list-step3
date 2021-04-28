export const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
export const uri = {
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
