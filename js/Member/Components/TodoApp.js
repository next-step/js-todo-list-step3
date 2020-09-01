import {
  isBoolean,
  validateInstance,
  validateTodoItems,
} from "../../Common/utils.js";
import Title from "./Title.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import todoAPI from "../../Common/api/todoAPI.js";
import Loader from "../../Common/Components/Loader.js";

function TodoApp($target, { teamId, member }) {
  validateInstance(TodoApp, this);
  this.$target = $target;
  this.state = {
    memberName: member.name,
    todoItems: member.todoList,
    isLoading: false,
  };

  const api = new todoAPI(teamId, member._id);

  console.log(this.state);

  this.setState = (state) => {
    if (state?.todoItems) {
      validateTodoItems(state.todoItems);
      this.state.todoItems;
    }

    if (isBoolean(state?.isLoading)) {
      this.state.isLoading = state.isLoading;
    }

    this.render();

    if (this.state.isLoading) {
      return;
    }
    this.initComponents();
  };

  this.addTodoItem = async (contents) => {
    try {
      this.setState({ isLoading: true });
      const newTodoItem = await api.addTodoItem(contents);
      this.state.todoItems.push(newTodoItem);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.toggleTodoById = async (id) => {
    try {
      const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
      if (!todoItem) {
        console.log(`Can't find todoItem with id : ${id}`);
        return;
      }
      this.setState({ isLoading: true });
      const newTodoItem = await api.toggleTodoItemById(id);
      todoItem.isCompleted = newTodoItem.isCompleted;
      // todoItem.isCompleted = !todoItem.isCompleted;
      // const filteredTodoItems = this.getFilteredTodoItems();
      // this.todoList.setState(filteredTodoItems);
      // this.todoCount.setState(filteredTodoItems.length);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.deleteTodoById = async (id) => {
    const todoItemIdx = this.state.todoItems.findIndex(({ _id }) => _id === id);
    if (todoItemIdx === -1) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    try {
      this.setState({ isLoading: true });
      this.state.todoItems.splice(todoItemIdx, 1);
      //const filteredTodoItems = this.getFilteredTodoItems();
      await api.deleteTodoItemById(id);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.editTodoItemContentsById = async (id, contents) => {
    const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    try {
      this.setState({ isLoading: true });
      const newTodoItem = await api.editTodoItemContentsById(id, contents);
      todoItem.contents = newTodoItem.contents;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.setTodoItemPriorityById = async (id, priority) => {
    const todoItem = this.state.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    try {
      this.setState({ isLoading: true });
      const newTodoItem = await api.setTodoItemPriorityById(id, priority);
      todoItem.priority = newTodoItem.priority;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.initComponents = () => {
    this.userTitle = new Title(
      this.$target.querySelector(".user-title"),
      this.state.memberName
    );
    this.todoInput = new TodoInput(this.$target.querySelector(".todo-input"), {
      addTodoItem: (contents) => this.addTodoItem(contents),
    });

    this.todoList = new TodoList(
      this.$target.querySelector(".todo-list"),
      this.state.todoItems,
      {
        toggleTodoById: (todoId) => this.toggleTodoById(todoId),
        deleteTodoById: (todoId) => this.deleteTodoById(todoId),
        editTodoItemContentsById: (todoId, contents) =>
          this.editTodoItemContentsById(todoId, contents),
        setTodoItemPriorityById: (todoId, priority) =>
          this.setTodoItemPriorityById(todoId, priority),
      }
    );
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = this.state.isLoading
      ? Loader
      : `
      <h2 class="user-title"></h2>

      <section class="input-container todo-input">
      </section>

      <section class="main">
        <div class="todo-list"></div>
      </section>

      <div class="count-container">
        <div id="todo-count"></div>
        <div id="todo-filter"></div>
        <button class="clear-completed">모두 삭제</button>
      </div>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoApp;
