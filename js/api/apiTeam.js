import { BASE_URL } from '../utils/constants.js';
import { request, options } from './apiHandler.js';

const apiTeam = {
  fetchTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`);
  },
  fetchTeamList: () => {
    return request(`${BASE_URL}/api/teams`);
  },
  fetchAddTeam: (name) => {
    return request(`${BASE_URL}/api/teams`, options.POST('name', name));
  },
  fetchDeleteTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`, options.DELETE());
  },
  fetchAddMember: (teamId, name) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members`,
      options.POST('name', name),
    );
  },
};

export default apiTeam;
