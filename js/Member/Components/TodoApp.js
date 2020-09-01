import {
  isBoolean,
  validateInstance,
  validateTodoItems,
} from "../../Common/utils.js";
import Title from "./Title.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilter.js";
import todoAPI from "../../Common/api/todoAPI.js";
import Loader from "../../Common/Components/Loader.js";
import { FilterType } from "../../Common/constants.js";
import TodoCount from "./TodoCount.js";

function TodoApp($target, { teamId, member }) {
  validateInstance(TodoApp, this);
  this.$target = $target;
  this.state = {
    memberName: member.name,
    todoItems: member.todoList,
    isLoading: false,
    filterType: FilterType.ALL,
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

    if (state?.filterType) {
      this.state.filterType = state.filterType;
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
      this.todoInput?.focusInputElem();
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

  this.deleteAllTodo = async () => {
    try {
      this.setState({ isLoading: true });
      await api.deleteAllTodoItem();
      this.state.todoItems = [];
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.setFilterType = (filterType) => {
    if (this.state.filterType === filterType) {
      return;
    }
    this.setState({ filterType });
  };

  this.getFilteredTodoItems = () => {
    switch (this.state.filterType) {
      case FilterType.ACTIVE:
        return this.state.todoItems.filter(({ isCompleted }) => !isCompleted);
      case FilterType.COMPLETED:
        return this.state.todoItems.filter(({ isCompleted }) => isCompleted);
      default:
        return this.state.todoItems;
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

    const filteredTodoItems = this.getFilteredTodoItems();

    this.todoList = new TodoList(
      this.$target.querySelector(".todo-list"),
      filteredTodoItems,
      {
        toggleTodoById: (todoId) => this.toggleTodoById(todoId),
        deleteTodoById: (todoId) => this.deleteTodoById(todoId),
        editTodoItemContentsById: (todoId, contents) =>
          this.editTodoItemContentsById(todoId, contents),
        setTodoItemPriorityById: (todoId, priority) =>
          this.setTodoItemPriorityById(todoId, priority),
      }
    );
    this.todoCount = new TodoCount(
      this.$target.querySelector(".todo-count"),
      filteredTodoItems.length
    );
    this.todoFilter = new TodoFilter(
      this.$target.querySelector(".todo-filter"),
      this.state.filterType,
      { onChangeType: (filterType) => this.setFilterType(filterType) }
    );
  };

  this.initEventListeners = () => {
    const onClickHandler = (event) => {
      if (!event.target.classList.contains("clear-completed")) {
        return;
      }
      this.deleteAllTodo();
    };

    $target.addEventListener("click", onClickHandler);
  };

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
        <div class="todo-count"></div>
        <div class="todo-filter"></div>
        <button class="clear-completed">모두 삭제</button>
      </div>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoApp;
