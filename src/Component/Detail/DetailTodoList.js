import CONSTANT from '../../Constants/Constans.js';
import Component from '../../core/Component.js';
import { delegate, on } from '../../util/helpers.js';
import DetailButton from './DetailButton.js';

export default class DetailTodoList extends Component {
  constructor($element, props) {
    super($element, props);

    this.members = this.props.members;
    this.addTeamTodoItem = this.props.addTeamTodoItem;
    this.changeTeamTodoItemPriority = this.props.changeTeamTodoItemPriority;
    this.toggleTeamTodoItem = this.props.toggleTeamTodoItem;
    this.deleteTeamTodoItem = this.props.deleteTeamTodoItem;
    this.editTeamTodoItemContents = this.props.editTeamTodoItemContents;
    this.deleteTeamTodoItemAll = this.props.deleteTeamTodoItemAll;
    this.changeFilter = this.props.changeFilter;
    this.addTeamMember = this.props.addTeamMember;

    this.templates = new Templates();
    this.render();
  }

  handleKeyUp({ key, target }) {
    const contents = target.value;

    if (key === 'Enter' && contents.length > 0) {
      const memberId = target.closest('li').dataset.memberid;
      this.addTeamTodoItem(memberId, contents);
    }
  }

  handleChange({ target }) {
    const memberId = target.closest('.todoapp-container').dataset.memberid;
    const itemId = target.closest('li').dataset.itemid;
    const priority = target.value;
    if (priority === '0') return;

    this.changeTeamTodoItemPriority(memberId, itemId, priority);
  }

  handleToggle({ target }) {
    const memberId = target.closest('.todoapp-container').dataset.memberid;
    const itemId = target.closest('li').dataset.itemid;

    this.toggleTeamTodoItem(memberId, itemId);
  }

  handleDestroy({ target }) {
    const memberId = target.closest('.todoapp-container').dataset.memberid;
    const itemId = target.closest('li').dataset.itemid;

    this.deleteTeamTodoItem(memberId, itemId);
  }

  handleDbclick({ target }) {
    const originValue = target.innerText.split('\n')[1];
    const $li = target.closest('li');
    $li.classList.add('editing');
    on($li, 'keyup', (event) => this._editTodoText(event, originValue));
  }

  removeAll({ target }) {
    const memberId = target.closest('.todoapp-container').dataset.memberid;
    this.deleteTeamTodoItemAll(memberId);
  }

  _editTodoText({ key, target }, originValue) {
    if (key === CONSTANT.ESCAPE || key === CONSTANT.ESC) {
      target.value = originValue;
      return target.closest('li').classList.remove('editing');
    }
    if (key === CONSTANT.ENTER) {
      const memberId = target.closest('.todoapp-container').dataset.memberid;
      const itemId = target.closest('li').dataset.itemid;
      return this.editTeamTodoItemContents(memberId, itemId, target.value);
    }
  }
  handleClick({ target }) {
    const filter = target.className.split(' ')[0];
    const memberId = target.closest('.todoapp-container').dataset.memberid;
    this.changeFilter(memberId, filter);
  }

  setEvent() {
    delegate(this.$element, 'keyup', '.new-todo', (event) =>
      this.handleKeyUp(event)
    );
    delegate(this.$element, 'change', '.chip.select', (event) =>
      this.handleChange(event)
    );
    delegate(this.$element, 'click', '.toggle', (event) =>
      this.handleToggle(event)
    );
    delegate(this.$element, 'click', '.destroy', (event) =>
      this.handleDestroy(event)
    );
    delegate(this.$element, 'dblclick', '.label', (event) =>
      this.handleDbclick(event)
    );
    delegate(this.$element, 'click', '.clear-completed', (event) =>
      this.removeAll(event)
    );
    delegate(this.$element, 'click', '.all', (event) =>
      this.handleClick(event)
    );
    delegate(this.$element, 'click', '.active', (event) =>
      this.handleClick(event)
    );
    delegate(this.$element, 'click', '.completed', (event) =>
      this.handleClick(event)
    );
  }

  _filterTodoList(todoList = [], filter) {
    if (filter === CONSTANT.ACTIVE) {
      return todoList.filter((item) => !item.isCompleted);
    } else if (filter === CONSTANT.COMPLETED) {
      return todoList.filter((item) => item.isCompleted);
    }

    return todoList;
  }

  template() {
    return this.members
      .map(({ _id, name, todoList, filter }) => {
        const filteredTodoList = this._filterTodoList(todoList, filter);

        return `
    <li class="todoapp-container" data-memberId=${_id}>
        <h2>
            <span><strong>${name}</strong>'s Todo List</span>
        </h2>
        <div class="todoapp">
            <section class="input-container">
              <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
            </section>
            <section class="main">
                ${this.templates.getTodoList(filteredTodoList)}
            </section>
            ${this.templates.getFilter(filteredTodoList.length, filter)}
        </div>
    </li>
    `;
      })
      .join('');
  }

  mounted() {
    new DetailButton(this.$element, { addTeamMember: this.addTeamMember });
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
        <li class=${
          isCompleted ? '"todo-list-item completed"' : '"todo-list-item"'
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
            <span  class="all ${
              filter === CONSTANT.ALL ? 'selected' : ''
            }">전체보기</span >
            </li>
            <li>
            <span class="active ${
              filter === CONSTANT.ACTIVE ? 'selected' : ''
            }">해야할 일</span >
            </li>
            <li>
            <span class="completed ${
              filter === CONSTANT.COMPLETED ? 'selected' : ''
            }">완료한 일</span >
            </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
      `;
  }
}
