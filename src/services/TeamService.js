import {RestClient} from "../core/Request";

const restClient = new RestClient('https://blackcoffee-todolist.df.r.appspot.com/api');

export default Object.freeze({

  fetchTeams () {
    return restClient.get('/teams');
  },

  fetchTeam (teamId) {
    return restClient.get(`/teams/${teamId}`);
  },

  addTeam (name) {
    return restClient.post(`/teams`, { name });
  },

  deleteTeam (teamId) {
    return restClient.delete(`/teams/${teamId}`);
  },

})