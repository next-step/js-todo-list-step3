import { $ } from "../../utils/selectors.js";
import Component from "../../core/Component.js";
import TodoInput from "../../components/TodoInput/index.js";
import TodoItem from "../../components/TodoItem/index.js";
import { buildNewState } from "./helpers.js";
export default class TodoList extends Component {
  constructor(app, props) {
    super();
    this.app = app;
    this.props = props;
    this.state = { member: props.member, teamId: props.teamId };
    this.init();
  }

  init = () => {
    this.TodoItem = new TodoItem(`#${this.state.member._id}`, {
      getState: this.getState,
    });
    this.TodoInput = new TodoInput(`#todoapp-${this.state.member._id}`, {
      getState: this.getState,
      setState: this.setState,
    });
  };
  getState = () => {
    return this.state;
  };
  setState = (message) => {
    console.log("this.state: ", this.state);
    this.state = buildNewState(this.state, message);
    console.log("this.newState: ", this.state);
    this.render();
    this.mount();
  };
  mount() {
    this.TodoItem.mount();
    this.TodoInput.mount();
  }
  //#todoapp-list
  render = () => {
    $(this.app).innerHTML = this.template();
  };
  template() {
    const {
      member: { name, _id },
    } = this.state;
    return `<li class="todoapp-container">
    <h2>
      <span><strong>${name}</strong>'s Todo List</span>
    </h2>
    <div id="todoapp-${_id}"class="todoapp">
      ${this.TodoInput.template()}
      <section class="main">
        <ul id="${_id}" class="todo-list">
            ${this.TodoItem.template()}
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count">총 <strong>0</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#all" class="selected">전체보기</a>
          </li>
          <li>
            <a href="#priority">우선 순위</a>
          </li>
          <li>
            <a href="#active">해야할 일</a>
          </li>
          <li>
            <a href="#completed">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
    </div>
  </li>
`;
  }
}
