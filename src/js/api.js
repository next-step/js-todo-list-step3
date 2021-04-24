/* eslint-disable class-methods-use-this */
import { BASE_URL, API_TEAM, API_MEMBERS } from './constants.js';

class API {
  constructor() {
    this.teamURL = `${BASE_URL}${API_TEAM}`;
  }

  createRequestBody(method, options = {}) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };
  }

  async get(URL) {
    const response = await fetch(URL);
    return response;
  }

  async post(URL, BODY) {
    const response = await fetch(URL, BODY);
    return response;
  }

  async addTeam(teamName) {
    const response = await this.post(
      this.teamURL,
      this.createRequestBody('POST', {
        body: JSON.stringify({ name: teamName }),
      })
    );
    return response;
  }

  async addTeamMember(teamId, memberName) {
    const response = await this.post(
      `${this.teamURL}/${teamId}${API_MEMBERS}`,
      this.createRequestBody('POST', {
        body: JSON.stringify({ name: memberName }),
      })
    );
    return response;
  }

  async getTeamMemberList(teamId) {
    const response = await this.get(`${this.teamURL}/${teamId}`);
    return response;
  }

  async addTeamMemberTodoItem(teamId, memberId, contents) {
    const response = await this.post(
      `${this.teamURL}/${teamId}${API_MEMBERS}/${memberId}/items`,
      this.createRequestBody('POST', {
        body: JSON.stringify({ contents }),
      })
    );
    return response;
  }
}

export default API;
