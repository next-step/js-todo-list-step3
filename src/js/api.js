import { BASE_URL, API_TEAM } from './constants.js';

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
}

export default API;
