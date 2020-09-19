import {ChildrenProps, Component} from "@/core";
import {TodoMemberAppender} from "./TodoMemberAppender";
import {TodoList} from "./TodoList";
import {todoOfTeamStore} from "@/store";
import {selectAllElement, selectElement} from "@/utils";

export const TodoListOfTeam = class extends Component {

  private get ids (): string[] {
    return Object.keys(todoOfTeamStore.$state.members);
  }

  protected componentInit() {
    this.$children = {
      TodoMemberAppender: { constructor: TodoMemberAppender },
      ...this.ids.reduce((obj: ChildrenProps, id) => {
        obj[`TodoList-${id}`] = {
          constructor: TodoList,
          props: { id },
        }
        return obj;
      }, {})
    }
  }

  protected template () {
    return `
      ${this.ids.map(id => `
        <li data-component="TodoList-${id}" class="todoapp-container"></li>
      `).join('')}
      <li id="todo-member-appender" data-component="TodoMemberAppender" class="add-user-button-container"></li>
    `
  }

}
