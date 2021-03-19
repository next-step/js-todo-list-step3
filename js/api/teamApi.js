'use strict';

import { option, request } from './api.js';

const teamApi = {
  addTeam: teamName => {
    const content = {
      name: teamName,
    };
    return request(`/api/teams`, option.post(content));
  },

  getTeam: teamId => {
    return request(`/api/teams/${teamId}`);
  },

  getTeams: () => {
    return request(`/api/teams`);
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
};

export default teamApi;
