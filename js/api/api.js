'use strict';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const option = {
  post: content => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: content => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  }),
};

const request = async (url, option = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(err);
  }
};

export const api = {
  getTeam: teamId => {
    return request(`/api/teams/${teamId}`);
  },

  getTeams: () => {
    return request('/api/teams');
  },

  addTeam: name => {
    return request('/api/teams', option.post({ name }));
  },

  deleteTeam: teamId => {
    return request(`/api/teams/${teamId}`, option.delete());
  },

  addMember: (teamId, name) => {
    return request(`/api/teams/${teamId}/members`, option.post({ name }));
  },

  getMember: (teamId, memberId) => {
    return request(`/api/teams/${teamId}/members/${memberId}`);
  },

  addTodoItem: (teamId, memberId, contents) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items`,
      option.post({ contents })
    );
  },

  deleteTodoItem: (teamId, memberId, itemId) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.delete()
    );
  },

  deleteTodoItems: (teamId, memberId) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items`,
      option.delete()
    );
  },

  toggleTodoItem: (teamId, memberId, itemId) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      option.put()
    );
  },

  editTodoItems: (teamId, memberId, itemId, contents) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.put({ contents })
    );
  },

  setPriorityTodoItem: (teamId, memberId, itemId, priority) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      option.put({ priority })
    );
  },
};
