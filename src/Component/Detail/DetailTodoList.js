import CONSTANT from '../../Constants/Constans.js';
import Component from '../../core/Component.js';
import { delegate } from '../../util/helpers.js';

export default class DetailTodoList extends Component {
  constructor($element, props) {
    super($element, props);

    this.members = this.props.members;
    this.addTeamTodoItem = this.props.addTeamTodoItem;
    this.changeTeamTodoItemPriority = this.props.changeTeamTodoItemPriority;

    this.templates = new Templates();
    this.render();
  }

  handleKeyUp(event) {
    const key = event.key;
    const contents = event.target.value;

    if (key === 'Enter') {
      const memberId = event.target.closest('li').dataset.memberid;
      this.addTeamTodoItem(memberId, contents);
    }
  }

  handleChange(event) {
    const memberId =
      event.target.closest('.todoapp-container').dataset.memberid;
    const itemId = event.target.closest('li').dataset.itemid;
    const priority = event.target.value;
    if (priority === '0') return;

    this.changeTeamTodoItemPriority(memberId, itemId, priority);
  }

  setEvent() {
    delegate(this.$element, 'keyup', '.new-todo', (event) =>
      this.handleKeyUp(event)
    );
    delegate(this.$element, 'change', '.chip.select', (event) =>
      this.handleChange(event)
    );
  }

  template() {
    return this.members
      .map(
        ({ _id, name, todoList }) => `
    <li class="todoapp-container" data-memberId=${_id}>
        <h2>
            <span><strong>${name}</strong>'s Todo List</span>
        </h2>
        <div class="todoapp">
            <section class="input-container">
              <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
            </section>
            <section class="main">
                ${this.templates.getTodoList(todoList)}
            </section>
            ${this.templates.getFilter()}
        </div>
    </li>
    `
      )
      .join('');
  }
}

class Templates {
  getTodoList(data = []) {
    return `
      <ul class="todo-list">
        ${data.map(this._getItem).join('')}
      </ul>
      `;
  }

  _getItem({ _id, contents, isCompleted, priority }) {
    const priorityTemplate = {
      NONE: CONSTANT.NONE_TEMPLATE,
      FIRST: CONSTANT.FIRST_TEMPLATE,
      SECOND: CONSTANT.SECOND_TEMPLATE,
    }[priority];
    return `
        <li ${
          isCompleted ? 'class="todo-list-item completed"' : 'todo-list-item'
        } data-itemId=${_id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${
            isCompleted ? 'checked' : ''
          }/>
          <label class="label">
            <div class="chip-container">
                ${priorityTemplate} 
            </div>
            ${contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
      `;
  }

  getFilter(counter = 0, filter = 'all') {
    return `
    <div class="count-container">
        <span class="todo-count">총 <strong>${counter}</strong> 개</span>
        <ul class="filters">
            <li>
            <a href="#" class="all ${
              filter === CONSTANT.ALL ? 'selected' : ''
            }">전체보기</a>
            </li>
            <li>
            <a href="#active" class="active ${
              filter === CONSTANT.ACTIVE ? 'selected' : ''
            }">해야할 일</a>
            </li>
            <li>
            <a href="#completed" class="completed ${
              filter === CONSTANT.COMPLETED ? 'selected' : ''
            }">완료한 일</a>
            </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
      `;
  }
}
