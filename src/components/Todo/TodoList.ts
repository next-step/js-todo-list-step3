import {Component} from "@/core";
import {DELETE_ITEM, SET_EDITING, TOGGLE_ITEM, UPDATE_ITEM, UPDATE_ITEM_PRIORITY, todoOfTeamStore} from "@/store/todoOfTeamStore";
import {TodoListFooter} from "./TodoListFooter";
import {TodoItemAppender} from "./TodoItemAppender";
import {PriorityTypes, FilterTypes, priorityValueOf, getPriorityChip} from "@/constants";
import {TodoItem} from "@/domains";

export const TodoList = class extends Component<{ id: string }> {

  private get member () {
    return todoOfTeamStore.$state.members[this.$props.id];
  }
  
  private get filterType () {
    return todoOfTeamStore.$state.filterType[this.$props.id];
  }

  private get filteredItems () {
    const memberOfItem: Record<string, any> = todoOfTeamStore.$getters.membersByFilteredTodoList;
    const items: TodoItem[] = memberOfItem[this.$props.id];
    if (this.filterType === FilterTypes.PRIORITY) {
      items.sort((a, b) => (a.priority || 100) - (b.priority || 100));
    }
    return items;
  }

  isEditingOf (id: string) {
    return todoOfTeamStore.$state.editing === id;
  }

  template () {
    return `
      <h2>
        <span><strong>${this.member.name}</strong>'s Todo List</span>
      </h2>
      <div class="todoapp">
        <section id="todo-item-appender" class="input-container"></section>
        <section class="main">
          <ul class="todo-list">
            ${ this.filteredItems.map(({ _id, isCompleted, priority, contents }) => `
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
                        <span class="chip ${getPriorityChip(priority)}">${priority}순위</span>                        
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
    const $todoListFooter = this.$target.querySelector('#todo-list-footer') as HTMLElement;
    const $todoItemAppender = this.$target.querySelector('#todo-item-appender') as HTMLElement;
    new TodoListFooter($todoListFooter, { id: this.$props.id });
    new TodoItemAppender($todoItemAppender, { id: this.$props.id });
  }

  setEvent () {
    const getId = (target: any): string => {
      const parent = target.closest('[data-id]') as HTMLElement;
      return parent?.dataset.id!;
    }

    this.addEvent('toggle', 'change', ({ target }) => {
      this.toggle(getId(target));
    });
    this.addEvent('delete', 'click', ({ target }) => {
      this.remove(getId(target));
    });
    this.addEvent('editing', 'dblclick', ({ target }) => {
      this.editing(getId(target));
    });
    this.addEvent('edited', 'keypress', e => {
      const { key, target } = e as KeyboardEvent;
      if (key === 'Enter') this.edited(getId(target), (target as HTMLInputElement).value);
    });
    this.addEvent('edited', 'keyup', e => {
      const { key } = e as KeyboardEvent;
      if (key === 'Escape') this.cancel();
    });
    this.addEvent('priority', 'change', ({ target }) => {
      this.updatePriority(getId(target), Number((target as HTMLInputElement).value));
    });
  }

  private toggle (itemId: string) {
    todoOfTeamStore.dispatch(TOGGLE_ITEM, { memberId: this.$props.id, itemId });
  }

  private remove (itemId: string) {
    todoOfTeamStore.dispatch(DELETE_ITEM, { memberId: this.$props.id, itemId });
  }

  private editing (itemId: string) {
    todoOfTeamStore.commit(SET_EDITING, itemId);
  }

  private edited (itemId: string, contents: string) {
    todoOfTeamStore.dispatch(UPDATE_ITEM, { memberId: this.$props.id, itemId, contents });
    this.cancel();
  }

  private cancel () {
    todoOfTeamStore.commit(SET_EDITING, null);
  }

  private updatePriority (itemId: string, priority: number) {
    todoOfTeamStore.dispatch(UPDATE_ITEM_PRIORITY, { memberId: this.$props.id, itemId, priority });
  }
}