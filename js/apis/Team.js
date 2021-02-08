import { METHOD, fetchApi } from "./common.js";

const Team = {
  URI: "/teams",
  async getTeams() {
    return fetchApi({ uri: this.URI });
  },
  async addTeam(name) {
    return fetchApi({ uri: this.URI, method: METHOD.POST, body: { name } });
  },
};

export default Team;
