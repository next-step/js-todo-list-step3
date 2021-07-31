import Component from '../../core/Component.js';

export default class TodoListInput extends Component {
  template() {
    return `<input class="new-todo" data-action="addTodo" placeholder="할 일을 입력해주세요." autofocus />`;
  }
}
