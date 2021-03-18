'use strict';

import { option, request } from './api.js';

const todoApi = {
  getUserTodoItems: userId => {
    return request(`/api/users/${userId}/items`);
  },

  addTodoItem: (userId, text) => {
    const content = {
      contents: text,
    };
    return request(`/api/users/${userId}/items`, option.post(content));
  },

  toggleTodoItem: (userId, itemId) => {
    return request(`/api/users/${userId}/items/${itemId}/toggle`, option.put());
  },

  deleteTodoItem: (userId, itemId) => {
    return request(`/api/users/${userId}/items/${itemId}`, option.delete());
  },

  updateTodoitem: (userId, itemId, text) => {
    const content = {
      constents: text,
    };
    return request(`/api/users/${userId}/items/${itemId}`, option.put(content));
  },

  changePriority: (userId, itemId, priority) => {
    const content = {
      priority: priority,
    };
    return request(
      `/api/users/${userId}/items/${itemId}/priorty`,
      option.put(content)
    );
  },
};

export default todoApi;
