import {Component} from "@/core";
import {ADD_ITEM, todoOfTeamStore} from "@/store/todoOfTeamStore";

export const TodoItemAppender = class extends Component<{ id: string }> {

  template () {
    return `
      <input class="new-todo" placeholder="할 일을 입력해주세요." data-ref="appender" autofocus />
    `;
  }

  setEvent () {
    this.addEvent('appender', 'keyup', event => {
      const { key, target } = event as KeyboardEvent
      if (key === 'Enter') {
        todoOfTeamStore.dispatch(ADD_ITEM, {
          memberId: this.$props!.id,
          contents: (target as HTMLInputElement).value
        });
        (target as HTMLInputElement).value = '';
      }
    });
  }

}