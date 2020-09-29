import Component from '../../../../core/Component.js';
import TodoInput from './TodoInput.js';
import TodoMain from './TodoMain.js';
import TodoCountContainer from './TodoCountContainer/index.js';
import State from '../../../../core/State.js';
import api from '../../../../api/ApiService.js';
import { Priority } from '../../../../constants/index.js';

export default class TodoList extends Component {
  todos;

  constructor($parent, props) {
    super($parent, props);

    this.todos = new State(props.todos);
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
        todos: this.todos,
        deleteTodo: this.deleteTodo,
        editTodo: this.editTodo,
        changeTodoPriority: this.changeTodoPriority,
        toggleTodo: this.toggleTodo,
      },
      'section'
    );
    new TodoCountContainer(this.$target, { class: ['count-container'] });
  };
}
