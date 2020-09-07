import { todoAdapterClient } from "../adapter/todoAdapter.js";

export default Object.freeze({

  fetchTodoList ({ teamId, memberId }) {
    return todoAdapterClient.get(`teams/${teamId}/members/${memberId}`);
  },

  addItem ({ teamId, memberId, contents }) {
    return todoAdapterClient.post(`teams/${teamId}/members/${memberId}/items`, { contents });
  },

  toggleItem ({ teamId, memberId, itemId }) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);
  },

  updateItem ({ teamId, memberId, itemId, contents }) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}`, { contents });
  },

  updateItemPriority ({ teamId, memberId, itemId, priority }) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}/priority`, { priority });
  },

  deleteItem ({ teamId, memberId, itemId }) {
    return todoAdapterClient.delete(`teams/${teamId}/members/${memberId}/items/${itemId}`);
  },

  deleteAllItem ({ teamId, memberId }) {
    return todoAdapterClient.delete(`teams/${teamId}/members/${memberId}/items`);
  },

})