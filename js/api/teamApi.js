'use strict';

import { option, request } from './api.js';

const teamApi = {
  getTeams: () => {
    return request(`/api/teams`);
  },

  addTeam: teamName => {
    const content = {
      name: teamName,
    };
    return request(`/api/teams`, option.post(content));
  },

  deleteTeam: teamId => {
    return request(`/api/teams/${teamId}`, option.delete());
  },
};

export default teamApi;
