import { METHOD, fetchApi } from "./common.js";

const Todo = {
  priorities: ["NONE", "FIRST", "SECOND"],
  setUri: (userId, itemId = "") => `/users/${userId}/items/${itemId}`,
  async getTodos(userId) {
    return fetchApi({ uri: this.setUri(userId) });
  },
  async addTodo(userId, contents) {
    return fetchApi({
      uri: this.setUri(userId),
      method: METHOD.POST,
      body: { contents },
    });
  },
  async deleteAllTodos(userId) {
    return fetchApi({ uri: this.setUri(userId), method: METHOD.DELETE });
  },
  async deleteTodo(userId, itemId) {
    return fetchApi({
      uri: this.setUri(userId, itemId),
      method: METHOD.DELETE,
    });
  },
  async updateContents(userId, { _id: itemId, contents }) {
    return fetchApi({
      uri: this.setUri(userId, itemId),
      method: METHOD.PUT,
      body: { contents },
    });
  },
  async updatePriority(userId, { _id: itemId, priority }) {
    return fetchApi({
      uri: `${this.setUri(userId, itemId)}/priority`,
      method: METHOD.PUT,
      body: { priority },
    });
  },
  async toggleIsComplete(userId, itemId) {
    return fetchApi({
      uri: `${this.setUri(userId, itemId)}/toggle`,
      method: METHOD.PUT,
    });
  },
};

export default Todo;
