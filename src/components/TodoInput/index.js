import { createTodoItem } from "../../api/requests.js";
import Component from "../../core/Component.js";
import { $ } from "../../utils/selectors.js";

export default class TodoInput extends Component {
  constructor(app, props) {
    super();
    this.app = app;
    this.props = props;
  }
  mount() {
    $(this.app).addEventListener("keypress", async (e) => {
      if (e.code === "Enter") {
        const { getState, setState } = this.props;
        const { teamId, member } = getState();

        const todo = await createTodoItem(teamId, member._id, {
          contents: e.target.value,
        });
        if (todo) {
          setState({ type: "ADDTODO", data: todo });
        }
      }
    });
  }
  template() {
    return `<section class="input-container">
        <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
      </section>`;
  }
}
