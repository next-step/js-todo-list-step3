import {Component} from "@/core";
import {ADD_ITEM, todoOfTeamStore} from "@/store/todoOfTeamStore";
import {KeyEvent} from "@/domains";
import {teamStore} from "@/store";

export const TodoItemAppender = class extends Component<{ id: string }> {

  protected template () {
    return `
      <input class="new-todo" placeholder="할 일을 입력해주세요." data-ref="appender" autofocus />
    `;
  }

  protected setEvent () {
    this.addEvent<KeyEvent>('appender', 'keyup', ({ key, target }) => {
      if (key === 'Enter') {
        todoOfTeamStore.dispatch(ADD_ITEM, {
          memberId: this.$props!.id,
          contents: target.value
        });
        target.value = '';
      }
    });
  }

}
