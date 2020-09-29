import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoBottom from "./TodoBottom.js";
import API from "../../utils/api.js";
import { ALL, COMPLETED, TODO_APP, ACTIVE } from "../../utils/data.js";
import { validateTodoList } from "../../utils/util.js";
import { errorCallTemplate } from "../../utils/template.js";
import TodoError from "./TodoError.js";

export default function TodoApp({ $target, teamId, memberId, todoList }) {
  this.init = () => {
    if (!(this instanceof TodoApp)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      teamId,
      memberId,
      todoList
    };
    this.$todoApp = document.createElement("div");
    this.$todoApp.classList.add(TODO_APP);

    this.todoInput = new TodoInput({
      $target: this.$todoApp,
      addTodo: this.addTodo.bind(this)
    });
    this.todoList = new TodoList({
      $target: this.$todoApp,
      todoList: this.state.todoList,
      deleteTodo: this.deleteTodo.bind(this),
      toggleTodo: this.toggleTodo.bind(this),
      editTodo: this.editTodo.bind(this),
      setPriority: this.setPriority.bind(this)
    });
    this.todoBottom = new TodoBottom({
      $target: this.$todoApp,
      todoCount: todoList.length,
      filterTodo: this.filterTodo.bind(this),
      deleteAllTodos: this.deleteAllTodos.bind(this)
    });
    this.todoError = new TodoError({
      $target: this.$todoApp,
      error: null
    });

    $target.appendChild(this.$todoApp);
  };

  this.getTodoList = async _id => {
    const memberTodos = await API.getMemberTodoList(this.state.teamId, this.state.memberId);
    memberTodos.hasOwnProperty("todoList") ? this.setTodos(memberTodos.todoList) : this.setTodos([]);
  };

  this.addTodo = async ({ contents }) => {
    try {
      const todo = await API.addMemberTodoList(this.state.teamId, this.state.memberId, { contents });
      const todos = [...this.state.todoList, todo];
      validateTodoList(todos) && this.setTodos(todos);
    } catch (err) {
      console.log(`Cannot add todo..${err}`);
      this.todoError.setState(`Cannot add todo..${err}`);
    }
  };

  this.deleteTodo = async ({ _id }) => {
    try {
      await API.deleteMemberTodo(this.state.teamId, this.state.memberId, _id);
      this.setTodos(this.state.todoList.filter(todo => todo._id !== _id));
    } catch (err) {
      console.log(`Cannot delete todo..${err}`);
      this.todoError.setState(`Cannot delete todo..${err}`);
    }
  };

  this.toggleTodo = async ({ _id }) => {
    try {
      await API.toggleMemberTodo(this.state.teamId, this.state.memberId, _id);
      const todos = this.state.todoList.map(todo => {
        if (todo._id === _id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
      validateTodoList(todos) && this.setTodos(todos);
    } catch (err) {
      console.log(`Cannot toggle todo..${err}`);
      this.todoError.setState(`Cannot toggle todo..${err}`);
    }
  };

  this.editTodo = async ({ contents, _id }) => {
    try {
      const editedTodo = await API.editMemberTodo(this.state.teamId, this.state.memberId, _id, contents);
      const todos = this.state.todoList.map(todo => {
        if (todo._id === editedTodo._id) {
          todo.contents = editedTodo.contents;
        }
        return todo;
      });
      this.setTodos(todos);
    } catch (err) {
      console.log(`Cannot edit todo..${err}`);
      this.todoError.setState(`Cannot edit todo..${err}`);
    }
  };

  this.setPriority = async ({ _id, priority }) => {
    try {
      const setPriorityTodo = await API.setMemberTodoPriority(this.state.teamId, this.state.memberId, _id, priority);
      const todos = this.state.todoList.map(todo => {
        if (todo._id === setPriorityTodo._id) {
          todo.priority = setPriorityTodo.priority;
        }
        return todo;
      });
      validateTodoList(todos) && this.setTodos(todos);
    } catch (err) {
      console.log(`Cannot set priority..${err}`);
      this.todoError.setState(`Cannot set priority..${err}`);
    }
  };

  this.deleteAllTodos = async () => {
    try {
      await API.deleteMemberAllTodos(this.state.teamId, this.state.memberId);
      this.getTodoList();
    } catch (err) {
      console.log(`Cannot delete TodoList..${err}`);
      this.todoError.setState(`Cannot delete TodoList..${err}`);
    }
  };

  this.filterTodo = type => {
    if (type === ALL || type === "") {
      this.render();
    } else if (type === COMPLETED) {
      this.setStateForRendering(this.state.todoList.filter(todo => todo.isCompleted));
    } else if (type === ACTIVE) {
      this.setStateForRendering(this.state.todoList.filter(todo => !todo.isCompleted));
    } else {
      this.setStateForRendering(this.state.todoList.sort((todoA, todoB) => todoA.priority - todoB.priority));
    }
  };

  this.setStateForRendering = todos => {
    this.todoList.setState(todos);
    this.todoBottom.setState(todos.length);
  };

  this.setTodos = todos => {
    this.state.todoList = todos;
    this.render();
  };

  this.render = () => {
    this.todoList.setState(this.state.todoList);
    this.todoBottom.setState(this.state.todoList.length);
  };

  this.init();
}