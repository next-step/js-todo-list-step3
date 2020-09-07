import { todoAdapterClient } from "../adapter/todoAdapter.js";

export default Object.freeze({

  fetchTeams () {
    return todoAdapterClient.get('teams');
  },

  fetchTeam (teamId) {
    return todoAdapterClient.get(`teams/${teamId}`);
  },

  addTeam (name) {
    return todoAdapterClient.post(`teams`, { name });
  },

  addTeamMember ({ teamId, name }) {
    return todoAdapterClient.post(`teams/${teamId}/members`, { name });
  },

  deleteTeam (teamId) {
    return todoAdapterClient.delete(`teams/${teamId}`);
  },

})