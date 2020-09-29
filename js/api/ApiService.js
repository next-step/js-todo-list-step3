import { API_BASE_URL } from '../constants/index.js';
import ApiClient from './ApiClient.js';

class ApiService {
  #api;

  constructor() {
    this.#api = new ApiClient(API_BASE_URL);
  }

  async addTeam(name) {
    return await this.#api.post('/teams', { name });
  }

  async getTeam(teamId) {
    return await this.#api.get(`/teams/${teamId}`);
  }

  async getTeams() {
    return await this.#api.get('/teams');
  }

  deleteTeam() {}

  addTeamMember() {}

  getTodos() {}

  async getMemberTodo(teamdId, memberId) {
    return await this.#api.get(`/teams/${teamdId}/members/${memberId}`);
  }

  async addTodo(teamId, memberId, contents) {
    return await this.#api.post(`/teams/${teamId}/members/${memberId}/items`, {
      contents,
    });
  }

  async deleteTodo(teamId, memberId, itemId) {
    return await this.#api.delete(
      `/teams/${teamId}/members/${memberId}/items/${itemId}`
    );
  }

  deleteTodoAll() {}

  async toggleTodo(teamId, memberId, itemId) {
    return await this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`
    );
  }

  async editTodo(teamId, memberId, itemId, contents) {
    return await this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}`,
      { contents }
    );
  }

  async changeTodoPriority(teamId, memberId, itemId, priority) {
    return await this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      { priority }
    );
  }
}

const api = new ApiService();
export default api;
