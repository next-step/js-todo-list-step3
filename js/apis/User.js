import { METHOD, fetchApi } from "./common.js";

const User = {
  URI: "/users",
  async getUsers() {
    return fetchApi({ uri: this.URI });
  },
  async addUser(name) {
    return fetchApi({ uri: this.URI, method: METHOD.POST, body: { name } });
  },
  async getUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}` });
  },
  async deleteUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}`, method: METHOD.DELETE });
  },
};

export default User;
