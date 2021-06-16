import api from './api/api.js';
import { showError } from './util/showError.js';

class Store {
  async getTeamList() {
    const response = await api.getTeamList();
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async getTeamMember(teamId) {
    const response = await api.getTeamMember(teamId);
    if (response.isError) return showError(response.data);

    return response.data.members;
  }

  async addTeamTodoItem(teamId, memberId, contents) {
    const response = await api.addTeamTodoItem(teamId, memberId, contents);
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async changeTeamTodoItemPriority(teamId, memberId, itemId, priority) {
    const response = await api.changeTeamTodoItemPriority(
      teamId,
      memberId,
      itemId,
      priority
    );
    if (response.isError) return showError(response.data);

    return response.data;
  }
}

const store = new Store();

export default store;
