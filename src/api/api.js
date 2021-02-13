import { BASE_URL } from '../constant/api.js';

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
  getUser: (userId) => {
    return request(`api/users/${userId}`);
  },

  getUsers: () => {
    return request('api/users');
  },

  addUser: (userName) => {
    return request('api/users', option.post({ name: userName }));
  },

  deleteUser: (userId) => {
    return request(`api/users/${userId}`, option.delete());
  },

  getUserTodos: (userId) => {
    return request(`api/users/${userId}/items`);
  },

  addTodo: (title, userId) => {
    return request(
      `api/users/${userId}/items`,
      option.post({ contents: title }),
    );
  },

  toggleTodo: (userId, itemId) => {
    return request(`api/users/${userId}/items/${itemId}/toggle`, option.put());
  },

  deleteTodo: (userId, itemId) => {
    return request(`api/users/${userId}/items/${itemId}`, option.delete());
  },

  deleAllTodo: (userId) => {
    return request(`/api/users/${userId}/items/`, option.delete());
  },

  editTodo: (newTitle, userId, itemId) => {
    return request(
      `/api/users/${userId}/items/${itemId}`,
      option.put({ contents: newTitle }),
    );
  },

  changePriority: (priority, userId, itemId) => {
    return request(
      `/api/users/${userId}/items/${itemId}/priority`,
      option.put({ priority }),
    );
  },

  getTeams: () => {
    return request('/api/teams');
  },

  addTeam: (teamName) => {
    return request('/api/teams', option.post({ name: teamName }));
  },
};
