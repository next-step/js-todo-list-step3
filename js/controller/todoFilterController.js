'use strcit';

import { api } from '../api/api.js';
import { todoAppView } from '../view/todoAppView.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { elementValidator } from '../utils/validator.js';
import { MESSAGE } from '../constant/message.js';
import { FILTER_TYPE } from '../constant/constants.js';

export default class TodoFilterController {
  constructor() {
    todoAppView.$todoappListContainer.addEventListener(
      'click',
      this.onClickFilter
    );
  }

  onClickFilter = ({ target }) => {
    if (
      elementValidator.isNotFilterBtn(target) &&
      elementValidator.isNotClearBtn(target)
    )
      return;
    if (elementValidator.isFilterBtn(target)) {
      this.changeByFilter(target);
      return;
    }
    if (elementValidator.isClearBtn(target)) {
      this.clearAllItems(target);
      return;
    }
  };

  getMemberId(target) {
    return target.closest('.todoapp-container').dataset.id;
  }

  getMember(target) {
    const memberId = this.getMemberId(target);
    return memberStore.findMember(memberId);
  }

  async clearAllItems(target) {
    if (!confirm(MESSAGE.DELETE_ALL_ITEM_MESSAGE)) return;
    const teamId = teamStore.getCurrentTeam()._id;
    const memberId = this.getMemberId(target);
    await api.deleteTodoItems(teamId, memberId);
    const team = await api.getTeam(teamId);
    memberStore.setMembers(team.members);
    todoAppView.renderKanban(memberStore.getMembers());
  }

  getCurrentOption(target) {
    const classList = target.classList;
    if (classList.contains(FILTER_TYPE.ALL)) {
      return FILTER_TYPE.ALL;
    }
    if (classList.contains(FILTER_TYPE.ACTIVE)) {
      return FILTER_TYPE.ACTIVE;
    }
    if (classList.contains(FILTER_TYPE.PRIORITY)) {
      return FILTER_TYPE.PRIORITY;
    }
    if (classList.contains(FILTER_TYPE.COMPLETED)) {
      return FILTER_TYPE.COMPLETED;
    }
  }

  changeByFilter(target) {
    const member = this.getMember(target);
    const currentOption = this.getCurrentOption(target);
    todoAppView.changeFilterBtn(target);
    if (currentOption === 'priority') {
      const todoList = this.filterByPriority([...member.todoList]);
      todoAppView.renderTodoList(member, todoList);
      return;
    }
    const todoList = this.filterTodoList(member.todoList, currentOption);
    todoAppView.renderTodoList(member, todoList);
  }

  filterByPriority(todoList) {
    const priorityOption = {
      FIRST: 1,
      SECOND: 2,
      NONE: 3,
    };
    return todoList.sort(
      (a, b) => priorityOption[a.priority] - priorityOption[b.priority]
    );
  }

  filterTodoList(todoList, currentOption) {
    const option = {
      all: () => true,
      active: item => item.isCompleted === false,
      completed: item => item.isCompleted === true,
    };
    return todoList.filter(item => option[currentOption](item));
  }
}
