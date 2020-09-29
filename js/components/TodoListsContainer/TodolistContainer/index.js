import Component from '../../../core/Component.js';
import State from '../../../core/State.js';
import Title from '../../Title.js';
import TodoList from './TodoList/index.js';

export default class TodoListContainer extends Component {
  title;

  constructor($parent, props) {
    super($parent, props);
    this.$target.setAttribute('data-member-id', props['data-member-id']);
    this.title = new State(props.member.name);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = '';
    new Title(this.$target, { title: this.title }, 'h2');
    new TodoList(this.$target, {
      class: ['todoapp'],
      todos: this.props.member.todoList,
    });
  };
}
