import { METHOD, fetchApi } from "./common.js";

const Team = {
  URI: "/teams",
  priorities: ["NONE", "FIRST", "SECOND"],
  async getTeams() {
    return fetchApi({ uri: this.URI });
  },
  async getTeam(id) {
    return fetchApi({ uri: `${this.URI}/${id}` });
  },
  async addTeam(name) {
    return fetchApi({ uri: this.URI, method: METHOD.POST, body: { name } });
  },
  async deleteTeam(id) {
    return fetchApi({ uri: `${this.URI}/${id}`, method: METHOD.DELETE });
  },
  async addMember(id, name) {
    return fetchApi({
      uri: `${this.URI}/${id}/members`,
      method: METHOD.POST,
      body: { name },
    });
  },
  async getTodos(teamId, userId) {
    return fetchApi({ uri: `${this.URI}/${teamId}/members/${userId}` });
  },
  async addTodo(teamId, userId, contents) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items`,
      method: METHOD.POST,
      body: { contents },
    });
  },
  async deleteTodo(teamId, userId, itemId) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items/${itemId}`,
      method: METHOD.DELETE,
    });
  },
  async toggleIsComplete(teamId, userId, itemId) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items/${itemId}/toggle`,
      method: METHOD.PUT,
    });
  },
  async updateContents(teamId, userId, { _id: itemId, contents }) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items/${itemId}`,
      method: METHOD.PUT,
      body: { contents },
    });
  },
  async updatePriority(teamId, userId, { _id: itemId, priority }) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items/${itemId}/priority`,
      method: METHOD.PUT,
      body: { priority },
    });
  },
  async deleteAllTodos(teamId, userId) {
    return fetchApi({
      uri: `${this.URI}/${teamId}/members/${userId}/items`,
      method: METHOD.DELETE,
    });
  },
};

export default Team;
