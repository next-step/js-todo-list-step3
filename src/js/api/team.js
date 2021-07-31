import { http } from './index.js';

export const teamAPI = {
  addTeam(name) {
    return http.post('/api/teams', { name });
  },

  fetchTeam(teamId) {
    return http.get(`/api/teams/${teamId}`);
  },

  fetchTeamList() {
    return http.get('/api/teams');
  },

  removeTeam(teamId) {
    return http.delete(`/api/teams/${teamId}`);
  },
};
