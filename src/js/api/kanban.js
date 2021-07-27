import { http } from './index.js';

export const KanbanAPI = {
  addMemberToTeam(teamId, name) {
    return http.post(`/api/teams/${teamId}/members`, { name });
  },

  fetchTodoList(teamId, memberId) {
    return http.get(`/api/teams/${teamId}/members/${memberId}`);
  },

  addTodoItem(teamId, memberId, contents) {
    return http.post(`/api/teams/${teamId}/members/${memberId}/items`, {
      contents,
    });
  },

  removeTodoItem(teamId, memberId, itemId) {
    return http.delete(`/api/teams/${teamId}/members/${memberId}/items/${itemId}`);
  },

  toggleTodoItem(teamId, memberId, itemId) {
    return http.put(`/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);
  },

  modifyTodoItemContents(teamId, memberId, itemId, contents) {
    return http.put(`/api/teams/${teamId}/members/${memberId}/items/${itemId}`, {
      contents,
    });
  },

  modifyTodoItemPriority(teamId, memberId, itemId, priority) {
    return http.put(`/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, {
      priority,
    });
  },

  removeTodoItems(teamId, memberId) {
    return http.delete(`/api/teams/${teamId}/members/${memberId}/items`);
  },
};
