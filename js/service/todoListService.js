'use strict';

import { api } from '../api/api.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { todoAppView } from '../view/todoAppView.js';
import { PRIORITY_TYPE } from '../constant/constants.js';

export default class TodoListService {
  constructor() {}

  getMemberId(target) {
    return target.closest('.todoapp-container').dataset.id;
  }

  getMember(target) {
    const memberId = this.getMemberId(target);
    return memberStore.findMember(memberId);
  }

  getItemId(target) {
    return target.closest('.todo-list-item').dataset.id;
  }

  activateEditMode(target) {
    todoAppView.activateEditMode(target);
  }

  deactivateEditMode(target) {
    todoAppView.deactivateEditMode(target);
  }

  async reLoadKanban() {
    await this.updateMeberStore();
    todoAppView.renderKanban(memberStore.getMembers());
  }

  async updateMeberStore() {
    const teamId = teamStore.getCurrentTeam()._id;
    const team = await api.getTeam(teamId);
    memberStore.setMembers(team.members);
  }

  async deleteItem(target) {
    if (!confirm('정말 삭제 하시겠습니까?')) return;
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    await api.deleteTodoItem(teamId, memberId, itemId);
    this.reLoadKanban();
  }

  async toggleItem(target) {
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    await api.toggleTodoItem(teamId, memberId, itemId);
    this.reLoadKanban();
  }

  async editItem(target) {
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    const text = target.value;
    await api.editTodoItem(teamId, memberId, itemId, text);
    this.reLoadKanban();
  }

  async changePriority(target) {
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    const priority = PRIORITY_TYPE[target.value];
    await api.setPriorityTodoItem(teamId, memberId, itemId, priority);
    this.reLoadKanban();
  }
}
