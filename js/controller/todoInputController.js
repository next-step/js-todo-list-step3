'use strict';

import todoApi from '../api/todoApi.js';
import { todoAppView } from '../view/todoAppView.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { keyValidator, elementValidator } from '../utils/validator.js';
import teamApi from '../api/teamApi.js';

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
    await todoApi.addTodoItem(TemaId, memberId, contents);
    todoAppView.clearInput(memberId);
    this.loadKaban();
  }

  async loadKaban() {
    const currentTeamId = teamStore.getCurrentTeam()._id;
    const currentTeam = await teamApi.getTeam(currentTeamId);
    todoAppView.renderKanban(currentTeam.members);
  }
}
