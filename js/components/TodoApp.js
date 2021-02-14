import Component from "../core/Component.js";
import TodoAppender from "./TodoAppender.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilter.js";
import { memberAPI } from "../api/api.js";

export default class TodoApp extends Component {
  async setup() {
    this.member = this.props.member;
    this.state = {
      typeOfFilter: "all",
      teamID: this.props.teamID,
      memberID: this.member._id,
      todoList: this.member.todoList,
      edit: false,
    };
  }
  template() {
    return `
        <h2>
          <span><strong>${this.member.name}</strong>'s Todo List</span>
        </h2>
        <div class="todoapp">
          <section class="input-container">
            <input
              class="new-todo"
              placeholder="할 일을 입력해주세요."
              autofocus
            />
          </section>
          <section class="main">
            <ul class="todo-list"></ul>
            <div class="count-container"></div>
          </section>
        </div>
    `;
  }

  mounted() {
    const {
      filteredList,
      addTodo,
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      filterList,
    } = this;
    const $todoAppender = this.$target.querySelector(".new-todo");
    const $todoList = this.$target.querySelector(".todo-list");
    const $todoFilter = this.$target.querySelector(".count-container");
    new TodoAppender($todoAppender, {
      addTodo: addTodo.bind(this),
    });

    new TodoList($todoList, {
      filteredList,
      toggleTodo: toggleTodo.bind(this),
      deleteTodo: deleteTodo.bind(this),
      onEditingMode: onEditingMode.bind(this),
      editTodo: editTodo.bind(this),
    });

    new TodoFilter($todoFilter, {
      typeOfFilter: this.state.typeOfFilter,
      filteredList,
      filterList: filterList.bind(this),
    });
  }

  get filteredList() {
    const { typeOfFilter, todoList } = this.state;
    return todoList.filter(({ isCompleted }) => {
      return typeOfFilter === "all" || typeOfFilter === isCompleted;
    });
  }

  async addTodo(contents) {
    const { teamID, memberID, todoList } = this.state;
    const newTodo = await memberAPI.addTodoItem(teamID, memberID, contents);
    this.setState({
      todoList: [...todoList, newTodo],
    });
  }

  toggleTodo(itemID) {
    const { teamID, memberID, todoList } = this.state;
    const index = this.findIndexOfItem(todoList, itemID);
    todoList[index].isCompleted = !todoList[index].isCompleted;
    memberAPI.toggleTodoItem(teamID, memberID, itemID);
    this.setState({ todoList });
  }

  deleteTodo(itemID) {
    const { teamID, memberID, todoList } = this.state;
    const index = this.findIndexOfItem(todoList, itemID);
    todoList.splice(index, 1);
    memberAPI.deleteTodoItem(teamID, memberID, itemID);
    this.setState({ todoList });
  }

  onEditingMode(itemID) {
    const { todoList } = this.state;
    const index = this.findIndexOfItem(todoList, itemID);
    todoList[index].edit = !todoList[index].edit;
    this.setState({ todoList });
  }

  editTodo(itemID, editingContents) {
    const { teamID, memberID, todoList } = this.state;
    const index = this.findIndexOfItem(todoList, itemID);
    todoList[index].contents = editingContents;
    memberAPI.reviseContents(teamID, memberID, itemID, editingContents);
    this.setState({ todoList });
  }

  filterList(typeOfFilter) {
    this.setState({ typeOfFilter });
  }
  findIndexOfItem(todoList, itemID) {
    return todoList.findIndex((todo) => {
      return todo._id === itemID;
    });
  }
}
