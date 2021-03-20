'use strict';

import { api } from '../api/api.js';
import { todoAppView } from '../view/todoAppView.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { keyValidator, elementValidator } from '../utils/validator.js';

export default class TodoInputController {
  constructor() {
    todoAppView.$todoappListContainer.addEventListener(
      'keyup',
      this.onKeyUpTodoInput
    );
  }

  onKeyUpTodoInput = event => {
    if (
      keyValidator.isNotEnter(event.key) ||
      elementValidator.isEmpty(event.target)
    ) {
      return;
    }
    this.addNewItem(event.target);
  };

  getCurrentMember(target) {
    const currentMemberId = target.closest('.todoapp-container').dataset.id;
    return memberStore.findMember(currentMemberId);
  }

  async addNewItem(target) {
    const TemaId = teamStore.getCurrentTeam()._id;
    const memberId = this.getCurrentMember(target)._id;
    const contents = target.value.trim();
    await api.addTodoItem(TemaId, memberId, contents);
    todoAppView.clearInput(memberId);
    this.loadKaban();
  }

  async loadKaban() {
    const currentTeamId = teamStore.getCurrentTeam()._id;
    const currentTeam = await api.getTeam(currentTeamId);
    todoAppView.renderKanban(currentTeam.members);
  }
}
