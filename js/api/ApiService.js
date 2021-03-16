import { API_BASE_URL } from '../constants/index.js';
import ApiClient from './ApiClient.js';

class ApiService {
  #api;

  constructor() {
    this.#api = new ApiClient(API_BASE_URL);
  }

  addTeam(name) {
    return this.#api.post('/teams', { name });
  }

  getTeam(teamId) {
    return this.#api.get(`/teams/${teamId}`);
  }

  getTeams() {
    return this.#api.get('/teams');
  }

  deleteTeam() {}

  addTeamMember(teamId, name) {
    return this.#api.post(`/teams/${teamId}/members`, { name });
  }

  getTodos() {}

  getMemberTodo(teamdId, memberId) {
    return this.#api.get(`/teams/${teamdId}/members/${memberId}`);
  }

  addTodo(teamId, memberId, contents) {
    return this.#api.post(`/teams/${teamId}/members/${memberId}/items`, {
      contents,
    });
  }

  deleteTodo(teamId, memberId, itemId) {
    return this.#api.delete(
      `/teams/${teamId}/members/${memberId}/items/${itemId}`
    );
  }

  deleteTodoAll(teamId, memberId) {
    return this.#api.delete(`/teams/${teamId}/members/${memberId}/items`);
  }

  toggleTodo(teamId, memberId, itemId) {
    return this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`
    );
  }

  editTodo(teamId, memberId, itemId, contents) {
    return this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}`,
      { contents }
    );
  }

  changeTodoPriority(teamId, memberId, itemId, priority) {
    return this.#api.put(
      `/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      { priority }
    );
  }
}

const api = new ApiService();
export default api;
