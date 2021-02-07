import { METHOD, fetchApi } from "./common.js";

const Team = {
  URI: "/teams",
  async getTeams() {
    return fetchApi({ uri: this.URI });
  },
};

export default Team;
