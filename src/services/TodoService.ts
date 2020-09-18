import { todoAdapterClient } from "@/adapter/todoAdapter";

export interface TodoServiceVO {
  itemId?: string;
  memberId?: string;
  teamId?: string;
  contents?: string;
  priority?: number;
};

export default Object.freeze({

  fetchTodoList ({ teamId, memberId }: TodoServiceVO) {
    return todoAdapterClient.get(`teams/${teamId}/members/${memberId}`);
  },

  addItem ({ teamId, memberId, contents }: TodoServiceVO) {
    return todoAdapterClient.post(`teams/${teamId}/members/${memberId}/items`, { contents });
  },

  toggleItem ({ teamId, memberId, itemId }: TodoServiceVO) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);
  },

  updateItem ({ teamId, memberId, itemId, contents }: TodoServiceVO) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}`, { contents });
  },

  updateItemPriority ({ teamId, memberId, itemId, priority }: TodoServiceVO) {
    return todoAdapterClient.put(`teams/${teamId}/members/${memberId}/items/${itemId}/priority`, { priority });
  },

  deleteItem ({ teamId, memberId, itemId }: TodoServiceVO) {
    return todoAdapterClient.delete(`teams/${teamId}/members/${memberId}/items/${itemId}`);
  },

  deleteAllItem ({ teamId, memberId }: TodoServiceVO) {
    return todoAdapterClient.delete(`teams/${teamId}/members/${memberId}/items`);
  },

})