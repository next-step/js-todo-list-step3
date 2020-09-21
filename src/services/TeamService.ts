import { todoAdapterClient } from "@/adapter/todoAdapter";

export default Object.freeze({

  fetchTeams () {
    return todoAdapterClient.get('teams');
  },

  fetchTeam (teamId: string) {
    return todoAdapterClient.get(`teams/${teamId}`);
  },

  addTeam (name: string) {
    return todoAdapterClient.post(`teams`, { name });
  },

  addTeamMember (teamId: string, name: string) {
    return todoAdapterClient.post(`teams/${teamId}/members`, { name });
  },

  deleteTeam (teamId: string) {
    return todoAdapterClient.delete(`teams/${teamId}`);
  },

  deleteTeamMember (teamId: string, memberId: string) {
    return todoAdapterClient.delete(`teams/${teamId}/members/${memberId}`);
  },

})
