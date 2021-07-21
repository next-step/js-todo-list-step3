import Component from "../../core/Component.js";
import { $ } from "../../utils/selectors.js";

export default class TodoItem extends Component {
  constructor(app, props) {
    super();
    this.app = app;
    this.props = props;
  }
  mount() {
    $(this.app).addEventListener("click", (e) => {
      console.log("e.target: ", e.target);
    });
  }
  render() {}
  template() {
    const { member, teamId } = this.props.getState();
    return `${member.todoList
      .map((todo) => {
        return `<li class="todo-list-item">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="label">
            <div class="chip-container">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
            </div>
            ${todo.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="완료된 타이틀" />
      </li>`;
      })
      .join("")}`;
  }
}
