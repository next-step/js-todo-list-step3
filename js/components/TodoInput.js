import { isEnterKey } from '../utils/validator.js';
import api from '../utils/api.js';

export default class TodoInput {
  constructor({ $element, memberInfo, onEnter }) {
    $element.addEventListener('keypress', async e => {
      const value = e.target.value.trim();
      if (isEnterKey(e) && value) {
        await api.addMemberTodoItem(memberInfo.teamId, memberInfo.memberId, value);
        onEnter();
        $element.value = '';
      }
    });
  }
}
