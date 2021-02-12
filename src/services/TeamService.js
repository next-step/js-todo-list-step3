import errorHandler from './errorHandler';
import hermes from './index';

const TEAM_QUERY = '/teams/';
/**
 * @namespace TeamService at your service!
 */
const TeamService = {
  async fetchTeams() {
    return await errorHandler(hermes.get, TEAM_QUERY);
  },

  async fetchTeam(id) {
    return await errorHandler(hermes.get, TEAM_QUERY + id);
  },

  async add(payload) {
    return await errorHandler(hermes.post, TEAM_QUERY, payload);
  },

  async delete(id) {
    return await errorHandler(hermes.delete, TEAM_QUERY + id);
  },
};

export default TeamService;
