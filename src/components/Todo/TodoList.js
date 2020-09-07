import {Component} from "../../core/Component.js";
import {
  DELETE_ITEM,
  SET_EDITING,
  todoOfTeamStore,
  TOGGLE_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_PRIORITY
} from "../../store/todoOfTeamStore.js";
import {TodoListFooter} from "./TodoListFooter.js";
import {TodoItemAppender} from "./TodoItemAppender.js";
import PriorityTypes from "../../constants/PriorityTypes.js";

const priorityChip = {
  [PriorityTypes.PRIMARY]: 'primary',
  [PriorityTypes.SECONDARY]: 'secondary',
}

export const TodoList = class extends Component {

  get #member () {
    return todoOfTeamStore.$state.members[this.$props.id];
  }

  get #filteredItems () {
    return todoOfTeamStore.$getters.membersByFilteredTodoList[this.$props.id];
  }

  isEditingOf (id) {
    return todoOfTeamStore.$state.editing === id;
  }

  render () {
    return `
      <h2>
        <span><strong>${this.#member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section id="todo-item-appender" class="input-container"></section>
        <section class="main">
          <ul class="todo-list">
            ${ this.#filteredItems.map(({ _id, isCompleted, priority, contents }) => `
              <li class="todo-list-item ${ isCompleted ? 'completed' : '' } ${ this.isEditingOf(_id) ? 'editing' : '' }" data-id="${_id}">
                <div class="view">
                  <input class="toggle" type="checkbox" data-ref="toggle" ${ isCompleted ? 'checked' : '' } />
                  <label class="label" data-ref="editing">
                    <div class="chip-container">
                      ${priority === 0 ? `
                        <select class="chip select" data-ref="priority">
                          <option value="${PriorityTypes.NONE}" selected>순위</option>
                          <option value="${PriorityTypes.PRIMARY}">1순위</option>
                          <option value="${PriorityTypes.SECONDARY}">2순위</option>
                        </select>` : `
                        <span class="chip ${priorityChip[priority]}">${priority}순위</span>                        
                      `}
                    </div>
                    ${contents}
                  </label>
                  <button class="destroy" data-ref="delete"></button>
                </div>
                <input class="edit" value="${contents}" data-ref="edited" />
              </li>
            `).join('') }
          </ul>
        </section>
        <div id="todo-list-footer" class="count-container"></div>
      </div>
    `;
  }


  componentDidMount () {
    const $todoListFooter = this.$target.querySelector('#todo-list-footer');
    const $todoItemAppender = this.$target.querySelector('#todo-item-appender');
    new TodoListFooter($todoListFooter, { id: this.$props.id });
    new TodoItemAppender($todoItemAppender, { id: this.$props.id });
  }

  setEvent () {
    const getId = target => target.closest('[data-id]').dataset.id;
    this.addEvent('toggle', 'change', ({ target }) => {
      this.#toggle(getId(target));
    });
    this.addEvent('delete', 'click', ({ target }) => {
      this.#remove(getId(target));
    });
    this.addEvent('editing', 'dblclick', ({ target }) => {
      this.#editing(getId(target));
    });
    this.addEvent('edited', 'keypress', ({ target, key }) => {
      if (key === 'Enter') this.#edited(getId(target), target.value);
    });
    this.addEvent('edited', 'keyup', ({ key }) => {
      if (key === 'Escape') this.#cancel();
    });
    this.addEvent('priority', 'change', ({ target }) => {
      this.#updatePriority(getId(target), target.value);
    });
  }

  #toggle (itemId) {
    todoOfTeamStore.dispatch(TOGGLE_ITEM, { memberId: this.$props.id, itemId });
  }

  #remove (itemId) {
    todoOfTeamStore.dispatch(DELETE_ITEM, { memberId: this.$props.id, itemId });
  }

  #editing (itemId) {
    todoOfTeamStore.commit(SET_EDITING, itemId);
  }

  #edited (itemId, contents) {
    todoOfTeamStore.dispatch(UPDATE_ITEM, { memberId: this.$props.id, itemId, contents });
    this.#cancel();
  }

  #cancel () {
    todoOfTeamStore.commit(SET_EDITING, null);
  }

  #updatePriority (itemId, priority) {
    todoOfTeamStore.dispatch(UPDATE_ITEM_PRIORITY, { memberId: this.$props.id, itemId, priority });
  }
}