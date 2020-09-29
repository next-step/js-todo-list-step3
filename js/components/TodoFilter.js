export default class TodoFilter {
  constructor(memberId, allRemoveTodo, updateTodoList) {
    this.memberId = memberId;
    this.todoFilterElement = document.querySelector(
      `[id="${memberId}"] .count-container`
    );
    this.filtersElement = document.querySelector(`[id="${memberId}"] .filters`);
    this.allClearElement = document.querySelector(
      `[id="${memberId}"] .clear-completed`
    );
    this.todoCount = 0;
    this.allRemoveTodo = allRemoveTodo;
    this.updateTodoList = updateTodoList;

    this.selectFilterEvent();
    this.allClearTodos();
  }

  setState(count) {
    this.todoCount = count;
    this.render();
  }

  updateSelectedClass() {
    const locationHash = location.hash;
    this.filtersElement.querySelectorAll('a').forEach((anchorElement) => {
      const type = anchorElement.hash;

      if (
        type === locationHash ||
        (type === `#all_${this.memberId}` && locationHash === '')
      ) {
        anchorElement.classList.add('selected');
      } else if (
        type === locationHash &&
        type === `#priority_${this.memberId}`
      ) {
        anchorElement.classList.add('selected');
      } else if (type === locationHash && type === `#active_${this.memberId}`) {
        anchorElement.classList.add('selected');
      } else if (
        type === locationHash &&
        type === `#completed_${this.memberId}`
      ) {
        anchorElement.classList.add('selected');
      } else {
        anchorElement.classList.remove('selected');
      }
    });
  }

  selectFilterEvent() {
    this.filtersElement.addEventListener('click', ({ target }) => {
      if (location.hash === target.hash) {
        return;
      }
      location.hash = target.hash;
      this.updateTodoList();
    });
  }

  allClearTodos() {
    this.allClearElement.addEventListener('click', () => {
      this.allRemoveTodo();
    });
  }

  todoCountTemplate() {
    const todoCountEl = document.createElement('span');
    todoCountEl.className = 'todo-count';
    todoCountEl.innerHTML = `총 <strong>${this.todoCount}</strong> 개`;
    return todoCountEl;
  }

  render() {
    this.updateSelectedClass();
    if (this.todoFilterElement.childNodes[0].className === 'todo-count') {
      this.todoFilterElement.childNodes[0].remove();
    }
    this.todoFilterElement.prepend(this.todoCountTemplate());
  }
}
