import { request } from '../api/index.js';
import { BASE_URL } from '../constants.js';

const option = {
  post: (prop, value) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [prop]: value,
    }),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (prop, value) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [prop]: value,
    }),
  }),

  toggle: () => ({
    method: 'PUT',
  }),
};

const api = {
  fetchTodoList: (teamId, userId) =>
    request(`${BASE_URL}/${teamId}/members/${userId}`),

  addUser: (teamId, name) =>
    request(`${BASE_URL}/${teamId}/members`, option.post('name', name)),

  addTodo: (teamId, userId, contents) =>
    request(
      `${BASE_URL}/${teamId}/members/${userId}/items`,
      option.post('contents', contents),
    ),

  toggleTodo: (teamId, userId, todoId) =>
    request(
      `${BASE_URL}/${teamId}/members/${userId}/items/${todoId}/toggle`,
      option.toggle(),
    ),

  editTodo: (teamId, userId, todoId, contents) =>
    request(
      `${BASE_URL}/${teamId}/members/${userId}/items/${todoId}`,
      option.put('contents', contents),
    ),

  editPriority: (teamId, userId, todoId, priority) =>
    request(
      `${BASE_URL}/${teamId}/members/${userId}/items/${todoId}/priority`,
      option.put('priority', priority),
    ),

  deleteTodo: (teamId, userId, todoId) =>
    request(
      `${BASE_URL}/${teamId}/members/${userId}/items/${todoId}`,
      option.delete(),
    ),

  deleteAllTodo: (teamId, userId) =>
    request(`${BASE_URL}/${teamId}/members/${userId}/items`, option.delete()),
};

export default api;
