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

  async addMember(teamId, payload) {
    return await errorHandler(
      hermes.post,
      TEAM_QUERY + teamId + '/members/',
      payload
    );
  },

  async deleteMember(teamId, payload) {
    return await errorHandler(
      hermes.delete,
      TEAM_QUERY + teamId + '/members/',
      payload
    );
  },

  async fetchMemberTodoList(teamId, memberId) {
    return await errorHandler(
      hermes.get,
      TEAM_QUERY + teamId + '/members/' + memberId
    );
  },

  async addMemberTodoItem(teamId, memberId, payload) {
    return await errorHandler(
      hermes.post,
      TEAM_QUERY + teamId + '/members/' + memberId + '/items',
      payload
    );
  },

  async deleteMemberTodoItem(teamId, memberId, itemId) {
    return await errorHandler(
      hermes.delete,
      TEAM_QUERY + teamId + '/members/' + memberId + '/items/' + itemId
    );
  },

  async toggleMemberTodoItem(teamId, memberId, itemId) {
    return await errorHandler(
      hermes.put,
      TEAM_QUERY +
        teamId +
        '/members/' +
        memberId +
        '/items/' +
        itemId +
        '/toggle'
    );
  },

  async updateMemberTodoItem(teamId, memberId, itemId, payload) {
    return await errorHandler(
      hermes.put,
      TEAM_QUERY + teamId + '/members/' + memberId + '/items/' + itemId,
      payload
    );
  },

  async setPriorityTodoItem(teamId, memberId, itemId, payload) {
    return await errorHandler(
      hermes.put,
      TEAM_QUERY +
        teamId +
        '/members/' +
        memberId +
        '/items/' +
        itemId +
        '/priority',
      payload
    );
  },
  async deleteAllTodoItems(teamId, memberId) {
    return await errorHandler(
      hermes.delete,
      TEAM_QUERY + teamId + '/members/' + memberId,
      +'/items'
    );
  },
};

function getTeamQuery(teamId, memberId) {
  return `${TEAM_QUERY}${teamId}`;
}

export default TeamService;
