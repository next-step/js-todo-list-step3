import { MESSAGE } from '../util/constants.js';

export default class MemberInput {
  constructor({ teamId, $targetTodoAppListContainer, onAddMember }) {
    this.teamId = teamId;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.$targetTodoAppListContainer.addEventListener('click', ({ target }) => {
      const $targetAddButton = target.closest('#add-user-button');
      if (!$targetAddButton) return;
      const { id } = $targetAddButton;
      if (id !== 'add-user-button') return;
      const addMember = prompt(MESSAGE.REGISTER_MEMBER);
      addMember && onAddMember(addMember);
    });
  }
}
