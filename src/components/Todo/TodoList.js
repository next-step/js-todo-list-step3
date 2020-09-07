import {Component} from "../../core/Component.js";
import {todoOfTeamStore} from "../../store/todoOfTeamStore.js";
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
              <li class="todo-list-item ${ isCompleted ? 'completed' : '' } ${ this.isEditingOf(_id) ? 'editing' : '' }">
                <div class="view">
                  <input class="toggle" type="checkbox" ${ isCompleted ? 'checked' : '' } />
                  <label class="label">
                    <div class="chip-container">
                      ${priority === 0 ? `
                        <select class="chip select">
                          <option value="0" selected>순위</option>
                          <option value="1">1순위</option>
                          <option value="2">2순위</option>
                        </select>` : `
                        <span class="chip ${priorityChip[priority]}">${priority}순위</span>                        
                      `}
                    </div>
                    ${contents}
                  </label>
                  <button class="destroy"></button>
                </div>
                <input class="edit" value="${contents}" />
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
}