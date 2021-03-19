'use strict';

import { option, request } from './api.js';

const memberApi = {
  getUser: userId => {
    return request(`api/user/${userId}`);
  },

  getUsers: () => {
    return request(`api/users`);
  },

  addUser: userName => {
    const content = {
      name: userName,
    };
    return request(`api/users`, option.post(content));
  },

  deleteUser: userId => {
    return request(`api/users/${userId}`, option.delete());
  },
};

export default memberApi;
