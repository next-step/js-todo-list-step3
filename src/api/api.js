import { BASE_URL } from '../utils/constant.js';

const option = {
  post: (contents) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (contents) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
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
    alert(`💣 Error : ${err} 💣`);
  }
};

export const api = {
  getTeam: (teamId) => {
    return request(`/api/teams/${teamId}`);
  },

  getTeams: () => {
    return request('/api/teams');
  },

  addTeam: (name) => {
    return request('/api/teams', option.post({ name }));
  },

  deleteTeam: (teamId) => {
    return request(`/api/teams/${teamId}`, option.delete());
  },

  addMember: (teamId, name) => {
    return request(`/api/teams/${teamId}/members`, option.post({ name }));
  },

  getMemberTodo: (teamId, memberId) => {
    return request(`/api/teams/${teamId}/members/${memberId}`);
  },

  addMemberTodo: (teamId, memberId, contents) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items`,
      option.post({ contents }),
    );
  },

  deleteMemberTodo: (teamId, memberId, itemId) => {
    return (
      request(`/api/teams/${teamId}/members/${memberId}/items/${itemId}`),
      option.delete()
    );
  },

  deleteMemberTodos: (teamId, memberId) => {
    return (
      request(`/api/teams/${teamId}/members/${memberId}/items`), option.delete()
    );
  },

  toggleMemberTodo: (teamId, memberId, itemId) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      option.put(),
    );
  },

  editMemberTodo: (teamId, memberId, itemId, contents) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.put({ contents }),
    );
  },

  setPriorityMemberTodo: (teamId, memberId, itemId, priority) => {
    return request(
      `/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      option.put({ priority }),
    );
  },
};
