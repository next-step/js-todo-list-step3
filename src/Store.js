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

    response.data.members.map((member) => {
      if (member.todoList.length > 1) {
        member.todoList = member.todoList.sort(this._sortTodoList);
      }
      return member;
    });
    return response.data;
  }

  _sortTodoList(list1, list2) {
    const priorityType = {
      FIRST: 1,
      SECOND: 2,
      NONE: 3,
    };
    return priorityType[list1.priority] > priorityType[list2.priority];
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

  async toggleTeamTodoItem(teamId, memberId, itemId) {
    const response = await api.toggleTeamTodoItem(teamId, memberId, itemId);
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async deleteTeamTodoItem(teamId, memberId, itemId) {
    const response = await api.deleteTeamTodoItem(teamId, memberId, itemId);
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async editTeamTodoItemContents(teamId, memberId, itemId, contents) {
    const response = await api.editTeamTodoItemContents(
      teamId,
      memberId,
      itemId,
      contents
    );
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async deleteTeamTodoItemAll(teamId, memberId) {
    const response = await api.deleteTeamTodoItemAll(teamId, memberId);
    if (response.isError) return showError(response.data);

    return response.data;
  }
}

const store = new Store();

export default store;
