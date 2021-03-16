import Component from "../core/Component.js";

export default class TodoAppender extends Component {
  setEvent() {
    const { addTodo } = this.props;

    this.addEvent("keyup", ".new-todo", ({ key, target }) => {
      if (key !== "Enter") return;
      addTodo(target.value);
    });
  }
}
