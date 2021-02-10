import { METHOD, fetchApi } from "./common.js";

const Team = {
  URI: "/teams",
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
};

export default Team;
