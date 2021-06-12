import { DOM_ID, MESSAGGE } from '../../constants/constants';
import { $ } from '../../utils/utils';

import { memberAPI } from '../../api/member';

import teamState from '../../store/teamState';

export default class UserCreate {
  constructor() {
    this.$target = $(DOM_ID.ADD_TODOLIST);
    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.createTodoList);
  }

  async createTodoList() {
    const userName = prompt(MESSAGGE.CREATE_USER);
    if (!userName) return;

    const result = await memberAPI.createMember(teamState.get()._id, { name: userName });
  }
}
