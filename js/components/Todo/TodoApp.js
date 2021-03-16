import { Team } from "/js/apis/index.js";

import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp(appEl, { teamId, user }) {
  this.init = async () => {
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
      await Team.addTodo(teamId, userId, contents);

      ({ todoList: this.todos } = await Team.getTodos(teamId, userId));
    });

  this.toggleIsComplete = async ({ _id: itemId }) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Team.toggleIsComplete(teamId, userId, itemId);

      ({ todoList: this.todos } = await Team.getTodos(teamId, userId));
    });

  this.updatePriority = async (_id, priority) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      priority = Team.priorities[+priority];
      await Team.updatePriority(teamId, userId, { _id, priority });

      ({ todoList: this.todos } = await Team.getTodos(teamId, userId));
    });

  this.updateContents = async (todo) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Team.updateContents(teamId, userId, todo);

      ({ todoList: this.todos } = await Team.getTodos(teamId, userId));
    });

  this.deleteTodo = async (itemId) =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Team.deleteTodo(teamId, userId, itemId);

      ({ todoList: this.todos = [] } = await Team.getTodos(teamId, userId));
    });

  this.deleteAllTodos = async () =>
    this.toggleIsLoading(async () => {
      const { _id: userId } = this.user;
      await Team.deleteAllTodos(teamId, userId);

      ({ todoList: this.todos = [] } = await Team.getTodos(teamId, userId));
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
    const renderingTodos = this.todos
      .filter(
        ({ isCompleted }) => this.filter === null || isCompleted === this.filter
      )
      .sort(({ priority: pA }, { priority: pB }) => {
        pA =
          Team.priorities.findIndex((p) => p === pA) || Number.MAX_SAFE_INTEGER;
        pB =
          Team.priorities.findIndex((p) => p === pB) || Number.MAX_SAFE_INTEGER;
        return pA - pB;
      });

    this.todoInput.render();
    this.todoList.render(renderingTodos);
    this.todoCountContainer.render(renderingTodos);
  };

  this.init();
}
