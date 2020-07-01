import { BASE_URL } from '../util/constants.js';
import { request } from './apiHandler.js';

const options = {
  POST: (name) => {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    };
  },
  DELETE: () => {
    return { method: 'DELETE' };
  },
};

const apiTeam = {
  fetchTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`);
  },
  fetchTeamList: () => {
    return request(`${BASE_URL}/api/teams`);
  },
  fetchAddTeam: (name) => {
    return request(`${BASE_URL}/api/teams`, options.POST(name));
  },
  fetchDeleteTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`, options.DELETE());
  },
  fetchAddMember: (teamId, name) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members`,
      options.POST(name),
    );
  },
};

export default apiTeam;
