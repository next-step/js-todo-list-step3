'use strict';

import { api } from '../api/api.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { todoAppView } from '../view/todoAppView.js';

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

  async updateMeberStore() {
    const teamId = teamStore.getCurrentTeam()._id;
    const team = await api.getTeam(teamId);
    memberStore.setMembers(team.members);
  }

  async deleteItem(target) {
    console.log('TodoListService - deleteItem');
    if (!confirm('정말 삭제 하시겠습니까?')) return;
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    await api.deleteTodoItem(teamId, memberId, itemId);
    await this.updateMeberStore();
    todoAppView.renderKanban(memberStore.getMembers());
  }

  async toggleItem(target) {
    console.log('TodoListService - toggleItem');
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    await api.toggleTodoItem(teamId, memberId, itemId);
    await this.updateMeberStore();
    todoAppView.renderKanban(memberStore.getMembers());
  }

  async editItem(target) {
    console.log('TodoListService - updateItem');
    console.log(target);
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    const itemId = this.getItemId(target);
    const text = target.value;
    await api.editTodoItem(teamId, memberId, itemId, text);
    await this.updateMeberStore();
    todoAppView.renderKanban(memberStore.getMembers());
  }

  activateEditMode(target) {
    console.log('TodoListService - activateEditMode');
    console.log(target);
    todoAppView.activateEditMode(target);
  }

  deactivateEditMode(target) {
    console.log('TodoListService - exitEditMode');
    todoAppView.deactivateEditMode(target);
  }

  changePriority(target) {
    console.log('TodoListService - changePriority');
  }
}
