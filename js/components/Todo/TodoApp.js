import { Todo } from "/js/apis/index.js";

import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp(appEl, { teamId, user }) {
  this.init = async () => {
    const titleEl = appEl.querySelector("#user-title");
    const inputEl = appEl.querySelector(".new-todo");
    const listEl = appEl.querySelector(".todo-list");
    const countContainerEl = appEl.querySelector(".count-container");

    this.user = user;
    this.todos = this.user.todoList;
    this.filter = null;
    this.editingId = null;
    this.isLoading = false;

    this.todoInput = new TodoInput(inputEl, this);
    this.todoList = new TodoList(listEl, this);
    this.todoCountContainer = new TodoCount(countContainerEl, this);

    this.render();
  };

  this.getTodo = (targetId) => this.todos.find(({ _id }) => _id === targetId);

  this.addTodo = async (contents) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Todo.addTodo(userId, contents);

      this.todos = await Todo.getTodos(userId);
    });

  this.toggleIsComplete = async ({ _id: itemId }) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Todo.toggleIsComplete(userId, itemId);

      this.todos = await Todo.getTodos(userId);
    });

  this.updatePriority = async (_id, priority) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      priority = Todo.priorities[+priority];
      await Todo.updatePriority(userId, { _id, priority });

      this.todos = await Todo.getTodos(userId);
    });

  this.updateContents = async (todo) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Todo.updateContents(userId, todo);

      this.todos = await Todo.getTodos(userId);
    });

  this.deleteTodo = async (itemId) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Todo.deleteTodo(userId, itemId);

      this.todos = await Todo.getTodos(userId);
    });

  this.deleteAllTodos = async () =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Todo.deleteAllTodos(userId);

      this.todos = await Todo.getTodos(userId);
    });

  this.setFilter = (filter = null) => {
    this.filter = filter;
    this.render();
  };

  this.setEditingId = (id = null) => {
    this.editingId = id;
    this.render();
  };

  this.setIsLoading = (isLoading) => {
    if (this.isLoading === isLoading) {
      return;
    }

    this.isLoading = isLoading;
    this.render();
  };

  this.toggleIsLoading = async (exec) => {
    this.setIsLoading(true);
    await exec();
    this.setIsLoading(false);
  };

  this.render = () => {
    const filteredTodos = this.todos.filter(
      ({ isCompleted }) => this.filter === null || isCompleted === this.filter
    );

    this.todoInput.render();
    this.todoList.render(filteredTodos);
    this.todoCountContainer.render(filteredTodos);
  };

  this.init();
}
