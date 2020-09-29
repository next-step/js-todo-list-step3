import Component from '../../../../core/Component.js';
import TodoInput from './TodoInput.js';
import TodoMain from './TodoMain.js';
import TodoCountContainer from './TodoCountContainer/index.js';
import State, { ComputedState } from '../../../../core/State.js';
import api from '../../../../api/ApiService.js';
import {
  ALL,
  Priority,
  ACTIVE,
  COMPLETED,
  PRIORITY,
} from '../../../../constants/index.js';

export default class TodoList extends Component {
  todos;
  filterType;

  constructor($parent, props) {
    super($parent, props);

    this.filterType = new State(ALL);
    this.todos = new State(props.todos);
    this.filteredTodos = new ComputedState(this.computeTodoList, [
      this.todos,
      this.filterType,
    ]);
    this.render();
  }

  addTodo = async (teamId, memberId, content) => {
    await api.addTodo(teamId, memberId, content);
    this.todos.value = (await api.getMemberTodo(teamId, memberId)).todoList;
  };

  deleteTodo = async (teamId, memberId, itemId) => {
    await api.deleteTodo(teamId, memberId, itemId);
    this.todos.value = (await api.getMemberTodo(teamId, memberId)).todoList;
  };

  editTodo = async (teamId, memberId, itemId, contents) => {
    await api.editTodo(teamId, memberId, itemId, contents);
    this.todos.value = (await api.getMemberTodo(teamId, memberId)).todoList;
  };

  toggleTodo = async (teamId, memberId, itemId) => {
    await api.toggleTodo(teamId, memberId, itemId);
    this.todos.value = (await api.getMemberTodo(teamId, memberId)).todoList;
  };

  clearTodo = async (teamId, memberId) => {
    await api.deleteTodoAll(teamId, memberId);
    this.todos.value = [];
  };

  changeTodoPriority = async (teamId, memberId, itemId, priorityId) => {
    await api.changeTodoPriority(
      teamId,
      memberId,
      itemId,
      priorityId === '1'
        ? Priority.First
        : priorityId === '2'
        ? Priority.Second
        : Priority.None
    );
    this.todos.value = (await api.getMemberTodo(teamId, memberId)).todoList;
  };

  computeTodoList = () => {
    let todoList = this.todos.value || [];

    todoList = todoList.filter((todoItem) => {
      if (todoItem.isCompleted && this.filterType.value === COMPLETED)
        return true;
      else if (!todoItem.isCompleted && this.filterType.value === ACTIVE)
        return true;
      else if (
        this.filterType.value === ALL ||
        this.filterType.value === PRIORITY
      )
        return true;
    });
    if (this.filterType.value === PRIORITY)
      todoList.sort((a, b) => {
        if (a.priority === b.priority) return 0;
        if (a.priority === Priority.First) return -1;
        if (b.priority === Priority.First) return 1;
        if (a.priority === Priority.Second) return -1;
        if (b.priority === Priority.Second) return 1;
      });
    return todoList;
  };

  render = () => {
    this.$target.innerHTML = '';
    new TodoInput(
      this.$target,
      { class: ['input-container'], addTodo: this.addTodo },
      'section'
    );
    new TodoMain(
      this.$target,
      {
        class: ['main'],
        todos: this.filteredTodos,
        deleteTodo: this.deleteTodo,
        editTodo: this.editTodo,
        changeTodoPriority: this.changeTodoPriority,
        toggleTodo: this.toggleTodo,
      },
      'section'
    );
    new TodoCountContainer(this.$target, {
      filterType: this.filterType,
      todos: this.filteredTodos,
      clearTodo: this.clearTodo,
      class: ['count-container'],
    });
  };
}
