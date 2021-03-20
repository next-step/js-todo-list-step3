'use strcit';

import { todoAppView } from '../view/todoAppView.js';
import { teamStore } from '../store/teamStore.js';
import { memberStore } from '../store/memberStore.js';
import { elementValidator } from '../utils/validator.js';

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

  changeByFilter(target) {
    console.log('TodoFilterController - changeByFilter');
    const member = this.getMember(target);
    const currentOption = this.getCurrentOption(target);
    const todos = this.filterTodoList(member.todoList, currentOption);
    todoAppView.changeFilterBtn(target);
    todoAppView.renderTodoList(member, todos);
  }

  clearAllItems(target) {
    console.log('TodoFilterController - clearAllItems');
    if (!confirm('정말 모든 항목을 삭제하시겠습니까?')) return;
    console.log(target);
  }

  filterTodoList(todoList, currentOption) {
    const option = {
      all: () => true,
      priority: () => true,
      active: item => item.isCompleted === false,
      completed: item => item.isCompleted === true,
    };
    return todoList.filter(item => option[currentOption](item));
  }

  getCurrentOption(target) {
    const classList = target.classList;
    if (classList.contains('all')) {
      return 'all';
    }
    if (classList.contains('active')) {
      return 'active';
    }
    if (classList.contains('priority')) {
      return 'priority';
    }
    if (classList.contains('completed')) {
      return 'completed';
    }
  }
}
